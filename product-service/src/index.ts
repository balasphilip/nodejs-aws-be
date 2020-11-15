import "reflect-metadata";

import { createAPIController } from "./controller.factory";

// controllers
import getProductsList from "./controllers/getProductsList";
import getProductById from "./controllers/getProductById";
import createProduct, { productDTOSchema } from "./controllers/createProduct";
import updateProduct, {
  productDTOUpdateSchema,
} from "./controllers/updateProduct";
import getSwaggerJson from "./controllers/getSwaggerJson";
import "source-map-support/register";

const getProductsListController = createAPIController(getProductsList);
const getProductByIdController = createAPIController(getProductById);
const createProductController = createAPIController(
  createProduct,
  productDTOSchema
);
const updateProductController = createAPIController(
  updateProduct,
  productDTOUpdateSchema
);

export {
  getProductsListController as getProductsList,
  getProductByIdController as getProductById,
  createProductController as createProduct,
  updateProductController as updateProduct,
  getSwaggerJson,
};
