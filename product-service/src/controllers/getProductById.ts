import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import { BadRequest } from "http-errors";
import { Context as AppContext } from "@src/middlewares/with-context";
import "source-map-support/register";

export default async (
  event: APIGatewayEvent,
  context: Context & AppContext
): Promise<APIGatewayProxyResult> => {
  const { productId } = event.pathParameters;

  try {
    const product = await context.productsService.getProductById(productId);

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    throw new BadRequest(error.message || error.toString());
  }
};
