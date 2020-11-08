import { ConnectionOptions } from "typeorm";
import { Product } from "@src/dal/product/product.entity";
import { Stock } from "@src/dal/product/stock.entity";
import { CreateProducts1604837536330 } from "@src/migrations/1604837536330-create-products-and-seed-data";
import { SeedDataIntoProducts1604837745886 } from "@src/migrations/1604837745886-seed-data-into-products";
import "source-map-support/register";

export const connection: ConnectionOptions = {
  type: "postgres",

  // how to generate migration with cli: https://typeorm.io/#/using-cli/if-entities-files-are-in-typescript
  // https://typeorm.io/#/using-cli/generate-a-migration-from-existing-table-schema
  // how to write migrations with help of built in QueryBuilder: https://typeorm.io/#/select-query-builder
  migrations: [CreateProducts1604837536330, SeedDataIntoProducts1604837745886],
  entities: [Product, Stock],

  migrationsRun: true,
  logging: ["schema", "error"],

  cli: {
    // Location of migration should be inside src folder to be compiled into dist/ folder.
    migrationsDir: "src/migrations",
  },

  // not recommended in prod mode, migrations are more preferable;
  synchronize: false,

  // for local usage of:  "npm run typeorm:revert" command, "npm run typeorm:generate"
  host: "postgres",
  database: "postgres",
  port: 5432,
  username: "",
  password: "",
};
