import { Controller, Get, Path, Response, Route, Body, Post, Put } from "tsoa";
import { Connection } from "typeorm";
import { Product } from "@src/dal/product/product.entity";
import { Stock } from "@src/dal/product/stock.entity";
import { ProductRepository } from "@src/dal/product/repository";
import { ProductDTO } from "./product.dto";
import "source-map-support/register";

@Route("products")
export class ProductsService extends Controller {
  public static toDTO(product: Product) {
    const count = product.stock.count;

    delete product.stock;

    return { ...product, count };
  }

  constructor(
    private readonly connection: Connection,
    private readonly productRepository: ProductRepository
  ) {
    super();
  }

  @Get()
  async getProductsList(): Promise<ProductDTO[]> {
    const products = await this.productRepository.find({
      relations: ["stock"],
    });

    return products.map(ProductsService.toDTO);
  }

  @Get("{productId}")
  @Response(400, "Product ID is missed")
  @Response(400, "Product not found")
  async getProductById(@Path() productId: string): Promise<ProductDTO> {
    if (!productId) {
      throw new Error("ApplicationError: Product ID is missed!");
    }

    const product = await this.productRepository.findOne(productId, {
      relations: ["stock"],
    });

    if (!product) {
      throw new Error(
        `ApplicationError: Product with ID: ${productId} was not found!`
      );
    }

    return ProductsService.toDTO(product);
  }

  @Post()
  async createProduct(@Body() product: ProductDTO): Promise<void> {
    await this.connection.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(Product, product);
      await transactionalEntityManager.save(Stock, {
        ...new Stock(),
        count: product.count,
        product,
      });
    });
  }

  @Put("{productId}")
  async updateProduct(
    @Path() productId: string,
    @Body() product: ProductDTO
  ): Promise<void> {
    await this.connection.transaction(async (transactionalEntityManager) => {
      const productToSave = {
        id: productId,
        ...product,
      } as Partial<ProductDTO>;
      const productResult = await transactionalEntityManager.findOne<Product>(
        Product,
        productId,
        {
          relations: ["stock"],
        }
      );
      const stock = productResult.stock;

      await transactionalEntityManager.save(Product, productToSave);
      await transactionalEntityManager.save(Stock, {
        ...stock,
        count: product.count || stock.count,
      });
    });
  }
}
