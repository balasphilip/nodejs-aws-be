import { createAPIController } from "./controller.factory";
import getProductsList from "./controllers/getProductsList";
import getProductById from "./controllers/getProductById";
import getSwaggerJson from "./controllers/getSwaggerJson";
import "source-map-support/register";

const getProductsListController = createAPIController(getProductsList);
const getProductByIdController = createAPIController(getProductById);

export {
  getProductsListController as getProductsList,
  getProductByIdController as getProductById,
  getSwaggerJson,
};
