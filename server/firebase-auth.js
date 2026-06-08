const crypto = require('node:crypto');

const FIREBASE_CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
const CERT_CACHE_TTL_MS = 60 * 60 * 1000;

let cachedCerts = null;
let certsExpiresAt = 0;

function base64UrlDecode(value) {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(normalized, 'base64');
}

function decodeJsonPart(value) {
    return JSON.parse(base64UrlDecode(value).toString('utf8'));
}

async function getFirebaseCerts() {
    if (cachedCerts && certsExpiresAt > Date.now()) {
        return cachedCerts;
    }

    const response = await fetch(FIREBASE_CERTS_URL);
    if (!response.ok) {
        throw new Error('No se pudieron obtener los certificados públicos de Firebase.');
    }

    const cacheControl = response.headers.get('cache-control') || '';
    const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
    const maxAgeMs = maxAgeMatch ? Number(maxAgeMatch[1]) * 1000 : CERT_CACHE_TTL_MS;

    cachedCerts = await response.json();
    certsExpiresAt = Date.now() + maxAgeMs;
    return cachedCerts;
}

function verifySignature(token, certPem) {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(`${encodedHeader}.${encodedPayload}`);
    verifier.end();
    return verifier.verify(certPem, base64UrlDecode(encodedSignature));
}

async function verifyFirebaseIdToken(idToken, projectId) {
    if (!projectId) {
        throw new Error('FIREBASE_PROJECT_ID no está configurado en el backend.');
    }

    if (!idToken || typeof idToken !== 'string') {
        throw new Error('Token de autenticación requerido.');
    }

    const parts = idToken.split('.');
    if (parts.length !== 3) {
        throw new Error('Token de autenticación inválido.');
    }

    const header = decodeJsonPart(parts[0]);
    const payload = decodeJsonPart(parts[1]);

    if (header.alg !== 'RS256') {
        throw new Error('Algoritmo de token no permitido.');
    }

    const certs = await getFirebaseCerts();
    const certPem = certs[header.kid];
    if (!certPem || !verifySignature(idToken, certPem)) {
        throw new Error('Firma de token inválida.');
    }

    const now = Math.floor(Date.now() / 1000);
    const expectedIssuer = `https://securetoken.google.com/${projectId}`;

    if (payload.aud !== projectId) {
        throw new Error('Audiencia de token inválida.');
    }

    if (payload.iss !== expectedIssuer) {
        throw new Error('Emisor de token inválido.');
    }

    if (!payload.sub) {
        throw new Error('Token sin usuario válido.');
    }

    if (payload.exp <= now) {
        throw new Error('Token de autenticación expirado.');
    }

    if (payload.iat > now + 60) {
        throw new Error('Token de autenticación emitido en el futuro.');
    }

    return {
        uid: payload.sub,
        email: payload.email || null,
        name: payload.name || null,
        picture: payload.picture || null,
        claims: payload
    };
}

function getBearerToken(req) {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return null;
    return header.slice('Bearer '.length).trim();
}

module.exports = {
    getBearerToken,
    verifyFirebaseIdToken
};
