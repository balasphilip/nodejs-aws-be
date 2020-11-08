import middy from "@middy/core";
import "source-map-support/register";

type HttpLoggerHandler = middy.Middleware<void, any, any>;

const handler: HttpLoggerHandler = () => {
  return {
    before: (handler, next) => {
      const { event } = handler;

      console.log({
        httpMethod: event.httpMethod,
        path: event.path,
        body: event.body,
        pathParameters: event.pathParameters,
        queryStringParameters: event.queryStringParameters,
        protocol: event.requestContext.protocol,
        requestId: event.requestContext.requestId,
        resourceId: event.requestContext.resourceId,
        resourcePath: event.requestContext.resourcePath,
        stage: event.requestContext.stage,
      });

      next();
    },
  };
};

export default handler;
