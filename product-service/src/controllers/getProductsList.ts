import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import { InternalServerError } from "http-errors";
import { ProductsService } from "@src/services/products";
import "source-map-support/register";

export default async (
  _: APIGatewayEvent,
  _1: Context
): Promise<APIGatewayProxyResult> => {
  const service = new ProductsService(); // todo: find a way to move initialisation logic outside of lambda body

  try {
    const products = await service.getProductsList();

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    throw new InternalServerError(error.message || error.toString());
  }
};
