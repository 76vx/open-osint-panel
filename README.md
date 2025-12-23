# Open OSINT Panel

Open OSINT Panel is an open-source web-based OSINT (Open Source Intelligence) tool focused on IP address and domain investigation. It allows users to retrieve network, geolocation, and registration-related information using only public and legal data sources.

This project is intended for educational use, cybersecurity learning, and as a technical portfolio project.

FEATURES

- IP address lookup
- Domain to IP resolution
- WHOIS information for domains
- Network and ISP identification
- Approximate geolocation data
- Visual relationship graph between OSINT entities
- Modular backend architecture
- Lightweight frontend with no frameworks

TECHNOLOGIES USED

Frontend: HTML, CSS, Vanilla JavaScript  
Backend: Node.js with Express  
OSINT Data Source: IPInfo public API  
Graph Visualization: vis-network  

PROJECT STRUCTURE

open-osint-panel/
client/
index.html
css/
style.css
js/
app.js

server/
server.js
routes/
osint.routes.js
services/
ipinfo.service.js
domain.service.js
whois.service.js
cache.service.js

README.md

HOW THE TOOL WORKS STEP BY STEP

1. The user enters an IP address or domain name in the input field.
2. The frontend sends a request to the backend OSINT API.
3. If the input is a domain, it is resolved to an IP address.
4. WHOIS data is collected when the input is a domain.
5. The IP address is analyzed using a public OSINT service.
6. The backend aggregates and returns the collected data.
7. The frontend displays text-based OSINT results and a relationship graph connecting the discovered entities.

INSTALLATION AND USAGE

Requirements:
Node.js version 18 or newer

Installation steps:

1. Clone the repository using Git.
2. Enter the project directory.
3. Navigate to the server folder and install dependencies.
4. Start the backend server using Node.
5. Open the frontend index.html file in a browser.
6. Enter an IP address or domain and perform a lookup.

API ENDPOINTS

Health check endpoint:
GET /api/health  
Returns backend status.

OSINT lookup endpoint:
GET /api/osint/lookup/:target  

The target can be an IP address or a domain name.
Examples:
8.8.8.8
google.com

LEGAL NOTICE

This project uses only publicly available and legal OSINT sources. It does not perform scanning, exploitation, or unauthorized access.

The tool is intended strictly for educational purposes, cybersecurity training, and ethical OSINT research. The author is not responsible for misuse of this software.

PROJECT STATUS

Backend: Stable  
Core OSINT functionality: Complete  
Frontend: Functional and extensible  
Current version: v1.0-alpha  

Future updates may include additional OSINT modules, enhanced visualization, and public deployment.

AUTHOR

Astra
