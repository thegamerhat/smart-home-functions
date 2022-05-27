const ewelink = require("ewelink-api");

// Example taken from:
// https://ewelink-api.vercel.app/docs/demos/node

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Proceed with toggling device
    const { deviceId, deviceState } = req.body;

    // Return error if values are invalid
    if (typeof deviceId !== "string")
      return res.json({ error: `Invalid device id: ${deviceId}` });
    else if (
      deviceState !== "on" &&
      deviceState !== "off" &&
      deviceState !== "toggle"
    )
      return res.json({ error: `Invalid device state: ${deviceState}` });

    // Login to Ewelink
    const EweLinkConnection = new ewelink({
      email: process.env.EWELINK_EMAIL_ADDRESS,
      password: process.env.EWELINK_PASSWORD,
      region: process.env.EWELINK_REGION,
    });

    // Set the device state
    const deviceStatus = await EweLinkConnection.setDevicePowerState(
      deviceId,
      deviceState
    );

    // Handle error if exists
    // else return JSON with device status.

    if (deviceStatus.error) {
      // Return that error
      return res.json(deviceStatus);
    } else
      return res.json({
        message: `⚡ device set to ${deviceStatus.state}`,
        ...deviceStatus,
      });
  } else {
    // Handle any other methods
    return res.json({
      error: "Only HTTP-POST method is accepted.",
    });
  }
}

// const deviceId = process.env.EWELINK_DEVICE_ID;

/* get all devices */
//   const devices = await connection.getDevices();
//   console.log(devices);

/* toggle device */
//   await connection.toggleDevice(deviceId);

/* get specific device info */
//   const device = await connection.getDevice(deviceId);
//   console.log(device);

/* get specific device state */
//   const status = await connection.getDevicePowerState(deviceId);
