const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwagger;
