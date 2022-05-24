const ewelink = require("ewelink-api");

// Example taken from:
// https://ewelink-api.vercel.app/docs/demos/node

export default async function handler(req, res) {
  const connection = new ewelink({
    email: process.env.EWELINK_EMAIL_ADDRESS,
    password: process.env.EWELINK_PASSWORD,
    region: process.env.EWELINK_REGION,
  });

  /* get all devices */

  //   const devices = await connection.getDevices();
  //   console.log(devices);

  const deviceId = process.env.EWELINK_DEVICE_ID;

  /* toggle device */

  await connection.toggleDevice(deviceId);
  
  /* get specific device info */

  // const device = await connection.getDevice(deviceId);
  // console.log(device);

  /* get specific device state */

  const status = await connection.getDevicePowerState(deviceId);

  return res.json(status);
}
