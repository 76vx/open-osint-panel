import dns from "dns/promises";
export async function resolveDomain(domain) {
    const result = await dns.lookup(domain);
    return result.address;
}

//servicio de dominios 
// se necesita una mejora, en proximas actualizaciones 