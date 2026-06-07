# 💳 Guía Completa para Configurar Stripe

## 📋 ¿Qué es Stripe?

Stripe es una plataforma de pagos que te permite aceptar tarjetas de crédito y débito de forma segura. Es usado por empresas como Amazon, Google, Shopify, etc.

## 🎯 Ventajas de Usar Stripe

- ✅ Acepta todas las tarjetas principales (Visa, Mastercard, Amex, etc.)
- ✅ Seguridad PCI compliant (no guardas datos de tarjetas)
- ✅ Comisión: 2.9% + $0.30 USD por transacción
- ✅ Depósitos automáticos a tu cuenta bancaria
- ✅ Dashboard para ver todas las transacciones
- ✅ Sin costos mensuales (solo pagas por transacción)

---

## 🚀 Paso 1: Crear Cuenta en Stripe

1. **Ve a Stripe**
   - Visita: https://stripe.com
   - Click en "Start now" o "Sign up"

2. **Completa el Registro**
   - Email: hectordehoyos053@gmail.com
   - Contraseña: (crea una segura)
   - País: United States
   - Tipo de negocio: Individual o Business

3. **Verifica tu Email**
   - Revisa tu correo
   - Click en el link de verificación

---

## 🔑 Paso 2: Obtener tus Claves API

### Modo Test (Para Pruebas)

1. **Accede al Dashboard**
   - Ve a: https://dashboard.stripe.com
   - Inicia sesión

2. **Obtén las Claves de Test**
   - En el menú superior derecho, asegúrate que diga "Test mode" (modo prueba)
   - Click en "Developers" en el menú lateral
   - Click en "API keys"
   - Verás dos claves:
     - **Publishable key** (Clave pública) - Comienza con `pk_test_...`
     - **Secret key** (Clave secreta) - Comienza con `sk_test_...`

3. **Copia la Clave Pública**
   - Click en "Reveal test key" en la Publishable key
   - Copia toda la clave (ejemplo: `pk_test_51Abc123...`)

4. **Actualiza tu Código**
   - Abre `script.js`
   - Ve a la línea 1137
   - Reemplaza:
   ```javascript
   const STRIPE_PUBLIC_KEY = 'pk_test_TU_CLAVE_AQUI';
   ```

### Modo Producción (Para Pagos Reales)

**⚠️ IMPORTANTE: Solo activa modo producción cuando estés listo para recibir pagos reales**

1. **Completa la Activación de tu Cuenta**
   - En el dashboard, verás un banner "Activate your account"
   - Click en "Activate account"
   - Completa la información:
     - Información personal (nombre, dirección, SSN/EIN)
     - Información bancaria (para recibir pagos)
     - Información del negocio

2. **Obtén las Claves de Producción**
   - En el dashboard, cambia de "Test mode" a "Live mode" (esquina superior derecha)
   - Ve a "Developers" → "API keys"
   - Copia la **Publishable key** (comienza con `pk_live_...`)

3. **Actualiza tu Código para Producción**
   ```javascript
   const STRIPE_PUBLIC_KEY = 'pk_live_TU_CLAVE_REAL';
   ```

---

## 🧪 Paso 3: Probar Pagos en Modo Test

### Tarjetas de Prueba de Stripe

Usa estas tarjetas para probar (modo test):

**✅ Pago Exitoso:**
```
Número: 4242 4242 4242 4242
Fecha: Cualquier fecha futura (ej: 12/25)
CVC: Cualquier 3 dígitos (ej: 123)
ZIP: Cualquier código postal (ej: 12345)
```

**❌ Pago Rechazado:**
```
Número: 4000 0000 0000 0002
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
```

**🔐 Requiere Autenticación 3D Secure:**
```
Número: 4000 0027 6000 3184
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
```

### Cómo Probar

1. Abre tu sitio web
2. Agrega servicios al carrito
3. Completa el formulario
4. Click en "Vista Previa"
5. Click en "Proceder al Pago"
6. Selecciona "Tarjeta de Crédito/Débito"
7. Ingresa una tarjeta de prueba
8. Click en "Completar Pago"
9. Verifica en el dashboard de Stripe que aparezca el pago

---

## 💰 Paso 4: Configurar Cuenta Bancaria (Para Recibir Dinero)

1. **Ve a Settings**
   - En el dashboard: Click en "Settings" (⚙️)
   - Click en "Bank accounts and scheduling"

2. **Agrega tu Cuenta Bancaria**
   - Click en "Add bank account"
   - Ingresa:
     - Routing number (número de ruta de tu banco)
     - Account number (número de cuenta)
     - Account holder name (tu nombre)

3. **Verifica la Cuenta**
   - Stripe hará 2 depósitos pequeños (menos de $1)
   - En 1-2 días, verifica los montos en tu cuenta
   - Ingresa los montos en Stripe para verificar

4. **Configura el Calendario de Pagos**
   - Automático: Stripe deposita cada 2 días hábiles
   - Manual: Tú decides cuándo retirar

