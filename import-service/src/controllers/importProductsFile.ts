import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { InternalServerError, BadRequest } from "http-errors";
import { AppContext } from "@src/middlewares/with-context";

import "source-map-support/register";

export default async (
  event: APIGatewayEvent,
  context: Context & AppContext
): Promise<APIGatewayProxyResult> => {
  try {
    const filerName = event.queryStringParameters?.name;

    const signedUrl = await context.appContext.importService.generateClientUrlToSaveFile(
      filerName
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        signedUrl,
      }),
    };
  } catch (error) {
    if (error?.message.includes("ApplicationError")) {
      throw new BadRequest(error.message);
    }

    throw new InternalServerError(error.message || error.toString());
  }
};
