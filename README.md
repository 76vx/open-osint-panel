# Open OSINT Panel

Open OSINT Panel is a web-based toolkit for Open Source Intelligence, specialized in the analysis of IP addresses, domains, and infrastructure using public and legal data sources.

The system is built with pure JavaScript, following a modular and scalable architecture designed for open-source collaboration.

---

## Technical Features

* IP Intelligence: Detailed lookup including geolocation, ISP, and ASN.
* Domain Analysis: Full domain resolution and infrastructure mapping.
* Direct WHOIS: Real TCP WHOIS queries without reliance on third-party APIs.
* Performance: Integrated in-memory caching for rapid data retrieval.
* Security: Native rate limiting protection for system stability.
* Architecture: Modular backend designed for extensibility.
* Interface: Functional frontend prepared for high-end UI implementation.

---

## System Architecture

open-osint-panel/
├── server/
│   ├── routes/
│   ├── services/
│   └── server.js
├── client/
│   ├── index.html
│   └── js/
└── docs/

* Backend: Node.js + Express (Vanilla JavaScript).
* Frontend: HTML5, CSS3, Vanilla JS.
* OSINT Sources: ipinfo.io, TCP WHOIS protocols.

---

## Getting Started

### Installation
1. git clone https://github.com/76vx/open-osint-panel
2. cd open-osint-panel
3. node server/server.js

### Access
The local instance will be available at: http://localhost:3000

---

## API Documentation

Endpoint: GET /api/osint/lookup/:target

Response Payload:
* Resolved IP address.
* Geolocation metadata.
* Network/ASN information.
* WHOIS registration data (for domain targets).

---

## Roadmap

* [x] IP & Domain Lookup
* [x] WHOIS Integration
* [x] Cache & Rate Limiting
* [ ] Professional Dark UI Implementation
* [ ] Relationship Visualization (Graph-based OSINT)
* [ ] Public Deployment

---

## Legal Notice
This project utilizes exclusively public and legal data sources. It is intended strictly for educational and research purposes.

## Contributing
Contributions are welcome. Please open an issue or submit a pull request to discuss proposed changes.
