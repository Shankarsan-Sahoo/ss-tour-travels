// Minimal in-memory Upstash REST emulator for local tests (SADD, SCARD, INCR, GET, EXPIRE).
import http from "node:http";
const sets = new Map(), kv = new Map();
let commands = 0;
function run([cmd, ...a]) {
  commands++;
  switch (String(cmd).toUpperCase()) {
    case "SADD": { const s = sets.get(a[0]) ?? new Set(); const n = s.has(a[1]) ? 0 : 1; s.add(a[1]); sets.set(a[0], s); return n; }
    case "SCARD": return sets.get(a[0])?.size ?? 0;
    case "INCR": { const v = Number(kv.get(a[0]) ?? 0) + 1; kv.set(a[0], String(v)); return v; }
    case "GET": return kv.get(a[0]) ?? null;
    case "EXPIRE": return 1;
    default: throw new Error("ERR unknown " + cmd);
  }
}
http.createServer((req, res) => {
  let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => {
    res.setHeader("content-type", "application/json");
    if (req.url === "/_stats") return res.end(JSON.stringify({ commands, sets: Object.fromEntries([...sets].map(([k, v]) => [k, v.size])), kv: Object.fromEntries(kv) }));
    if (req.headers.authorization !== "Bearer testtoken") { res.statusCode = 401; return res.end('{"error":"bad token"}'); }
    try {
      const body = JSON.parse(b);
      if (req.url.startsWith("/pipeline")) return res.end(JSON.stringify(body.map((c) => ({ result: run(c) }))));
      return res.end(JSON.stringify({ result: run(body) }));
    } catch (e) { res.statusCode = 400; res.end(JSON.stringify({ error: String(e.message) })); }
  });
}).listen(8799, () => console.log("fake upstash on 8799"));
