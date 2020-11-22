import { Context, S3Event } from "aws-lambda";
import { AppContext } from "@src/middlewares/with-context";

import "source-map-support/register";

export default async (
  event: S3Event,
  context: Context & AppContext
): Promise<void> => {
  console.log("Import File Parser Triggered", event.Records);

  if (!Array.isArray(event?.Records) || !event?.Records.length) {
    console.log("Import File Parser: event is empty");

    return;
  }

  await context.appContext.importService.parseFile(event.Records);

  console.log("Import File Parser: success");
};
