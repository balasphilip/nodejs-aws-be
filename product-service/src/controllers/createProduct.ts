import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import { InternalServerError } from "http-errors";
import { Context as AppContext } from "@src/middlewares/with-context";
import { ProductDTO } from "@src/services/product.dto";
import "source-map-support/register";

export default async (
  event: APIGatewayEvent,
  context: Context & AppContext
): Promise<APIGatewayProxyResult> => {
  const body = (event.body as unknown) as ProductDTO;

  try {
    await context.productsService.createProduct(body);

    return {
      statusCode: 200,
      body: JSON.stringify({ Ok: true }),
    };
  } catch (error) {
    throw new InternalServerError(error.message || error.toString());
  }
};

export const productDTOSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        title: { type: "string", minLength: 1 },
        description: { type: "string", minLength: 1 },
        price: { type: "integer", minimum: 1 },
        count: { type: "string", minimum: 0 },
      },
      required: ["title", "description", "price", "count"],
    },
  },
};
