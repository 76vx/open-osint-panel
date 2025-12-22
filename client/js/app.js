fetch("http://localhost:3000/api/health")
.then(res => res.json())
.then(data => {
    document.getElementById("status").textContent = data.message;
})
.catch(() => {
    document.getElementById("status").textContent = "Backend not reachable";

});
function lookup() { //Implementacion del lookup para su lectura
  const target = document.getElementById("target").value.trim();
  if (!target) return;

  fetch(`/api/osint/lookup/${target}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").textContent =
        JSON.stringify(data, null, 2);
    })
    .catch(() => {
      document.getElementById("result").textContent =
        "Lookup failed";
    });
}
