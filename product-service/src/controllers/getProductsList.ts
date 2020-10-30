import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import createError from "http-errors";
import { ProductsService } from "../services/products";
import "source-map-support/register";

export default async function getProductsList(
  _: APIGatewayEvent,
  _1: Context
): Promise<APIGatewayProxyResult> {
  const service = new ProductsService(); // todo: find a way to move initialisation logic outside of lambda body
  const products = await service.getProductsList();

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(createError(400, error.message || error.toString())),
    };
  }
}
