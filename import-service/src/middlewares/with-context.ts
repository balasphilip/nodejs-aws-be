import { S3 } from "aws-sdk";
import middy from "@middy/core";
import { ImportService } from "@src/services/import";

import "source-map-support/register";

type WithContextHandler = middy.Middleware<void, any, any>;

interface Context {
  importService: ImportService;
}

let appContext: Context;

const handler: WithContextHandler = () => ({
  before: async (handler) => {
    console.log("Context: Set up.");

    if (!appContext) {
      appContext = {
        importService: new ImportService(new S3({ region: "eu-west-1" })),
      };
    }

    Object.assign(handler.context, { appContext });
  },
  after: (_, next) => {
    console.log("Context: Cleanup.");

    appContext = undefined;

    return next();
  },
});

export interface AppContext {
  appContext: Context;
}

export default handler;
