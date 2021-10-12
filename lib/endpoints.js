const debug = require("debug")("endpoints");

module.exports = async function (app, sdk, wol) {
  app.post("/wake/mac", (req, res) => {
    // #swagger.description = 'Wake device via MAC Address.'
    /* #swagger.responses[200] = {
                         description: 'Successful request',
                         schema: {
                             "properties": {
                                 "list": {
                                 
                                     "type": "array",
                                     "description": "List of items",
                                 },
                             },
                         }
                     } */
    try {
      if (req.query.mac) {
        debug(`Sending to MAC: ${req.query.mac}`);
        wol.wake(req.query.mac, function (err) {
          if (err) {
            debug(`WoL response: ${err}`);
          } else {
            res.send("success");
          }
        });
      } else {
        res.status(400).send("Missing MAC Address");
      }
    } catch (error) {
      debug(error);
      return res.status(400).send(error);
    }
  });

  app.post("/wake/uuid", (req, res) => {
    // #swagger.description = 'Wake device via UUID.'
    /* #swagger.responses[200] = {
                         description: 'Successful request',
                         schema: {
                             "properties": {
                                 "list": {
                                 
                                     "type": "array",
                                     "description": "List of items",
                                 },
                             },
                         }
                     } */
    return res.status(404).send(false);
  });

  app.get("/mac", async (req, res) => {
    // #swagger.description = 'Get all MAC addresses for devices in fleet'
    /* #swagger.responses[200] = {
                         description: 'Successful request',
                         schema: {
                             "properties": {
                                 "list": {
                                     "type": "array",
                                     "description": "List of MAC Addresses",
                                 },
                             },
                         }
                     } */
    try {
      if (req.query.uuid) {
        if (sdk) {
          let macs = [];
          let uuid = req.query.uuid;
          await sdk.models.device
            .getMACAddresses(uuid)
            .then(function (macAddresses) {
              macAddresses.forEach(function (mac) {
                macs.push(mac);
              });
            })
            .then(function () {
              res.send(macs);
            });
        } else {
          res.status(400).send("SDK not available...");
        }
      } else {
        res.status(400).send("Missing UUID");
      }
    } catch (err) {
      return res.status(400);
    }
  });
};
