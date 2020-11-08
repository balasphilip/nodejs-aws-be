import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import { BadRequest } from "http-errors";
import { ProductsService } from "@src/services/products";
import "source-map-support/register";

export default async (
  event: APIGatewayEvent,
  _: Context
): Promise<APIGatewayProxyResult> => {
  const service = new ProductsService(); // todo: find a way to move initialisation logic outside of lambda body
  const { productId } = event.pathParameters;

  try {
    const product = await service.getProductById(productId);

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    throw new BadRequest(error.message || error.toString());
  }
};
