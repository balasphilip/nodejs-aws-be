import "reflect-metadata";

import { createAPIController } from "./controller.factory";
import { createS3Handler } from "./s3-handler.factory";

// controllers
import importProductsFile from "./controllers/importProductsFile";
import getSwaggerJson from "./controllers/getSwaggerJson";

// s3 event handlers
import importFileParser from "./s3-handlers/importFileParser";

import "source-map-support/register";

const importProductsFileController = createAPIController(importProductsFile);
const importFileParserHandler = createS3Handler(importFileParser);

export {
  importProductsFileController as importProductsFile,
  getSwaggerJson,
  importFileParserHandler as importFileParser,
};
