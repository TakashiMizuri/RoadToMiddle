import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoDir = path.resolve(appDir, "..");

const tsxCli = path.join(appDir, "node_modules", "tsx", "dist", "cli.mjs");
const viteBin = path.join(appDir, "node_modules", "vite", "bin", "vite.js");

console.log("\n→ sync roadmap");
const sync = spawnSync(process.execPath, [tsxCli, path.join(repoDir, "scripts", "parse-roadmap.ts")], {
  cwd: repoDir,
  stdio: "inherit",
});
if (sync.status !== 0) process.exit(sync.status ?? 1);

console.log("\n→ start vite (browser preview at http://127.0.0.1:1420)\n");
const vite = spawnSync(process.execPath, [viteBin], { cwd: appDir, stdio: "inherit" });
process.exit(vite.status ?? 0);
