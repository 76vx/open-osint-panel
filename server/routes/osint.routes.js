// Ruta osint hecha manualmente por mi (propia)

import express from "express";
import { lookupIP } from "../services/ipinfo.service.js";
import { resolveDomain } from "../services/domain.service.js";

const router = express.Router();

function isIP(input) {
  return /^[0-9.]+$/.test(input); //se que se puede hacer de otra manera, pero esta es mas definida y funcional
   //hacer esto fue una autentica locura y dolor de cabeza pero aprendi algo nuevo
}

router.get("/lookup/:target", async (req, res) => {
  try {
    let target = req.params.target;
    let ip = target;

    if (!isIP(target)) {
      ip = await resolveDomain(target);
    }

    const data = await lookupIP(ip);

    res.json({
      input: target,
      resolved_ip: ip,
      data
    });
  } catch (err) {
    res.status(400).json({ error: "Invalid IP or domain" });
  }
});

export default router;

// Este Regex esta simple a proposito
// Mas adelante se reafinara, revisen los demas archivos