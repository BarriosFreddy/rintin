const router = require("express").Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Capp API",
      version: "1.0.0",
      description:
        "An logistic application",
      license: {},
      contact: {
        name: "Freddy Barrios",
        url: "http://freddybarrios.com",
        email: "me@freddybarrios.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: [],
};

const swagger = (app) => {
  const specification = swaggerJsDoc(options);
  app.use("/docs", swaggerUI.serve);
  app.get(
    "/docs",
    swaggerUI.setup(specification, {
      explorer: true,
    })
  );
};

module.exports = swagger;
