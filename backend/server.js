require("dotenv").config();

const { createApp } = require("./app");
const { getConfig } = require("./config");

const config = getConfig();
const app = createApp(config);

const server = app.listen(config.port, () => {
  console.log(`SnapRoll backend listening on port ${config.port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down`);
  server.close((error) => {
    if (error) {
      console.error("Graceful shutdown failed", error);
      process.exitCode = 1;
    }
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
