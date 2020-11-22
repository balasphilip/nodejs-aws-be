import { APIGatewayEvent, Context } from "aws-lambda";
import getProductsList from "@src/controllers/getProductsList";
import { AppContext } from "@src/middlewares/with-context";

describe("lambda api controller: get products list", () => {
  const handler = getProductsList;

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

  it("should return products list", async () => {
    const result = await handler(
      ({
        productsService: {
          getProductsList: jest
            .fn()
            .mockResolvedValue([{ ...product1, stock: { ...stock1 } }]),
        },
      } as unknown) as APIGatewayEvent & AppContext,
      ({} as unknown) as Context & AppContext
    );

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toHaveLength(1);
  });
});
