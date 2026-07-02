import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import concurrently from "concurrently";

const require = createRequire(import.meta.url);
const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoDir = path.resolve(appDir, "..");
const devHost = "127.0.0.1:1420";
const devUrl = `http://${devHost}`;

function mustOk(result) {
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function freePort(port) {
  if (process.platform !== "win32") return;
  spawnSync(process.execPath, ["scripts/free-port.mjs", String(port)], {
    cwd: appDir,
    stdio: "ignore",
  });
}

function syncRoadmap() {
  const tsxCli = path.join(appDir, "node_modules", "tsx", "dist", "cli.mjs");
  console.log("\n→ sync roadmap");
  mustOk(
    spawnSync(process.execPath, [tsxCli, path.join(repoDir, "scripts", "parse-roadmap.ts")], {
      cwd: repoDir,
      stdio: "inherit",
    }),
  );
}

function compileElectron() {
  const esbuild = path.join(appDir, "node_modules", "esbuild", "bin", "esbuild");
  console.log("\n→ compile electron");
  const steps = [
    [
      "electron/preload.ts",
      "--bundle",
      "--platform=node",
      "--format=cjs",
      "--outfile=electron/preload.cjs",
      "--external:electron",
    ],
    [
      "electron/main.ts",
      "--bundle",
      "--platform=node",
      "--format=esm",
      "--outfile=electron-dist/main.mjs",
      "--external:electron",
      "--packages=external",
    ],
  ];
  for (const args of steps) {
    mustOk(spawnSync(process.execPath, [esbuild, ...args], { cwd: appDir, stdio: "inherit" }));
  }
}

syncRoadmap();
compileElectron();

for (const port of [1420, 1421]) freePort(port);

const electronBin = require("electron");
const launchScript = path.join(appDir, "scripts", "launch-electron.mjs");

console.log("\n→ start app (vite + electron)\n");

const { result } = concurrently(
  [
    { name: "vite", command: "npm run dev:server", cwd: appDir },
    {
      name: "app",
      command: `node ${JSON.stringify(launchScript)}`,
      cwd: appDir,
      env: {
        ...process.env,
        VITE_DEV_SERVER_URL: devUrl,
        ELECTRON_BIN: electronBin,
        DEV_HOST: devHost,
      },
    },
  ],
  {
    prefix: "{name}",
    killOthersOn: { failure: true, success: true },
    cwd: appDir,
  },
);

result.catch(() => process.exit(1));
