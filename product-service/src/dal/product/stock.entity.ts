import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductModel } from "./product.entity";
import "source-map-support/register";

export interface StockModel {
  id: number;
  count: number;
}

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @OneToOne("Product", "stock")
  @JoinColumn({ referencedColumnName: "id", name: "product_id" })
  product: ProductModel;
}