---

## 🔒 Paso 5: Seguridad y Mejores Prácticas

### ⚠️ NUNCA Compartas tu Secret Key

- ❌ NO pongas `sk_test_...` o `sk_live_...` en tu código frontend
- ❌ NO subas tu Secret Key a GitHub
- ✅ Solo usa la Publishable Key (`pk_test_...` o `pk_live_...`) en el frontend

### Configuración de Seguridad

1. **Habilita Radar (Detección de Fraude)**
   - Ve a "Radar" en el dashboard
   - Activa las reglas de protección
   - Stripe bloqueará automáticamente pagos sospechosos

2. **Configura Webhooks (Opcional pero Recomendado)**
   - Para recibir notificaciones de pagos exitosos
   - Ve a "Developers" → "Webhooks"
   - Agrega endpoint: `https://tu-sitio.com/webhook`
   - (Requiere backend - opcional para tu caso)

---

## 📊 Paso 6: Monitorear Pagos

### Dashboard de Stripe

1. **Ver Pagos**
   - Ve a "Payments" en el dashboard
   - Verás todos los pagos recibidos
   - Click en cualquier pago para ver detalles

2. **Exportar Datos**
   - Click en "Export" para descargar CSV
   - Útil para contabilidad

3. **Reembolsos**
   - Click en un pago
   - Click en "Refund"
   - Ingresa el monto a reembolsar

---

## 💡 Configuración Avanzada (Opcional)

### 1. Personalizar Descripción de Pagos

En `script.js`, busca la función `processStripePayment()` y agrega:

```javascript
async function processStripePayment() {
    try {
        if (!stripe || !cardElement) {
            throw new Error('Stripe no está configurado correctamente');
        }
        
        // Crear token de pago con metadata
        const {token, error} = await stripe.createToken(cardElement, {
            name: currentQuotationData.customerName,
            address_line1: 'San Antonio, TX',
            address_country: 'US'
        });
        
        if (error) {
            throw new Error(error.message);
        }
        
        console.log('✅ Token de Stripe creado:', token.id);
        
        return {
            success: true,
            confirmation: token.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
```

### 2. Agregar Logo de tu Empresa

En el dashboard de Stripe:
- Settings → Branding
- Sube tu logo
- Aparecerá en los recibos de pago

---

## 🚨 Solución de Problemas

### Error: "Stripe is not defined"
**Solución:** Verifica que el script de Stripe esté cargando:
```html
<!-- En index.html, línea 41 -->
<script src="https://js.stripe.com/v3/"></script>
```

### Error: "Invalid API key"
**Solución:** 
- Verifica que copiaste la clave completa
- Asegúrate de usar `pk_test_...` (no `sk_test_...`)
- Verifica que no haya espacios al inicio o final

### Pago no aparece en el Dashboard
**Solución:**
- Verifica que estés en el modo correcto (Test/Live)
- Espera unos segundos y refresca la página
- Revisa la consola del navegador por errores

---

## 📋 Checklist de Configuración

- [ ] Cuenta de Stripe creada
- [ ] Email verificado
- [ ] Clave pública obtenida (pk_test_...)
- [ ] Clave actualizada en script.js línea 1137
- [ ] Probado con tarjeta de test (4242 4242 4242 4242)
- [ ] Pago aparece en dashboard de Stripe
- [ ] Cuenta bancaria agregada (para producción)
- [ ] Cuenta activada (para producción)
- [ ] Cambiado a clave de producción (pk_live_...)

---

## 💰 Costos de Stripe

### Comisiones
- **Por transacción:** 2.9% + $0.30 USD
- **Ejemplo:** 
  - Venta de $100 → Recibes $96.80
  - Venta de $500 → Recibes $485.20

### Sin Costos Ocultos
- ❌ Sin costo mensual
- ❌ Sin costo de setup
- ❌ Sin costo de cancelación
- ✅ Solo pagas cuando vendes

---

## 🎯 Alternativas a Stripe (Si no puedes usar Stripe)

Si tienes problemas para activar Stripe, puedes usar:

1. **PayPal Checkout** - Similar a Stripe
2. **Square** - Bueno para negocios físicos también
3. **Mercado Pago** - Popular en Latinoamérica
4. **Solo métodos manuales** - Cash App, Zelle, etc. (ya configurados)

---

## 📞 Soporte de Stripe

- **Email:** support@stripe.com
- **Chat:** Disponible en el dashboard
- **Documentación:** https://stripe.com/docs
- **Teléfono:** +1 (888) 926-2289

---

## ✅ Resumen Rápido

```bash
1. Crear cuenta en stripe.com
2. Ir a Developers → API keys
3. Copiar Publishable key (pk_test_...)
4. Pegar en script.js línea 1137
5. Probar con tarjeta 4242 4242 4242 4242
6. ¡Listo para recibir pagos!
```

**¡Tu sistema de pagos con Stripe está listo! 💳**