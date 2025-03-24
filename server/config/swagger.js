const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Spotify API",
    description: "API documentation for Spotify Clone",
    version: "1.0.0",
  },
  servers: [
    {
      url: process.env.URL, // Đổi nếu dùng cổng khác
    },
  ],
};

const outputFile = "./swagger-output.json";
const routes = ["./index.js"]; // Chỉ cần chỉ định file entry chính

swaggerAutogen(outputFile, routes);
