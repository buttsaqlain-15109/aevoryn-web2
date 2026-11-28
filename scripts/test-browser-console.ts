/**
 * TEST BROWSER CONSOLE & HYDRATION ACROSS VIEWPORTS VIA CDP
 */
import http from "http";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT_DIR, "out");

// Static server
const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let reqPath = req.url?.split("?")[0] || "/";
  if (reqPath === "/") reqPath = "/index.html";
  
  let filePath = path.join(OUT_DIR, reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
    filePath = filePath + ".html";
  } else if (fs.existsSync(path.join(filePath, "index.html"))) {
    filePath = path.join(filePath, "index.html");
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

await new Promise<void>((resolve) => server.listen(3457, resolve));
console.log("Local test server listening on http://localhost:3457");

const CHROME_PATH = "/Applications/Google Chrome 2.app/Contents/MacOS/Google Chrome";
const chromeProcess = spawn(CHROME_PATH, [
  "--headless=new",
  "--remote-debugging-port=9222",
  "--no-first-run",
  "--no-default-browser-check",
  "--user-data-dir=/tmp/chrome-cdp-profile",
  "--disable-gpu",
  "--window-size=1440,900"
]);

// Wait for CDP to be available
let versionData: any = null;
for (let i = 0; i < 20; i++) {
  try {
    const r = await fetch("http://127.0.0.1:9222/json/version");
    if (r.ok) {
      versionData = await r.json();
      break;
    }
  } catch {}
  await new Promise((r) => setTimeout(r, 200));
}

if (!versionData) {
  console.error("Failed to connect to headless Chrome CDP");
  chromeProcess.kill();
  server.close();
  process.exit(1);
}

console.log(`Connected to headless Chrome: ${versionData.Browser}`);

// Create a new tab
const newTabRes = await fetch("http://127.0.0.1:9222/json/new?about:blank", { method: "PUT" });
const target = await newTabRes.json();
const ws = new WebSocket(target.webSocketDebuggerUrl);

await new Promise<void>((resolve) => {
  ws.onopen = () => resolve();
});

let msgId = 1;
const pendingCalls = new Map<number, (res: any) => void>();

function send(method: string, params: any = {}): Promise<any> {
  const id = msgId++;
  return new Promise((resolve) => {
    pendingCalls.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

const collectedErrors: string[] = [];

ws.onmessage = (event: any) => {
  const data = JSON.parse(event.data);
  if (data.id && pendingCalls.has(data.id)) {
    const cb = pendingCalls.get(data.id)!;
    pendingCalls.delete(data.id);
    cb(data.result);
  } else if (data.method === "Runtime.consoleAPICalled") {
    if (data.params.type === "error") {
      const args = data.params.args.map((a: any) => a.value || a.description).join(" ");
      collectedErrors.push(`[Console Error] ${args}`);
    }
  } else if (data.method === "Runtime.exceptionThrown") {
    collectedErrors.push(`[Exception] ${data.params.exceptionDetails.text} ${data.params.exceptionDetails.exception?.description || ""}`);
  }
};

await send("Runtime.enable");
await send("Page.enable");
await send("Network.enable");

const routesToTest = [
  { url: "http://localhost:3457/", name: "Home (Desktop)", width: 1440, height: 900 },
  { url: "http://localhost:3457/", name: "Home (Mobile iPhone)", width: 390, height: 844, isMobile: true },
  { url: "http://localhost:3457/about", name: "About", width: 1440, height: 900 },
  { url: "http://localhost:3457/capabilities/infrastructure", name: "Capabilities Infrastructure", width: 1440, height: 900 },
  { url: "http://localhost:3457/capabilities/manpower", name: "Capabilities Manpower (Mobile)", width: 390, height: 844, isMobile: true },
  { url: "http://localhost:3457/certifications", name: "Certifications", width: 1440, height: 900 },
  { url: "http://localhost:3457/documents", name: "Documents", width: 1440, height: 900 },
  { url: "http://localhost:3457/contact", name: "Contact", width: 1440, height: 900 },
  { url: "http://localhost:3457/supplier-registration", name: "Supplier Registration", width: 1440, height: 900 },
  { url: "http://localhost:3457/supplier-registration", name: "Supplier Registration (Mobile)", width: 390, height: 844, isMobile: true },
];

let allPassed = true;

for (const r of routesToTest) {
  collectedErrors.length = 0;
  await send("Emulation.setDeviceMetricsOverride", {
    width: r.width,
    height: r.height,
    deviceScaleFactor: 2,
    mobile: !!r.isMobile,
  });

  await send("Page.navigate", { url: r.url });
  // Wait for load and hydration
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (collectedErrors.length > 0) {
    console.error(`❌ [FAILED] ${r.name}: Found ${collectedErrors.length} runtime error(s):`);
    collectedErrors.forEach((e) => console.error("   ", e));
    allPassed = false;
  } else {
    console.log(`✅ [PASSED] ${r.name}: 0 console errors, clean hydration.`);
  }
}

ws.close();
chromeProcess.kill();
server.close();

if (allPassed) {
  console.log("\nSUCCESS: All tested routes passed with ZERO runtime errors on both desktop and mobile viewports!\n");
  process.exit(0);
} else {
  process.exit(1);
}
