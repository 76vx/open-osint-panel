import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import osintRoutes from "./routes/osint.routes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
const requests = new Map();  // implementacion del rate limit
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requests.has(ip)) requests.set(ip, []);

  const timestamps = requests.get(ip).filter(t => now - t < 60000);
  timestamps.push(now);
  requests.set(ip, timestamps);

  if (timestamps.length > 30) { // 30 requests por minuto, sin uso de librerias y control total, chill de cojones
    return res.status(429).json({ error: "Too many requests" });
  }

  next();
});
app.use("/api/osint", osintRoutes);




const PORT = 3000;
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});