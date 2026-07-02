import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

const lessonsRoot = path.resolve(__dirname, "../lessons");

function serveLessonsPlugin(): Plugin {
  return {
    name: "serve-lessons",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (!url.startsWith("/lessons/")) return next();

        const relative = decodeURIComponent(url.slice("/lessons/".length));
        const filePath = path.normalize(path.join(lessonsRoot, relative));
        if (!filePath.startsWith(lessonsRoot)) {
          res.statusCode = 403;
          res.end("Forbidden");
          return;
        }
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          res.statusCode = 404;
          res.end("Not found");
          return;
        }
        res.setHeader("Content-Type", "text/markdown; charset=utf-8");
        fs.createReadStream(filePath).pipe(res);
      });
    },
  };
}

export default defineConfig(async () => ({
  base: process.env.ELECTRON === "1" ? "./" : "/",
  plugins: [react(), tailwindcss(), serveLessonsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  clearScreen: false,
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react-markdown",
      "remark-gfm",
      "rehype-highlight",
      "zustand",
      "@tanstack/react-virtual",
      "lucide-react",
      "recharts",
      "clsx",
      "tailwind-merge",
    ],
  },
  server: {
    port: 1420,
    strictPort: true,
    host: host || "127.0.0.1",
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));
