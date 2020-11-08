import middy from "@middy/core";
import cors from "@middy/http-cors";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyHandler } from "aws-lambda";
import httpErrorHandler from "./middlewares/http-error-handler";
import "source-map-support/register";

// see https://middy.js.org/
export const createAPIController = <
  T extends APIGatewayProxyHandler = APIGatewayProxyHandler
>(
  handler: T
) =>
  middy(handler)
    .use(jsonBodyParser())
    .use(httpErrorHandler())
    .use(
      cors({
        origin: process.env.FE_ORIGIN_HOST,
      })
    );
