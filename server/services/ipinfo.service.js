export async function lookupIP(ip) {
    const res = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await res.json();

    if (data.error) {
        throw new Error("Invalid IP");
    }

    return data;
}

//Se que es una mejora de un servicio ip demasiado basico
//pero me dio demasiada pereza hacer algo mejor
//asi que opte por algo simple pero funcional, si no te gusta, te jodes