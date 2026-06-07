/**
 * Biometric Authentication Module
 * Implementa autenticación con huella digital y Face ID usando WebAuthn API
 */

// Verificar si el navegador soporta WebAuthn
function isBiometricSupported() {
    return window.PublicKeyCredential !== undefined && 
           navigator.credentials !== undefined;
}

// Verificar si hay autenticación biométrica disponible
async function checkBiometricAvailability() {
    try {
        if (!isBiometricSupported()) {
            return { 
                available: false, 
                reason: 'Tu navegador no soporta autenticación biométrica' 
            };
        }

        // Verificar si el dispositivo tiene autenticación biométrica
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        
        return { 
            available: available,
            reason: available ? 'Autenticación biométrica disponible' : 'No se detectó sensor biométrico'
        };
    } catch (error) {
        console.error('Error al verificar biometría:', error);
        return { 
            available: false, 
            reason: 'Error al verificar disponibilidad' 
        };
    }
}

// Registrar huella digital para pagos
async function registerBiometric(userId, userName) {
    try {
        if (!isBiometricSupported()) {
            throw new Error('Autenticación biométrica no soportada');
        }

        // Generar un challenge aleatorio
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        // Configuración para el registro
        const publicKeyCredentialCreationOptions = {
            challenge: challenge,
            rp: {
                name: "innovationTECH",
                id: window.location.hostname
            },
            user: {
                id: Uint8Array.from(userId, c => c.charCodeAt(0)),
                name: userName,
                displayName: userName
            },
            pubKeyCredParams: [
                { alg: -7, type: "public-key" },  // ES256
                { alg: -257, type: "public-key" } // RS256
            ],
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                userVerification: "required",
                requireResidentKey: false
            },
            timeout: 60000,
            attestation: "none"
        };

        // Crear credencial
        const credential = await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });

        // Guardar credencial en localStorage
        const credentialData = {
            id: credential.id,
            rawId: arrayBufferToBase64(credential.rawId),
            type: credential.type,
            userId: userId,
            userName: userName,
            registeredAt: new Date().toISOString()
        };

        localStorage.setItem('innovationtech_biometric_credential', JSON.stringify(credentialData));
        
        console.log('✅ Huella digital registrada correctamente');
        
        return { 
            success: true, 
            credentialId: credential.id,
            message: 'Huella digital registrada exitosamente'
        };
    } catch (error) {
        console.error('❌ Error al registrar huella digital:', error);
        return { 
            success: false, 
            error: error.message || 'Error al registrar huella digital'
        };
    }
}

// Autenticar con huella digital para pago
async function authenticateWithBiometric() {
    try {
        if (!isBiometricSupported()) {
            throw new Error('Autenticación biométrica no soportada');
        }

        // Obtener credencial guardada
        const savedCredential = localStorage.getItem('innovationtech_biometric_credential');
        if (!savedCredential) {
            throw new Error('No hay huella digital registrada');
        }

        const credentialData = JSON.parse(savedCredential);

        // Generar un nuevo challenge
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        // Configuración para la autenticación
        const publicKeyCredentialRequestOptions = {
            challenge: challenge,
            allowCredentials: [{
                id: base64ToArrayBuffer(credentialData.rawId),
                type: 'public-key',
                transports: ['internal']
            }],
            userVerification: "required",
            timeout: 60000
        };

        // Autenticar
        const assertion = await navigator.credentials.get({
            publicKey: publicKeyCredentialRequestOptions
        });

        console.log('✅ Autenticación biométrica exitosa');
        
        return { 
            success: true,
            userId: credentialData.userId,
            userName: credentialData.userName,
            authenticatedAt: new Date().toISOString(),
            message: 'Pago autorizado con huella digital'
        };
    } catch (error) {
        console.error('❌ Error en autenticación biométrica:', error);
        
        let errorMessage = 'Error al autenticar con huella digital';
        if (error.name === 'NotAllowedError') {
            errorMessage = 'Autenticación cancelada o denegada';
        } else if (error.name === 'InvalidStateError') {
            errorMessage = 'Credencial no válida';
        }
        
        return { 
            success: false, 
            error: errorMessage
        };
    }
}

// Eliminar huella digital registrada
function removeBiometric() {
    try {
        localStorage.removeItem('innovationtech_biometric_credential');
        console.log('✅ Huella digital eliminada');
        return { success: true, message: 'Huella digital eliminada' };
    } catch (error) {
        console.error('❌ Error al eliminar huella digital:', error);
        return { success: false, error: error.message };
    }
}

// Verificar si hay huella digital registrada
function hasBiometricRegistered() {
    return localStorage.getItem('innovationtech_biometric_credential') !== null;
}

// Obtener información de la huella registrada
function getBiometricInfo() {
    try {
        const savedCredential = localStorage.getItem('innovationtech_biometric_credential');
        if (!savedCredential) {
            return null;
        }
        return JSON.parse(savedCredential);
    } catch (error) {
        console.error('Error al obtener info biométrica:', error);
        return null;
    }
}

// Utilidades para conversión de datos
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

// Exportar funciones
window.BiometricAuth = {
    isSupported: isBiometricSupported,
    checkAvailability: checkBiometricAvailability,
    register: registerBiometric,
    authenticate: authenticateWithBiometric,
    remove: removeBiometric,
    hasRegistered: hasBiometricRegistered,
    getInfo: getBiometricInfo
};

console.log('🔐 Módulo de autenticación biométrica cargado');

// Made with Bob
