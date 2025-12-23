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

      renderGraph(data);
    })
    .catch(() => {
      document.getElementById("result").textContent =
        "Invalid IP or domain";
    });
}


function renderGraph(data) {
  const nodes = [];
  const edges = [];

  nodes.push({
    id: "input",
    label: data.input,
    color: "#ff4d4d"
  });


  nodes.push({
    id: "ip",
    label: `IP\n${data.resolved_ip}`,
    color: "#4dff88"
  });

  edges.push({ from: "input", to: "ip" });


  if (data.data.org) {
    nodes.push({
      id: "org",
      label: data.data.org,
      color: "#4da6ff"
    });
    edges.push({ from: "ip", to: "org" });
  }

  if (data.data.country) {
    nodes.push({
      id: "country",
      label: `Country\n${data.data.country}`,
      color: "#ffaa00"
    });
    edges.push({ from: "ip", to: "country" });
  }

  const container = document.getElementById("graph");
  container.innerHTML = ""; 

  const graphData = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges)
  };

  const options = {
    nodes: {
      shape: "dot",
      size: 22,
      font: {
        color: "#ffffff",
        size: 14
      },
      borderWidth: 2
    },
    edges: {
      color: "#777",
      width: 2
    },
    physics: {
      stabilization: true,
      barnesHut: {
        gravitationalConstant: -3000
      }
    },
    interaction: {
      hover: true
    }
  };

  new vis.Network(container, graphData, options);
}
