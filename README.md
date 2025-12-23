# Open OSINT Panel

Open OSINT Panel is a web-based **OSINT (Open Source Intelligence) toolkit** focused on  
IP addresses, domains, and internet infrastructure analysis using **public and legal data sources**.

The project is built **entirely in JavaScript**, with a modular architecture designed to scale as more OSINT modules are added.

---

## Features

- **IP Lookup**
  - Geolocation (country, region, city)
  - ISP / Organization
  - ASN information

- **Domain Analysis**
  - Domain to IP resolution
  - Infrastructure visibility

- **WHOIS Lookup**
  - Real WHOIS queries over TCP (no third-party WHOIS APIs)
  - Raw registry data for transparency

- **In-memory Cache**
  - Prevents repeated queries
  - Improves performance

- **Rate Limiting**
  - Protects the backend from abuse
  - Ready for public exposure

- **Modular Backend**
  - Clean separation of routes and services
  - Easy to extend with new OSINT modules

---

## Architecture
open-osint-panel/
├── server/
│ ├── routes/
│ ├── services/
│ └── server.js
├── client/
│ ├── index.html
│ └── js/
└── docs/


- **Backend:** Node.js + Express (100% JavaScript)
- **Frontend:** HTML, CSS, Vanilla JS
- **OSINT Sources:** ipinfo.io, TCP WHOIS servers

---

## Getting Started

```bash
git clone https://github.com/76vx/open-osint-panel
cd open-osint-panel
node server/server.js

- Open in browser:
http://localhost:3000

- API Example:
GET /api/osint/lookup/google.com






