# 🚀 innovationTECH - Agencia de Marketing Digital

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](package.json)
[![Status](https://img.shields.io/badge/status-production-success.svg)](https://github.com)

> Sitio web profesional para agencia de marketing digital con sistema de pagos integrado, autenticación y diseño 100% responsive.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Despliegue](#-despliegue)
- [Tecnologías](#-tecnologías)
- [Documentación](#-documentación)

## ✨ Características

### 💳 Sistema de Pagos Completo
- **5 Métodos de Pago:**
  - Cash App (con código QR)
  - Zelle
  - PayPal
  - Chime
  - Stripe (tarjetas de crédito/débito)
- Validación de formularios
- Confirmación de pagos
- Integración con Firebase

### 🔐 Autenticación
- Login con Google
- Registro con Email/Password
- Cuenta obligatoria para contratar servicios y consultar pedidos
- Recuperación de contraseña
- Autenticación biométrica (WebAuthn)

### 📱 Diseño Responsive
- Mobile First
- Optimizado para tablets
- Desktop completo
- Imágenes adaptables
- Inputs optimizados para iOS

### 🎨 Interfaz Moderna
- Glassmorphism design
- Animaciones suaves
- Carrusel de servicios
- Cotizador interactivo
- Carrito de compras

## 📂 Estructura del Proyecto

```
innovationTECH/
├── 📄 index.html                 # Página principal
├── 📄 README.md                  # Este archivo
├── 📄 .gitignore                 # Archivos ignorados por Git
│
├── 📁 css/
│   └── style.css                 # Estilos principales
│
├── 📁 js/
│   ├── script.js                 # Lógica principal
│   ├── firebase-config.js        # Configuración de Firebase
│   └── biometric-auth.js         # Autenticación biométrica
│
├── 📁 server/
│   ├── index.js                  # Backend Express
│   ├── firebase-auth.js          # Validación de tokens Firebase
│   └── services.js               # Catálogo/precios para validar pagos
│
├── 📁 img/
│   ├── ba18bc24...jpg           # QR de Cash App
│   ├── agente.png               # Imagen de agente
│   ├── fondoinnovation.jpg      # Fondo
│   └── ...                      # Otras imágenes
│
├── 📁 assets/
│   ├── logo.png                 # Logo principal
│   ├── favicon.ico              # Favicon
│   └── ...                      # Iconos y recursos
│
└── 📁 docs/
    ├── CONFIGURAR-STRIPE.md     # Guía de Stripe
    ├── GUIA-DESPLIEGUE.md       # Guía de despliegue
    ├── INSTRUCCIONES-PAGOS.md   # Sistema de pagos
    ├── ACTIVAR-GITHUB-PAGES.md  # GitHub Pages
    └── CONFIGURAR-FIREBASE.md   # Firebase
```

## 🚀 Instalación

### Requisitos Previos
- Navegador web moderno
- Node.js 18 o superior
- npm
- Editor de código (VS Code recomendado)
- Git (opcional)

### Clonar el Repositorio

```bash
git clone https://github.com/TU_USUARIO/innovationtech.git
cd innovationtech
```

### Ejecutar con Backend Local

```bash
npm install
cp .env.example .env
npm run dev
```

Después abre:

```text
http://localhost:3000
```

El backend Express sirve la app estática y expone la API en `/api`.

### Abrir solo Frontend Estático

También puedes abrir `index.html` o usar Live Server, pero los pagos reales con tarjeta requieren el backend activo.

## ⚙️ Configuración

### 1. Firebase (Autenticación)

El proyecto ya está configurado con Firebase. Si quieres usar tu propia cuenta:

1. Crea proyecto en [Firebase Console](https://console.firebase.google.com)
2. Obtén las credenciales
3. Actualiza `js/firebase-config.js`

📖 **Guía completa:** `docs/CONFIGURAR-FIREBASE.md`

### 2. Stripe (Pagos con Tarjeta)

Para aceptar tarjetas de crédito/débito:

1. Crea cuenta en [Stripe](https://stripe.com)
2. Obtén tu clave pública y secreta
3. Configura `.env`:

```bash
STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_PUBLICA
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_SECRETA
```

📖 **Guía completa:** `docs/CONFIGURAR-STRIPE.md`

### 3. Información de Pagos

Actualiza tu información en `js/script.js` líneas 1138-1145:

```javascript
const PAYMENT_CONFIG = {
    cashApp: '$tu_usuario',
    zelle: 'tu@email.com',
    paypal: 'tu@email.com',
    chime: '$tu_usuario'
};
```

## 🌐 Despliegue

### Opción 1: GitHub Pages (Recomendado - Gratis)

```bash
# 1. Inicializar Git
git init
git add .
git commit -m "Initial commit"

# 2. Subir a GitHub
git remote add origin https://github.com/TU_USUARIO/innovationtech.git
git push -u origin main

# 3. Activar GitHub Pages
# Settings → Pages → Source: main → Save
```

Tu sitio estará en: `https://TU_USUARIO.github.io/innovationtech/`

### Opción 2: Netlify

1. Conecta tu repositorio de GitHub
2. Deploy automático
3. URL gratis: `tu-sitio.netlify.app`

### Opción 3: Vercel

1. Importa tu repositorio
2. Deploy instantáneo
3. URL gratis: `tu-proyecto.vercel.app`

📖 **Guía completa:** `docs/GUIA-DESPLIEGUE.md`

## 🛠️ Tecnologías

### Frontend
- HTML5
- CSS3 (Glassmorphism, Flexbox, Grid)
- JavaScript (ES6+)

### Servicios
- Firebase (Auth + Firestore)
- Stripe (Pagos)
- WebAuthn (Biometría)

### Backend
- Node.js + Express
- Stripe PaymentIntents
- Validación de Firebase ID Tokens con certificados públicos

### Herramientas
- Git
- VS Code
- GitHub Pages

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [CONFIGURAR-BACKEND.md](docs/CONFIGURAR-BACKEND.md) | Ejecutar backend Express y API de pagos |
| [CONFIGURAR-STRIPE.md](docs/CONFIGURAR-STRIPE.md) | Configuración completa de Stripe |
| [GUIA-DESPLIEGUE.md](docs/GUIA-DESPLIEGUE.md) | Cómo desplegar el sitio |
| [INSTRUCCIONES-PAGOS.md](docs/INSTRUCCIONES-PAGOS.md) | Sistema de pagos |
| [ACTIVAR-GITHUB-PAGES.md](docs/ACTIVAR-GITHUB-PAGES.md) | GitHub Pages |
| [CONFIGURAR-FIREBASE.md](docs/CONFIGURAR-FIREBASE.md) | Firebase |

## 💰 Información de Contacto

- **Cash App**: $lilhector210
- **Zelle**: hectordehoyos053@gmail.com
- **PayPal**: hectordehoyos053@gmail.com
- **Chime**: $lilhector210
- **WhatsApp**: (210) 990-0532
- **Email**: hectordehoyos053@gmail.com
- **Ubicación**: San Antonio, TX 78245

## 📊 Estado del Proyecto

- ✅ Sistema de pagos funcional
- ✅ Autenticación completa
- ✅ Diseño responsive
- ✅ Optimizado para producción
- ✅ Documentación completa

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👨‍💻 Autor

**Hector De Hoyos**
- Email: hectordehoyos053@gmail.com
- WhatsApp: (210) 990-0532
- Ubicación: San Antonio, TX

## 🙏 Agradecimientos

- Firebase por la infraestructura
- Stripe por el sistema de pagos
- Unsplash por las imágenes
- La comunidad de desarrolladores

---

**Desarrollado con ❤️ por innovationTECH**

© 2026 innovationTECH. Todos los derechos reservados.