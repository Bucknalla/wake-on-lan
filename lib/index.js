const express = require("express");
const app = express();
const { getSdk } = require("balena-sdk");
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const wol = require("wol");

const sdk = getSdk();

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.listen(port, async function () {
  try {
    await sdk.auth.logout();
    await sdk.auth.loginWithToken(process.env.BALENA_API_KEY);
  } catch (err) {
    console.error("Error while setting stats.last_server_start tag", err);
  }

  console.log("Example app listening on port ", port);
});

require("./endpoints")(app, sdk, wol);
