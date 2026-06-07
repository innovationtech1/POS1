# 🔥 Configurar Firebase para innovationTECH

## 📋 ¿Qué es Firebase?

Firebase es una plataforma de Google que proporciona:
- **Authentication**: Sistema de login (Google, Email, etc.)
- **Firestore**: Base de datos en tiempo real
- **Analytics**: Estadísticas de uso
- **Hosting**: Alojamiento web (opcional)

## ✅ El Proyecto Ya Está Configurado

Tu proyecto **ya tiene Firebase configurado** con estas credenciales:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyB_k44nVjs-9xefFQJEpXF-jqOVeNkAeU0",
    authDomain: "innovationtech-6e205.firebaseapp.com",
    projectId: "innovationtech-6e205",
    storageBucket: "innovationtech-6e205.firebasestorage.app",
    messagingSenderId: "527729216000",
    appId: "1:527729216000:web:6024b07fadaa105e72a6e5",
    measurementId: "G-Q86CHBMZ1H"
};
```

## 🎯 ¿Necesitas Crear Tu Propio Proyecto Firebase?

Si quieres usar tu propia cuenta de Firebase:

### Paso 1: Crear Proyecto

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Click en "Agregar proyecto"
3. Nombre: `innovationtech` (o el que prefieras)
4. Acepta los términos
5. Habilita Google Analytics (opcional)
6. Click en "Crear proyecto"

### Paso 2: Registrar tu App Web

1. En el dashboard, click en el ícono web `</>`
2. Nombre de la app: `innovationTECH Web`
3. **NO** marques "Firebase Hosting" (por ahora)
4. Click en "Registrar app"
5. Copia la configuración que aparece

### Paso 3: Actualizar Configuración

1. Abre `js/firebase-config.js`
2. Reemplaza las líneas 13-21 con tu configuración:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT.firebasestorage.app",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID",
    measurementId: "TU_MEASUREMENT_ID"
};
```

### Paso 4: Habilitar Authentication

1. En Firebase Console, ve a "Authentication"
2. Click en "Get started"
3. En la pestaña "Sign-in method":
   - **Google**: Click en "Google" → Habilitar → Guardar
   - **Email/Password**: Click en "Email/Password" → Habilitar → Guardar

### Paso 5: Configurar Dominios Autorizados

1. En "Authentication" → "Settings" → "Authorized domains"
2. Agrega tus dominios:
   - `localhost` (ya está)
   - `tu-usuario.github.io` (si usas GitHub Pages)
   - `tu-dominio.com` (si tienes dominio propio)

### Paso 6: Crear Base de Datos Firestore

1. En Firebase Console, ve a "Firestore Database"
2. Click en "Create database"
3. Selecciona "Start in production mode"
4. Elige ubicación: `us-central` (o la más cercana)
5. Click en "Enable"

### Paso 7: Configurar Reglas de Seguridad

1. En Firestore, ve a la pestaña "Rules"
2. Reemplaza con estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura de cotizaciones
    match /quotations/{quotationId} {
      allow read, write: if true;
    }
    
    // Permitir lectura/escritura de usuarios autenticados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click en "Publish"

## 🔒 Seguridad

### Claves API

- ✅ La `apiKey` puede ser pública (está en el frontend)
- ❌ NUNCA compartas las claves de servidor
- ✅ Las reglas de Firestore protegen tus datos

### Mejores Prácticas

1. **Usa reglas de seguridad** en Firestore
2. **Limita dominios autorizados** en Authentication
3. **Monitorea el uso** en el dashboard
4. **Habilita App Check** (opcional, para producción)

## 📊 Estructura de Datos

### Colección: `quotations`

Cada pedido se guarda con esta estructura:

```javascript
{
  customerName: "Juan Pérez",
  customerEmail: "juan@email.com",
  customerPhone: "+1234567890",
  customerCompany: "Mi Empresa",
  deliveryDate: "2026-12-31",
  brief: "Descripción del proyecto...",
  services: [
    {
      serviceId: "marketing",
      serviceName: "Marketing Digital",
      tier: "pro",
      tierLabel: "Profesional",
      quantity: 1,
      basePrice: 399,
      total: 399,
      deliverables: [...],
      extras: {...}
    }
  ],
  subtotal: 399,
  total: 399,
  status: "pending", // pending, paid, completed, cancelled
  paymentMethod: "cashapp",
  paymentConfirmation: "ABC123",
  createdAt: Timestamp,
  paidAt: Timestamp (opcional)
}
```

## 🔍 Ver Datos en Firebase

1. Ve a Firebase Console
2. Click en "Firestore Database"
3. Verás todas las colecciones y documentos
4. Click en cualquier documento para ver detalles

## 📈 Analytics (Opcional)

Si habilitaste Analytics:

1. Ve a "Analytics" en Firebase Console
2. Verás estadísticas de:
   - Usuarios activos
   - Eventos (login, sign_up, etc.)
   - Conversiones
   - Retención

## 🚨 Solución de Problemas

### Error: "Firebase not initialized"

**Solución:** Verifica que los scripts de Firebase estén cargando:

```html
<!-- En index.html -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
```

### Error: "Permission denied"

**Solución:** Revisa las reglas de Firestore. Asegúrate de que permiten lectura/escritura.

### Login con Google no funciona

**Solución:**
1. Verifica que Google esté habilitado en Authentication
2. Agrega tu dominio a "Authorized domains"
3. Verifica que el `authDomain` sea correcto en la configuración

## 💰 Costos

Firebase tiene un plan gratuito generoso:

### Plan Spark (Gratis)
- ✅ 50,000 lecturas/día en Firestore
- ✅ 20,000 escrituras/día
- ✅ 10,000 usuarios autenticados
- ✅ 1GB de almacenamiento
- ✅ 10GB de transferencia/mes

### Plan Blaze (Pago por uso)
- Solo pagas lo que usas
- Incluye todo del plan gratuito
- Después se cobra por uso adicional

**Para tu caso:** El plan gratuito es más que suficiente.

## 📞 Soporte

- **Documentación**: https://firebase.google.com/docs
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/firebase
- **Comunidad**: https://firebase.google.com/community

## ✅ Checklist

- [ ] Proyecto Firebase creado
- [ ] App web registrada
- [ ] Configuración actualizada en `js/firebase-config.js`
- [ ] Authentication habilitado (Google + Email)
- [ ] Dominios autorizados agregados
- [ ] Firestore Database creado
- [ ] Reglas de seguridad configuradas
- [ ] Probado login con Google
- [ ] Probado registro con email

---

**¡Firebase configurado y listo para usar! 🔥**