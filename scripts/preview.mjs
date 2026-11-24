import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("out");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const port = Number(process.env.PORT ?? 4173);
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain; charset=utf-8", ".json": "application/json" };
async function getFile(path) {
  const info = await stat(path);
  return info.isDirectory() ? resolve(path, "index.html") : path;
}
createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    if (basePath && path !== basePath && !path.startsWith(basePath + "/")) throw new Error("Outside site");
    const full = resolve(root, "." + (path.slice(basePath.length) || "/"));
    if (full !== root && !full.startsWith(root + sep)) throw new Error("Outside export");
    const file = await getFile(full);
    await stat(file);
    response.writeHead(200, { "Content-Type": mime[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    createReadStream(resolve(root, "404.html")).on("error", () => response.end("Not found")).pipe(response);
  }
}).listen(port, "127.0.0.1", () => console.log(`Static preview: http://127.0.0.1:${port}${basePath}/`));
