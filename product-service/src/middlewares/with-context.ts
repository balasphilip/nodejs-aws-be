import {
  getConnection,
  createConnection,
  Connection,
  ConnectionOptions,
} from "typeorm";
import middy from "@middy/core";
import { connection } from "@src/db-connection-config";
import { ProductsService } from "@src/services/products";

// dal
import { Product } from "@src/dal/product/product.entity";

import "source-map-support/register";

type WithContextHandler = middy.Middleware<void, any, any>;

interface Context {
  productsService: ProductsService;
  connection: Connection;
}

let appContext: Context;

const handler: WithContextHandler = () => ({
  before: async (handler) => {
    if (!appContext) {
      let conn: Connection;

      try {
        conn = getConnection();
      } catch (error) {
        conn = await createConnection({
          ...connection,
          host: process.env.PG_HOST,
          database: process.env.PG_DATABASE,
          port: Number.parseInt(process.env.PG_PORT, 10),
          username: process.env.PG_USERNAME,
          password: process.env.PG_PASSWORD,
        } as ConnectionOptions);

        console.log("Create Connection", { isConnected: conn.isConnected });
      }

      if (!conn.isConnected) {
        await conn.connect();

        console.log("Open Connection", { isConnected: conn.isConnected });
      }

      appContext = {
        productsService: new ProductsService(
          conn,
          conn.getRepository<Product>(Product)
        ),
        connection: conn,
      };
    }

    Object.assign(handler.context, { appContext });
  },
  after: async () => {
    console.log("Cleanup. Close connection");

    await appContext.connection.close();
    appContext = undefined;
    // return next();
    // context.connection.close();
  },
  // onError: async (handler, next) => {
  //   await appContext.connection.close();
  //   // next(handler.error);
  //   // context.connection.close();
  // },
});

export interface AppContext {
  appContext: Context;
}

export default handler;
