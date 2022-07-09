import express from "express";
import swaggerUi from "swagger-ui-express";

import { ApppDataSource } from "../dataSource";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

ApppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.use(router);

  app.listen(3333, () => console.log("Server is running!"));
});
