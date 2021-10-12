const swaggerAutogen = require("swagger-autogen")();

const outputFile = "swagger.json";
const endpointsFiles = ["lib/index.js"];

let version, doc;

try {
  version = process.env.npm_package_version || "0.0.2";
} catch (error) {
  version = "0.0.2";
} finally {
  doc = {
    info: {
      version: version,
      title: process.env.npm_package_name,
      description: process.env.npm_package_description,
      license: {
        name: process.env.npm_package_license,
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
  };
}

swaggerAutogen(outputFile, endpointsFiles, doc);
