import { MigrationInterface, QueryRunner } from "typeorm";

import { Product } from "@src/dal/product/product.entity";
import { Stock } from "@src/dal/product/stock.entity";
import { ProductDTO } from "@src/services/product.dto";
import products from "./productsList.json";
import "source-map-support/register";

export class SeedDataIntoProducts1604837745886 implements MigrationInterface {
  name = "SeedDataIntoProducts1604837745886";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      products.map((p: ProductDTO) => {
        const product = { ...new Product(), ...p };
        const stock = { ...new Stock(), count: p.count, product };

        return queryRunner.manager
          .save(Product, product)
          .then(() => queryRunner.manager.save(Stock, stock));
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.manager.clear(Product);
    await queryRunner.connection.manager.clear(Stock);
  }
}
