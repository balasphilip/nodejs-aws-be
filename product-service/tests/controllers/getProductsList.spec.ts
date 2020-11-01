import { APIGatewayEvent, Context } from "aws-lambda";
import getProductsList from "@src/controllers/getProductsList";

describe("lambda api controller: get products list", () => {
  const handler = getProductsList;

  it("should return products list", async () => {
    const result = await handler({} as APIGatewayEvent, {} as Context);

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).not.toHaveLength(0);
  });
});
