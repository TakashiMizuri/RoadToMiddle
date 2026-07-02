import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const devHost = process.env.DEV_HOST ?? "127.0.0.1:1420";
const devUrl = process.env.VITE_DEV_SERVER_URL ?? `http://${devHost}`;
const electronBin = process.env.ELECTRON_BIN;

function mustOk(result) {
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function logStep(message) {
  console.log(`\n→ ${message}`);
}

if (!electronBin) {
  console.error("ELECTRON_BIN is not set");
  process.exit(1);
}

const waitOnBin = path.join(appDir, "node_modules", "wait-on", "bin", "wait-on");

logStep("Waiting for Vite dev server...");
mustOk(
  spawnSync(process.execPath, [waitOnBin, `http-get://${devHost}/`, "-t", "120000"], {
    cwd: appDir,
    stdio: "inherit",
  }),
);

logStep("Pre-bundling frontend (first run can take 1–3 min, then ~10s)...");
const warmupStarted = Date.now();

for (const resource of ["/", "/src/main.tsx"]) {
  mustOk(
    spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `const res = await fetch("${devUrl}${resource}");
if (!res.ok) { console.error("Warmup failed for ${resource}:", res.status); process.exit(1); }
process.exit(0);`,
      ],
      { cwd: appDir, stdio: "inherit", timeout: 300000 },
    ),
  );
}

console.log(`→ Frontend ready in ${((Date.now() - warmupStarted) / 1000).toFixed(1)}s`);

logStep("Launching Electron window...");

const electron = spawn(electronBin, ["."], {
  cwd: appDir,
  stdio: "inherit",
  env: { ...process.env, VITE_DEV_SERVER_URL: devUrl },
});

electron.on("exit", (code) => process.exit(code ?? 0));
