import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import { InternalServerError } from "http-errors";
import { AppContext } from "@src/middlewares/with-context";
import "source-map-support/register";

export default async (
  _: APIGatewayEvent,
  context: Context & AppContext
): Promise<APIGatewayProxyResult> => {
  try {
    const products = await context.appContext.productsService.getProductsList();

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    throw new InternalServerError(error.message || error.toString());
  }
};
