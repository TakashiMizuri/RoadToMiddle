import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoDir = path.resolve(appDir, "..");

function mustOk(result) {
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function bin(name) {
  const win = process.platform === "win32";
  const direct = path.join(appDir, "node_modules", ".bin", win ? `${name}.cmd` : name);
  if (fs.existsSync(direct)) return direct;
  return path.join(appDir, "node_modules", name, "bin", win ? `${name}.js` : name);
}

function run(label, cmd, args, opts = {}) {
  console.log(`\n→ ${label}`);
  mustOk(spawnSync(cmd, args, { cwd: appDir, stdio: "inherit", ...opts }));
}

const tsxCli = path.join(appDir, "node_modules", "tsx", "dist", "cli.mjs");
const esbuild = path.join(appDir, "node_modules", "esbuild", "bin", "esbuild");

console.log("\n→ sync roadmap");
mustOk(
  spawnSync(process.execPath, [tsxCli, path.join(repoDir, "scripts", "parse-roadmap.ts")], {
    cwd: repoDir,
    stdio: "inherit",
  }),
);

run("typecheck", bin("tsc"), []);
run("vite build", bin("vite"), ["build"], {
  env: { ...process.env, ELECTRON: "1" },
});

run("compile preload", process.execPath, [
  esbuild,
  "electron/preload.ts",
  "--bundle",
  "--platform=node",
  "--format=cjs",
  "--outfile=electron/preload.cjs",
  "--external:electron",
]);

run("compile main", process.execPath, [
  esbuild,
  "electron/main.ts",
  "--bundle",
  "--platform=node",
  "--format=esm",
  "--outfile=electron-dist/main.mjs",
  "--external:electron",
  "--packages=external",
]);

run("package installer", bin("electron-builder"), ["--win"]);
