import { APIGatewayProxyHandler } from "aws-lambda";
import middy from "@middy/core";
import cors from "@middy/http-cors";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import httpErrorHandler from "./middlewares/http-error-handler";
import withContext from "./middlewares/with-context";
import httpLogger from "./middlewares/http-simple-logger";

import "source-map-support/register";

// see https://middy.js.org/
export const createAPIController = (
  handler: APIGatewayProxyHandler,
  inputSchema = {}
) =>
  middy(handler)
    .use(withContext())
    .use(jsonBodyParser())
    .use(httpLogger())
    .use(validator({ inputSchema }))
    .use(httpErrorHandler())
    .use(
      cors({
        origin: process.env.FE_ORIGIN_HOST,
      })
    );
