import { EntityRepository, Repository } from "typeorm";
import { Product } from "./product.entity";
import "source-map-support/register";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
