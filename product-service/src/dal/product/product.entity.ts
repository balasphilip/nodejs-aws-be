import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { StockModel } from "./stock.entity";
import "source-map-support/register";

export interface ProductModel {
  id: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @OneToOne("Stock", "product")
  stock: StockModel;
}
