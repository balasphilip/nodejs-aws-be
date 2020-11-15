import { MigrationInterface, QueryRunner } from "typeorm";
import "source-map-support/register";

export class CreateProducts1604837536330
  implements MigrationInterface {
  name = "CreateProducts1604837536330";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stock" ("id" SERIAL NOT NULL, "count" integer NOT NULL, "product_id" uuid, CONSTRAINT "REL_375ba760c8cff338fc8c94b416" UNIQUE ("product_id"), CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ADD CONSTRAINT "FK_375ba760c8cff338fc8c94b416c" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock" DROP CONSTRAINT "FK_375ba760c8cff338fc8c94b416c"`
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "stock"`);
  }
}
