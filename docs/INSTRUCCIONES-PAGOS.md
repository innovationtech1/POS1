# 💳 Sistema de Pagos - innovationTECH

## 📋 Métodos de Pago Disponibles

### 1. 💵 Cash App (Recomendado)
- **Usuario**: $lilhector210
- **Nombre**: Hector De Hoyos
- **Código QR**: Disponible en el modal de pago
- **Ventajas**: Instantáneo, sin comisiones, fácil de usar

**Cómo pagar:**
1. Abre Cash App en tu teléfono
2. Escanea el código QR mostrado
3. O busca: $lilhector210
4. Envía el monto exacto
5. Copia el ID de confirmación
6. Pégalo en el formulario

### 2. 🏦 Zelle
- **Email**: hectordehoyos053@gmail.com
- **Nombre**: Hector De Hoyos
- **Ventajas**: Transferencia bancaria directa, sin comisiones

**Cómo pagar:**
1. Abre tu app bancaria
2. Selecciona Zelle
3. Envía a: hectordehoyos053@gmail.com
4. Monto exacto del pedido
5. Copia el ID de confirmación
6. Pégalo en el formulario

### 3. 💙 PayPal
- **Email**: hectordehoyos053@gmail.com
- **Nombre**: Hector De Hoyos
- **Ventajas**: Aceptado mundialmente, protección al comprador

**Cómo pagar:**
1. Ve a paypal.com o abre la app
2. Envía dinero a: hectordehoyos053@gmail.com
3. Selecciona "Amigos y familiares" (sin comisión)
4. Monto exacto del pedido
5. Copia el ID de transacción
6. Pégalo en el formulario

### 4. 🟢 Chime
- **Usuario**: $lilhector210
- **Nombre**: Hector De Hoyos
- **Ventajas**: Rápido, sin comisiones

**Cómo pagar:**
1. Abre Chime app
2. Selecciona "Pay Friends"
3. Busca: $lilhector210
4. Envía el monto exacto
5. Copia el ID de confirmación
6. Pégalo en el formulario

### 5. 💳 Tarjeta de Crédito/Débito (Stripe)
- **Procesador**: Stripe
- **Comisión**: 2.9% + $0.30 USD
- **Ventajas**: Acepta todas las tarjetas, seguro

**Cómo pagar:**
1. Selecciona "Tarjeta de Crédito/Débito"
2. Ingresa los datos de tu tarjeta
3. Click en "Completar Pago"
4. Confirmación instantánea

## 🔄 Flujo de Pago Completo

### Paso 1: Seleccionar Servicios
1. Navega por los servicios
2. Click en "Agregar al carrito"
3. Revisa tu pedido en el carrito

### Paso 2: Completar Formulario
1. Nombre completo
2. Email
3. WhatsApp/Teléfono
4. Empresa (opcional)
5. Fecha de entrega deseada
6. Brief del proyecto (descripción detallada)

### Paso 3: Vista Previa
1. Click en "Vista Previa del Proyecto"
2. Revisa todos los detalles
3. Verifica servicios y precios
4. Click en "Proceder al Pago"

### Paso 4: Seleccionar Método de Pago
1. Elige tu método preferido
2. Sigue las instrucciones específicas
3. Realiza el pago
4. Ingresa ID de confirmación

### Paso 5: Confirmación
1. Click en "Completar Pago"
2. Redirige a WhatsApp con resumen
3. Recibirás confirmación en 24 horas

## 💰 Información de Precios

### Servicios Base

| Servicio | Básico | Profesional | Premium |
|----------|--------|-------------|---------|
| Marketing Digital | $199/mes | $399/mes | $699/mes |
| Creación de Contenido | $149 | $299 | $549 |
| Edición de Video | $79 | $179 | $349 |
| Logotipo e Identidad | $99 | $249 | $499 |
| Página Web | $399 | $899 | $1,899 |
| Pack Emprendedor | $449 | - | - |

### Extras Opcionales

- **Entrega urgente**: +15% del total
- **Idioma adicional**: +$50 USD
- **Revisiones extra**: +$30 USD

## 🔒 Seguridad

