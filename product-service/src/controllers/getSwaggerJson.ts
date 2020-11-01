import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import swagger from "@src/swagger.json";
import "source-map-support/register";

export default async (
  _: APIGatewayEvent,
  _1: Context
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(swagger),
  };
};
