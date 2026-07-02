import fs from "node:fs";
import path from "node:path";
import type { KeyValueStorage } from "../src/lib/backend-core.js";

export function createFileStorage(dataDir: string): KeyValueStorage {
  fs.mkdirSync(dataDir, { recursive: true });

  return {
    load<T>(key: string, fallback: T): T {
      const filePath = path.join(dataDir, `${key}.json`);
      try {
        if (!fs.existsSync(filePath)) return fallback;
        return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
      } catch {
        return fallback;
      }
    },
    save(key: string, value: unknown) {
      const filePath = path.join(dataDir, `${key}.json`);
      fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
    },
  };
}
