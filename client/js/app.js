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
  clearGraph();

  fetch(`/api/osint/lookup/${target}`)
    .then(res => {
      if (!res.ok) throw new Error("Lookup failed");
      return res.json();
    })
    .then(data => {
      renderTextResult(data);
      renderGraph(data);
    })
    .catch(() => {
      document.getElementById("result").textContent =
        "Invalid IP or domain";
    });
}

function renderTextResult(data) {
  const output = `
Input: ${data.input}
Resolved IP: ${data.resolved_ip}

Country: ${data.data.country || "N/A"}
Region: ${data.data.region || "N/A"}
City: ${data.data.city || "N/A"}
ISP / Org: ${data.data.org || "N/A"}
Location: ${data.data.loc || "N/A"}
  `;

  document.getElementById("result").textContent = output.trim();
}



function renderGraph(data) {
  const nodes = [];
  const edges = [];

 
  nodes.push({
    id: "input",
    label: data.input,
    color: "#ff5555"
  });

 
  nodes.push({
    id: "ip",
    label: `IP\n${data.resolved_ip}`,
    color: "#50fa7b"
  });
  edges.push({ from: "input", to: "ip" });


  if (data.data.org) {
    nodes.push({
      id: "org",
      label: data.data.org,
      color: "#8be9fd"
    });
    edges.push({ from: "ip", to: "org" });
  }

  if (data.data.country) {
    nodes.push({
      id: "country",
      label: `Country\n${data.data.country}`,
      color: "#f1fa8c"
    });
    edges.push({ from: "ip", to: "country" });
  }

  if (data.data.city) {
    nodes.push({
      id: "city",
      label: `City\n${data.data.city}`,
      color: "#bd93f9"
    });
    edges.push({ from: "country", to: "city" });
  }

  if (data.whois) {
    nodes.push({
      id: "whois",
      label: "WHOIS",
      color: "#ff79c6"
    });
    edges.push({ from: "input", to: "whois" });
  }

  const container = document.getElementById("graph");

  const graphData = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges)
  };

  const options = {
    nodes: {
      shape: "dot",
      size: 22,
      borderWidth: 2,
      font: {
        color: "#ffffff",
        size: 13
      }
    },
    edges: {
      color: "#444",
      width: 2
    },
    physics: {
      stabilization: true,
      barnesHut: {
        gravitationalConstant: -3000,
        springLength: 150
      }
    },
    interaction: {
      hover: true,
      zoomView: true
    }
  };

  new vis.Network(container, graphData, options);
}

function clearGraph() {
  const container = document.getElementById("graph");
  if (container) container.innerHTML = "";
}
//el estilo lo podria haber hecho en otro script por separado pero me dio pereza
