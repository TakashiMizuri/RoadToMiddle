import { spawnSync } from "node:child_process";

const port = process.argv[2];
if (!port || process.platform !== "win32") {
  process.exit(0);
}

spawnSync(
  "powershell",
  [
    "-NoProfile",
    "-Command",
    `$conns = Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue; ` +
      `if ($conns) { $conns | Select-Object -ExpandProperty OwningProcess -Unique | ` +
      `ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }`,
  ],
  { stdio: "ignore" },
);

process.exit(0);
