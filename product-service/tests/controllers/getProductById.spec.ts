import { APIGatewayEvent, Context } from "aws-lambda";
import { BadRequest } from "http-errors";
import getProductById from "@src/controllers/getProductById";
import { Context as AppContext } from "@src/middlewares/with-context";

describe("lambda api controller: get product by id", () => {
  const handler = getProductById;

  const stock1 = {
    id: 1,
    count: 3,
    // eslint-disable-next-line @typescript-eslint/camelcase
    product_id: "1",
  };

  const product1 = {
    id: "1",
    title: "test1",
    description: "test1",
    price: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: stock1,
  };

  it("should return product by its id", async () => {
    const result = await handler(
      ({
        pathParameters: { productId: product1.id },
      } as unknown) as APIGatewayEvent,
      ({
        productsService: {
          getProductById: jest
            .fn()
            .mockResolvedValue({ ...product1, stock: { ...stock1 } }),
        },
      } as unknown) as Context & AppContext
    );

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toEqual(
      JSON.parse(JSON.stringify(product1))
    );
  });

  it("should throw http 400 status code if product not found", async () => {
    await expect(
      handler(
        ({
          pathParameters: { productId: "123" },
        } as unknown) as APIGatewayEvent,
        ({
          productsService: {
            getProductById: jest
              .fn()
              .mockRejectedValue(
                new Error("ApplicationError: Product is not found!")
              ),
          },
        } as unknown) as Context & AppContext
      )
    ).rejects.toThrow(BadRequest);
  });
});
