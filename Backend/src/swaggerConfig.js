const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle Management API",
      version: "1.0.0",
      description: "API for managing vehicles in a company",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
}

module.exports = swaggerJsdoc(options)

