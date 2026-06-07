# 🚀 Guía de Despliegue - innovationTECH

## 📋 Opciones de Despliegue

### Opción 1: GitHub Pages (RECOMENDADO - GRATIS) ⭐

#### Ventajas:
- ✅ 100% Gratis
- ✅ HTTPS automático
- ✅ Dominio personalizado gratis
- ✅ Actualizaciones automáticas con Git
- ✅ CDN global de GitHub

#### Pasos para Desplegar:

1. **Crear Repositorio en GitHub**
   ```bash
   # En tu terminal (Git Bash o PowerShell)
   cd c:/Users/j/Desktop/innovationTECH
   git init
   git add .
   git commit -m "Initial commit - innovationTECH website"
   ```

2. **Subir a GitHub**
   - Ve a https://github.com/new
   - Crea un repositorio llamado `innovationtech-website`
   - NO inicialices con README
   - Copia los comandos que te da GitHub:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/innovationtech-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Activar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Click en "Settings" (Configuración)
   - En el menú lateral, click en "Pages"
   - En "Source", selecciona "main" branch
   - Click en "Save"
   - ¡Listo! Tu sitio estará en: `https://TU_USUARIO.github.io/innovationtech-website/`

4. **Dominio Personalizado (Opcional)**
   - Compra un dominio (ej: innovationtech.com en Namecheap, GoDaddy)
   - En GitHub Pages settings, agrega tu dominio personalizado
   - En tu proveedor de dominio, configura DNS:
     ```
     Type: CNAME
     Name: www
     Value: TU_USUARIO.github.io
     
     Type: A
     Name: @
     Values: 
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
     ```

---

### Opción 2: Netlify (FÁCIL Y GRATIS) 🎯

#### Ventajas:
- ✅ Gratis hasta 100GB/mes
- ✅ Deploy automático desde GitHub
- ✅ HTTPS automático
- ✅ Formularios integrados
- ✅ Funciones serverless

#### Pasos:

1. **Sube tu código a GitHub** (igual que Opción 1, pasos 1-2)

2. **Conecta con Netlify**
   - Ve a https://netlify.com
   - Click en "Sign up" con GitHub
   - Click en "New site from Git"
   - Selecciona tu repositorio
   - Build settings:
     - Build command: (dejar vacío)
     - Publish directory: `/`
   - Click en "Deploy site"

3. **Configurar Dominio**
   - En Netlify dashboard, click en "Domain settings"
   - Puedes usar el dominio gratis: `tu-sitio.netlify.app`
   - O agregar dominio personalizado

---

### Opción 3: Vercel (RÁPIDO Y MODERNO) ⚡

#### Ventajas:
- ✅ Gratis para proyectos personales
- ✅ Deploy instantáneo
- ✅ Preview automático de cambios
- ✅ Analytics incluido

#### Pasos:

1. **Sube a GitHub** (pasos 1-2 de Opción 1)

2. **Deploy en Vercel**
   - Ve a https://vercel.com
   - Click en "Sign up" con GitHub
   - Click en "New Project"
   - Importa tu repositorio
   - Click en "Deploy"
   - ¡Listo! URL: `tu-proyecto.vercel.app`

---

### Opción 4: Hosting Tradicional (Hostinger, Bluehost, etc.) 💼

#### Para usar con cPanel:

1. **Comprimir archivos**
   - Selecciona todos los archivos del proyecto
   - Click derecho → "Comprimir" → ZIP
   - Nombra: `innovationtech.zip`

2. **Subir a cPanel**
   - Accede a tu cPanel
   - Ve a "File Manager"
   - Navega a `public_html`
   - Click en "Upload"
   - Sube `innovationtech.zip`
   - Click derecho en el ZIP → "Extract"
   - Elimina el ZIP

3. **Configurar**
   - Tu sitio estará en: `https://tudominio.com`

---

## 🔧 Configuración Post-Despliegue

### 1. Actualizar URLs en el Código

Si usas dominio personalizado, actualiza en `index.html`:

```html
<!-- Línea 16 -->
<meta property="og:url" content="https://TU-DOMINIO.com/">

<!-- Línea 23 -->
<meta property="twitter:url" content="https://TU-DOMINIO.com/">
```

### 2. Configurar Firebase (Si usas autenticación)

1. Ve a https://console.firebase.google.com
2. Selecciona tu proyecto
3. Ve a "Authentication" → "Settings" → "Authorized domains"
4. Agrega tu dominio de producción

### 3. Configurar Stripe (Si aceptas tarjetas)

1. Ve a https://dashboard.stripe.com
2. Obtén tu clave pública de producción
3. Actualiza en `script.js` línea 1137:
```javascript
const STRIPE_PUBLIC_KEY = 'pk_live_TU_CLAVE_REAL';
```

---

## 📊 Monitoreo y Analytics

### Google Analytics (Recomendado)

1. Crea cuenta en https://analytics.google.com
2. Obtén tu ID de medición (G-XXXXXXXXXX)
3. Agrega antes de `</head>` en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔒 Seguridad

### Headers de Seguridad (Para Netlify/Vercel)

Crea archivo `netlify.toml` o `vercel.json`:

**netlify.toml:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**vercel.json:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 🚀 Actualizaciones Futuras

### Con GitHub Pages/Netlify/Vercel:

```bash
# Hacer cambios en tu código
git add .
git commit -m "Descripción de cambios"
git push origin main
# ¡Se despliega automáticamente!
```

### Con Hosting Tradicional:
- Sube archivos modificados vía FTP o cPanel File Manager

---

## ✅ Checklist Pre-Lanzamiento

- [ ] Probar en Chrome, Firefox, Safari
- [ ] Probar en móvil (iOS y Android)
- [ ] Verificar que todos los enlaces funcionen
- [ ] Probar formulario de contacto
- [ ] Probar sistema de pagos (modo test)
- [ ] Verificar que las imágenes carguen
- [ ] Revisar SEO (meta tags)
- [ ] Configurar Google Analytics
- [ ] Configurar Firebase (si usas auth)
- [ ] Actualizar Stripe a modo producción
- [ ] Hacer backup del código

---

## 🎯 Recomendación Final

**Para tu caso, recomiendo GitHub Pages porque:**

1. ✅ Es 100% gratis
2. ✅ No requiere tarjeta de crédito
3. ✅ Actualizaciones automáticas con Git
4. ✅ HTTPS incluido
5. ✅ Puedes usar dominio personalizado gratis
6. ✅ CDN global (sitio rápido en todo el mundo)

**Pasos rápidos:**
```bash
# 1. Inicializar Git
git init
git add .
git commit -m "Initial commit"

# 2. Crear repo en GitHub y subir
git remote add origin https://github.com/TU_USUARIO/innovationtech.git
git push -u origin main

# 3. Activar GitHub Pages en Settings → Pages
# ¡Listo! Tu sitio estará en línea en 1-2 minutos
```

---

## 📞 Soporte

Si tienes problemas con el despliegue:
- GitHub Pages: https://docs.github.com/pages
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs

**¡Tu sitio está listo para el mundo! 🌍**