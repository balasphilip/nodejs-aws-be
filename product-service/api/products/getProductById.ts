import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const controller = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "getProductById",
      context,
      event,
    }),
  };
};
