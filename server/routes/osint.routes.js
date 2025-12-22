import express from "express";
import { lookupIP } from "../services/ipinfo.service.js";
import { resolveDomain } from "../services/domain.service.js";
import { whoisLookup } from "../services/whois.service.js";
import { getCache, setCache } from "../services/cache.service.js";


const router = express.Router();

function isIP(input) {
  return /^[0-9.]+$/.test(input);
}

router.get("/lookup/:target", async (req, res) => {
  try {
    let target = req.params.target;
    let ip = target;
    let whois = null;

    if (!isIP(target)) {
      ip = await resolveDomain(target);
      whois = await whoisLookup(target);
    }

    const data = await lookupIP(ip);

    res.json({
      input: target,
      resolved_ip: ip,
      whois,
      data
    });
  } catch (err) {
    res.status(400).json({ error: "Invalid IP or domain" });
  }
});

export default router;
