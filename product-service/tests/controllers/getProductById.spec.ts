import { APIGatewayEvent, Context } from "aws-lambda";
import { BadRequest } from "http-errors";
import getProductById from "@src/controllers/getProductById";
import { ProductDTO } from "@src/services/product.dto";
import products from "@src/services/productsList.json";

describe("lambda api controller: get product by id", () => {
  const handler = getProductById;

  it("should return product by its id", async () => {
    const product = products[0] as ProductDTO;

    const result = await handler(
      ({
        pathParameters: { productId: product.id },
      } as unknown) as APIGatewayEvent,
      {} as Context
    );

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toEqual(product);
  });

  it("should throw http 400 status code if product not found", async () => {
    await expect(
      handler(
        ({
          pathParameters: { productId: "123" },
        } as unknown) as APIGatewayEvent,
        {} as Context
      )
    ).rejects.toThrow(BadRequest);
  });
});
