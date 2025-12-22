import net from "net";

export function whoisLookup(domain) {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection(43, "whois.verisign-grs.com");
    let data = "";

    socket.write(domain + "\r\n");

    socket.on("data", chunk => {
      data += chunk.toString();
    });

    socket.on("end", () => resolve(data));
    socket.on("error", () => reject());
  });
}
