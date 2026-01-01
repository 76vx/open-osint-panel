export async function lookupIP(ip) {
  const response = await fetch(`https://ipinfo.io/${ip}/json`); //esto es lo que le da la funcionalidad

  if (!response.ok) {
    throw new Error("IP lookup failed");
  }

  return await response.json();
}

//Se que es una mejora de un servicio ip demasiado basico
//pero me dio demasiada pereza hacer algo mejor
//asi que opte por algo simple pero funcional, si no te gusta, te jodes

//implementación de servicios IP elaborado con js