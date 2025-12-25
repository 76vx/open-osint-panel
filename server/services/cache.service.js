const cache = new Map();
export function getCache(key) {
    return cache.get(key);
}

export function setCache(key, value, ttl = 60000) {
    cache.set(key, value);
    setTimeout(() => cache.delate(key), ttl);
}

// esto contiene un TTL por defecto de 60 segundos xd

//cache demasiado basico, proximamente se actualizare haciendo un mejor uso de los recursos