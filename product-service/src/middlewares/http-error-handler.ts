import middy from "@middy/core";
import { HttpError } from "http-errors";
import "source-map-support/register";

type HttpErrorHandler = middy.Middleware<void, any, any>;

const handler: HttpErrorHandler = () => {
  return {
    onError: (handler, next) => {
      const error = handler.error as HttpError;

      if (error && error.statusCode && error.message) {
        handler.response = {
          statusCode: error.statusCode,
          body: JSON.stringify(error),
        };

        return next();
      }

      return next(handler.error);
    },
  };
};

export default handler;