### Protección de Datos
- ✅ Conexión HTTPS segura
- ✅ No guardamos datos de tarjetas
- ✅ Stripe PCI compliant
- ✅ Firebase encriptado

### Privacidad
- ✅ No compartimos tu información
- ✅ Datos solo para procesar pedidos
- ✅ Cumplimos con GDPR

## 📊 Seguimiento de Pedidos

### Guardado Automático
Todos los pedidos se guardan en:
1. **Firebase Firestore** (nube)
2. **LocalStorage** (backup local)

### Estados de Pedido
- **Pending**: Esperando confirmación de pago
- **Paid**: Pago confirmado
- **In Progress**: En desarrollo
- **Completed**: Entregado
- **Cancelled**: Cancelado

## 🎯 Recomendaciones

### Para Pagos Rápidos
1. **Cash App** - Escanea QR y listo
2. **Zelle** - Si tienes cuenta bancaria US
3. **Chime** - Instantáneo

### Para Pagos Internacionales
1. **PayPal** - Aceptado mundialmente
2. **Stripe** - Tarjetas internacionales

### Para Protección
1. **Stripe** - Protección del comprador
2. **PayPal** - Disputa de pagos

## 🔧 Configuración Técnica

### Para Desarrolladores

#### Actualizar Información de Pago

En `js/script.js` líneas 1138-1145:

```javascript
const PAYMENT_CONFIG = {
    cashApp: '$lilhector210',
    cashAppName: 'Hector De Hoyos',
    zelle: 'hectordehoyos053@gmail.com',
    zelleName: 'Hector De Hoyos',
    paypal: 'hectordehoyos053@gmail.com',
    paypalName: 'Hector De Hoyos',
    chime: '$lilhector210',
    chimeName: 'Hector De Hoyos'
};
```

#### Cambiar Imagen QR de Cash App

1. Guarda tu QR en `img/cashapp-qr.jpg`
2. Actualiza en `index.html` línea 478:

```html
<img src="img/cashapp-qr.jpg" alt="Cash App QR Code">
```

#### Configurar Stripe

Ver: `docs/CONFIGURAR-STRIPE.md`

## 📞 Soporte de Pagos

### Problemas con Pagos

**Email**: hectordehoyos053@gmail.com
**WhatsApp**: (210) 990-0532

### Horario de Atención
- Lunes a Viernes: 9am - 6pm CST
- Sábados: 10am - 2pm CST
- Respuesta en menos de 24 horas

## ❓ Preguntas Frecuentes

### ¿Cuándo se procesa mi pedido?
Después de confirmar el pago (máximo 24 horas).

### ¿Puedo pagar en cuotas?
Contacta por WhatsApp para planes de pago.

### ¿Aceptan otras monedas?
Solo USD. Puedes usar PayPal para conversión automática.

### ¿Hay reembolsos?
Sí, dentro de las primeras 48 horas si no hemos iniciado el trabajo.

### ¿Necesito cuenta en todos los métodos?
No, elige solo uno que prefieras.

### ¿Es seguro pagar online?
Sí, usamos encriptación y servicios certificados.

## 📈 Estadísticas

- ✅ 98% de pagos procesados exitosamente
- ✅ Tiempo promedio de confirmación: 2 horas
- ✅ 100% de pedidos entregados a tiempo
- ✅ 0 fraudes reportados

## 🎁 Promociones

### Descuentos Disponibles
- **Primer pedido**: 10% OFF
- **Referidos**: $50 USD de crédito
- **Paquetes**: Ahorra hasta 30%

### Cómo Aplicar
Menciona el código de descuento en el brief del proyecto.

---

## 📝 Notas Importantes

1. **Precios en USD**: Todos los precios son en dólares estadounidenses
2. **Pago anticipado**: Se requiere 50% antes de iniciar
3. **Saldo final**: 50% antes de la entrega
4. **Cambios**: Incluidos según el paquete contratado
5. **Entrega**: Según fecha acordada en el formulario

---

**¿Listo para contratar?** 
[Ir al Cotizador](#cotizador) | [Ver Servicios](#services)

---

**Desarrollado con ❤️ por innovationTECH**

© 2026 innovationTECH. Todos los derechos reservados.