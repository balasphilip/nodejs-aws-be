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

let context: Context;

const handler: WithContextHandler = () => ({
  before: async (handler) => {
    if (!context) {
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
      }

      context = {
        productsService: new ProductsService(conn, conn.getRepository(Product)),
        connection: conn,
      };
    }

    Object.assign(handler.context, context);
  },
  // after: async (handler, next) => {
  //   next(handler.error);
  //   // context.connection.close();
  // },
  // onError: async (handler, next) => {
  //   next(handler.error);
  //   // context.connection.close();
  // },
});

export interface Context {
  productsService: ProductsService;
  connection: Connection;
}

export default handler;
