/**
 * Firebase Configuration
 * IMPORTANTE: Reemplaza estos valores con tu configuración real de Firebase
 * 
 * Para obtener tu configuración:
 * 1. Ve a https://console.firebase.google.com/
 * 2. Crea un proyecto nuevo o selecciona uno existente
 * 3. Ve a Configuración del proyecto > General
 * 4. En "Tus apps" > "SDK setup and configuration"
 * 5. Copia los valores de firebaseConfig
 */

const firebaseConfig = {
    apiKey: "AIzaSyB_k44nVjs-9xefFQJEpXF-jqOVeNkAeU0",
    authDomain: "innovationtech-6e205.firebaseapp.com",
    projectId: "innovationtech-6e205",
    storageBucket: "innovationtech-6e205.firebasestorage.app",
    messagingSenderId: "527729216000",
    appId: "1:527729216000:web:6024b07fadaa105e72a6e5",
    measurementId: "G-Q86CHBMZ1H"
};

// Inicializar Firebase
let db = null;
let analytics = null;
let auth = null;

function initializeFirebase() {
    try {
        // Inicializar Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        // Inicializar Auth
        auth = firebase.auth();
        
        // Inicializar Firestore
        db = firebase.firestore();
        
        // Inicializar Analytics (opcional)
        if (typeof firebase.analytics === 'function') {
            analytics = firebase.analytics();
        }
        
        console.log('✅ Firebase inicializado correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al inicializar Firebase:', error);
        return false;
    }
}

// ========================================================================
// Authentication Functions
// ========================================================================

