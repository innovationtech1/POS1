# Backend Express para innovationTECH POS

Este backend sirve la aplicación estática y expone endpoints seguros para pagos con Stripe.

## Requisitos

- Node.js 18 o superior
- npm
- Proyecto Firebase Auth activo
- Cuenta Stripe en modo test o producción

## Instalación local

```bash
npm install
cp .env.example .env
```

Edita `.env`:

```bash
PORT=3000
FIREBASE_PROJECT_ID=innovationtech-6e205
STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_PUBLICA
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_SECRETA
CORS_ORIGIN=http://localhost:3000,http://localhost:8080
```

## Ejecutar

```bash
npm run dev
```

Abre:

```text
http://localhost:3000
```

## Endpoints

### `GET /api/health`

Verifica que el backend está vivo.

```bash
curl http://localhost:3000/api/health
```

### `GET /api/config`

Devuelve configuración pública para el frontend, incluyendo la publishable key de Stripe.

### `POST /api/payments/create-intent`

Crea un Stripe PaymentIntent. Requiere header:

```text
Authorization: Bearer <firebase-id-token>
```

El backend valida:

- Firebase ID token con certificados públicos de Google.
- Que el carrito tenga servicios válidos.
- Que el total enviado coincida con el cálculo del backend.

## Producción

En producción configura variables de entorno en tu hosting:

- `PORT`
- `FIREBASE_PROJECT_ID`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `CORS_ORIGIN`

No subas `.env` a GitHub. Usa `.env.example` solo como plantilla.
