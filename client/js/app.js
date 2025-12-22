fetch("http://localhost:3000/api/health")
.then(res => res.json())
.then(data => {
    document.getElementById("status").textContent = data.message;
})
.catch(() => {
    document.getElementById("status").textContent = "Backend not reachable";

});