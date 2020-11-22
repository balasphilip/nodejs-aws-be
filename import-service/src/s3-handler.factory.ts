import { S3Handler } from "aws-lambda";
import middy from "@middy/core";
import withContext from "./middlewares/with-context";

import "source-map-support/register";

// see https://middy.js.org/
export const createS3Handler = (handler: S3Handler) =>
  middy(handler).use(withContext());
