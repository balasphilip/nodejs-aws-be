import { APIGatewayEvent, Context } from "aws-lambda";
import swagger from "@src/swagger.json";
import getSwaggerJson from "@src/controllers/getSwaggerJson";

describe("lambda api controller: get swagger json", () => {
  const handler = getSwaggerJson;

  it("should return product by its id", async () => {
    const result = await handler({} as APIGatewayEvent, {} as Context);

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toEqual(swagger);
  });
});
