import express from "express";
import net from "net";
import { lookupIP } from "../services/ipinfo.service.js";
import { resolveDomain } from "../services/domain.service.js";
import { whoisLookup } from "../services/whois.service.js";
import { getCache, setCache } from "../services/cache.service.js";

const router = express.Router();

function isIP(input) {
  return net.isIP(input) !== 0;
}

router.get("/lookup/:target", async (req, res) => {
  try {
    const target = req.params.target;

    // Cache
    const cached = getCache(target);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    let ip = target;
    let whois = null;

    if (!isIP(target)) {
      ip = await resolveDomain(target);
      whois = await whoisLookup(target);
    }

    const data = await lookupIP(ip);

    const response = {
      input: target,
      resolved_ip: ip,
      whois,
      data
    };

    setCache(target, response);
    res.json(response);

  } catch (err) {
    console.error("OSINT lookup error:", err.message);
    res.status(400).json({ error: "Invalid IP or domain" });
  }
});

export default router;
