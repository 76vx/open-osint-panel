fetch("/api/health")
  .then(res => res.json())
  .then(data => {
    document.getElementById("status").textContent = data.message;
  })
  .catch(() => {
    document.getElementById("status").textContent = "Backend not reachable";
  });

function lookup() {
  const target = document.getElementById("target").value.trim();
  if (!target) return;

  document.getElementById("result").textContent = "Searching...";

  fetch(`/api/osint/lookup/${target}`)
    .then(res => {
      if (!res.ok) throw new Error("Lookup failed");
      return res.json();
    })
    .then(data => {
      const output = `
Input: ${data.input}
Resolved IP: ${data.resolved_ip}

Country: ${data.data.country}
Region: ${data.data.region}
City: ${data.data.city}
ISP: ${data.data.org}
ASN: ${data.data.asn?.name || "N/A"}
Location: ${data.data.loc}
      `;
      document.getElementById("result").textContent = output.trim();
    })
    .catch(() => {
      document.getElementById("result").textContent =
        "Invalid IP or domain";
    });
}
