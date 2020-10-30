import { Controller, Get, Path, Route, Response } from "tsoa";
import { ProductDTO } from "./product.dto";
import products from "./productsList.json";
import "source-map-support/register";

@Route("products")
export class ProductsService extends Controller {
  @Get()
  getProductsList(): Promise<ProductDTO[]> {
    return Promise.resolve(products || []);
  }

  @Get("{productId}")
  @Response(400, "Product ID is missed")
  @Response(400, "Product not found")
  async getProductById(@Path() productId: string): Promise<ProductDTO> {
    if (!productId) {
      throw new Error("ApplicationError: Product ID is missed!");
    }

    const product = (products as ProductDTO[]).find(
      (product: ProductDTO) => product.id === productId
    );

    if (!product) {
      throw new Error(
        `ApplicationError: Product with ID: ${productId} was not found!`
      );
    }

    return product;
  }
}