// Sign in with Google
async function signInWithGoogle() {
    try {
        if (!auth) {
            throw new Error('Firebase Auth no está inicializado');
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        console.log('✅ Usuario autenticado con Google:', user.email);
        
        // Registrar evento en Analytics
        if (analytics) {
            analytics.logEvent('login', {
                method: 'google'
            });
        }
        
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ Error al iniciar sesión con Google:', error);
        return { success: false, error: error.message };
    }
}

// Sign in with Email/Password
async function signInWithEmail(email, password) {
    try {
        if (!auth) {
            throw new Error('Firebase Auth no está inicializado');
        }

        const result = await auth.signInWithEmailAndPassword(email, password);
        const user = result.user;
        
        console.log('✅ Usuario autenticado con email:', user.email);
        
        // Registrar evento en Analytics
        if (analytics) {
            analytics.logEvent('login', {
                method: 'email'
            });
        }
        
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ Error al iniciar sesión:', error);
        return { success: false, error: error.message };
    }
}

// Sign up with Email/Password
async function signUpWithEmail(email, password, displayName) {
    try {
        if (!auth) {
            throw new Error('Firebase Auth no está inicializado');
        }

        const result = await auth.createUserWithEmailAndPassword(email, password);
        const user = result.user;
        
        // Actualizar perfil con nombre
        if (displayName) {
            await user.updateProfile({
                displayName: displayName
            });
        }
        
        console.log('✅ Usuario registrado:', user.email);
        
        // Registrar evento en Analytics
        if (analytics) {
            analytics.logEvent('sign_up', {
                method: 'email'
            });
        }
        
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        return { success: false, error: error.message };
    }
}

// Sign out
async function signOut() {
    try {
        if (!auth) {
            throw new Error('Firebase Auth no está inicializado');
        }

        await auth.signOut();
        console.log('✅ Sesión cerrada');
        
        return { success: true };
    } catch (error) {
        console.error('❌ Error al cerrar sesión:', error);
        return { success: false, error: error.message };
    }
}

// Reset password
async function resetPassword(email) {
    try {
        if (!auth) {
            throw new Error('Firebase Auth no está inicializado');
        }

        await auth.sendPasswordResetEmail(email);
        console.log('✅ Email de recuperación enviado');
        
        return { success: true };
    } catch (error) {
        console.error('❌ Error al enviar email de recuperación:', error);
        return { success: false, error: error.message };
    }
}

// Get current user
function getCurrentUser() {
    if (!auth) {
        return null;
    }
    return auth.currentUser;
}

// Continue as guest
function continueAsGuest() {
    try {
        // Guardar en localStorage que el usuario es invitado
        localStorage.setItem('innovationtech_guest_mode', 'true');
        localStorage.setItem('innovationtech_guest_id', 'guest_' + Date.now());
        
        console.log('✅ Continuando como invitado');
        
        // Registrar evento en Analytics
        if (analytics) {
            analytics.logEvent('guest_access');
        }
        
        return { success: true, isGuest: true };
    } catch (error) {
        console.error('❌ Error al continuar como invitado:', error);
        return { success: false, error: error.message };
    }
}

// Check if user is guest
function isGuestMode() {
    return localStorage.getItem('innovationtech_guest_mode') === 'true';
}

// Auth state observer
function onAuthStateChanged(callback) {
    if (!auth) {
        console.warn('Firebase Auth no está inicializado');
        return () => {};
    }
    
    return auth.onAuthStateChanged(callback);
}

// Función para guardar cotización en Firebase
async function saveQuotationToFirebase(quotationData) {
    try {
        if (!db) {
            console.warn('Firebase no está inicializado. Guardando localmente...');
            saveQuotationLocally(quotationData);
            return { success: false, error: 'Firebase no inicializado' };
        }

        // Agregar timestamp
        quotationData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        quotationData.status = 'pending'; // pending, paid, completed, cancelled
        
        // Guardar en Firestore
        const docRef = await db.collection('quotations').add(quotationData);
        
        console.log('✅ Cotización guardada en Firebase:', docRef.id);
        
        // También guardar localmente como backup
        saveQuotationLocally({ ...quotationData, firebaseId: docRef.id });
        
        // Registrar evento en Analytics
        if (analytics) {
            analytics.logEvent('quotation_created', {
                quotation_id: docRef.id,
                total_amount: quotationData.total,
                services_count: quotationData.services.length
            });
        }
        
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('❌ Error al guardar en Firebase:', error);
        // Guardar localmente como fallback
        saveQuotationLocally(quotationData);
        return { success: false, error: error.message };
    }
}

// Función para actualizar estado de pago
async function updatePaymentStatus(quotationId, paymentData) {
    try {
        if (!db) {
            console.warn('Firebase no está inicializado');
            return { success: false, error: 'Firebase no inicializado' };
        }

        await db.collection('quotations').doc(quotationId).update({
            status: 'paid',
            paymentMethod: paymentData.method,
            paymentConfirmation: paymentData.confirmation,
            paidAt: firebase.firestore.FieldValue.serverTimestamp(),
            paymentAmount: paymentData.amount
        });
        
        console.log('✅ Estado de pago actualizado:', quotationId);
        
        // Registrar evento en Analytics
        if (analytics) {
            analytics.logEvent('payment_completed', {
                quotation_id: quotationId,
                payment_method: paymentData.method,
                amount: paymentData.amount
            });
        }
        
        return { success: true };
    } catch (error) {
        console.error('❌ Error al actualizar pago:', error);
        return { success: false, error: error.message };
    }
}

// Función para obtener todas las cotizaciones (para admin)
async function getAllQuotations(limit = 50) {
    try {
        if (!db) {
            console.warn('Firebase no está inicializado');
            return { success: false, data: [] };
        }

        const snapshot = await db.collection('quotations')
            .orderBy('createdAt', 'desc')
            .limit(limit)
            .get();
        
        const quotations = [];
        snapshot.forEach(doc => {
            quotations.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return { success: true, data: quotations };
    } catch (error) {
        console.error('❌ Error al obtener cotizaciones:', error);
        return { success: false, data: [], error: error.message };
    }
}

// Función para guardar localmente (backup)
function saveQuotationLocally(quotationData) {
    try {
        const localQuotations = JSON.parse(localStorage.getItem('innovationtech_quotations') || '[]');
        localQuotations.push({
            ...quotationData,
            localId: Date.now(),
            savedLocally: true
        });
        localStorage.setItem('innovationtech_quotations', JSON.stringify(localQuotations));
        console.log('💾 Cotización guardada localmente como backup');
    } catch (error) {
        console.error('❌ Error al guardar localmente:', error);
    }
}

// Función para obtener cotizaciones locales
function getLocalQuotations() {
    try {
        return JSON.parse(localStorage.getItem('innovationtech_quotations') || '[]');
    } catch (error) {
        console.error('❌ Error al obtener cotizaciones locales:', error);
        return [];
    }
}

// Exportar funciones
window.FirebaseDB = {
    initialize: initializeFirebase,
    saveQuotation: saveQuotationToFirebase,
    updatePayment: updatePaymentStatus,
    getAllQuotations: getAllQuotations,
    getLocalQuotations: getLocalQuotations
};

// Made with Bob
