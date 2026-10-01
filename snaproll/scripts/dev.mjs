import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const frontendDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backendDirectory = path.resolve(frontendDirectory, "../backend");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const frontendArguments = ["run", "dev:web"];
const forwardedArguments = process.argv.slice(2);

if (forwardedArguments.length) frontendArguments.push("--", ...forwardedArguments);

const services = [
  {
    name: "chatbot backend",
    process: spawn(npmCommand, ["run", "dev"], {
      cwd: backendDirectory,
      stdio: "inherit",
    }),
  },
  {
    name: "Next.js website",
    process: spawn(npmCommand, frontendArguments, {
      cwd: frontendDirectory,
      stdio: "inherit",
    }),
  },
];

let stopping = false;

function stopServices(signal = "SIGTERM") {
  if (stopping) return;
  stopping = true;

  for (const service of services) {
    if (!service.process.killed) service.process.kill(signal);
  }
}

for (const service of services) {
  service.process.on("error", (error) => {
    console.error(`Unable to start the ${service.name}: ${error.message}`);
    process.exitCode = 1;
    stopServices();
  });

  service.process.on("exit", (code, signal) => {
    if (stopping) return;

    const reason = signal ? `signal ${signal}` : `exit code ${code ?? 1}`;
    console.error(`The ${service.name} stopped unexpectedly (${reason}).`);
    process.exitCode = code || 1;
    stopServices();
  });
}

process.on("SIGINT", () => stopServices("SIGINT"));
process.on("SIGTERM", () => stopServices("SIGTERM"));
