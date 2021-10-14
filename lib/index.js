const express = require("express");
const app = express();
const { getSdk } = require("balena-sdk");
const port = process.env.PORT || 80;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const wol = require("wake_on_lan");
const debug = require("debug")("main");

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
    debug("Error authenticating with balena ", err);
  }

  debug("WoL listening on port ", port);
});

require("./endpoints")(app, sdk, wol);
