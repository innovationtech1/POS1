require('dotenv').config();

const path = require('node:path');
const cors = require('cors');
const express = require('express');
const Stripe = require('stripe');
const { calculateCartTotal } = require('./services');
const { getBearerToken, verifyFirebaseIdToken } = require('./firebase-auth');

const app = express();
const port = Number(process.env.PORT || 3000);
const appRoot = path.resolve(__dirname, '..');
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID || 'innovationtech-6e205';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51DEMO_REPLACE_WITH_YOUR_KEY';
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

const allowedOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

app.use(express.json({ limit: '1mb' }));

app.use('/api', cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error('Origen no permitido por CORS.'));
    }
}));

async function requireAuth(req, res, next) {
    try {
        const token = getBearerToken(req);
        req.user = await verifyFirebaseIdToken(token, firebaseProjectId);
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: error.message
        });
    }
}

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        service: 'innovationTECH backend',
        stripeConfigured: Boolean(stripe),
        firebaseProjectId,
        timestamp: new Date().toISOString()
    });
});

app.get('/api/config', (req, res) => {
    res.json({
        success: true,
        stripePublishableKey,
        stripeConfigured: Boolean(stripe),
        firebaseProjectId
    });
});

app.post('/api/payments/create-intent', requireAuth, async (req, res) => {
    try {
        if (!stripe) {
            res.status(503).json({
                success: false,
                error: 'STRIPE_SECRET_KEY no está configurada en el backend.'
            });
            return;
        }

        const quotation = req.body.quotation || {};
        const services = quotation.services || req.body.services;
        const total = calculateCartTotal(services);
        const requestedTotal = Number(quotation.total || req.body.total || total);

        if (requestedTotal !== total) {
            res.status(400).json({
                success: false,
                error: 'El total enviado no coincide con el cálculo del backend.',
                expectedTotal: total
            });
            return;
        }

        const amount = Math.round(total * 100);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: (req.body.currency || 'usd').toLowerCase(),
            automatic_payment_methods: { enabled: true },
            receipt_email: req.user.email || quotation.customerEmail || undefined,
            description: `innovationTECH - ${services.length} servicio(s)`,
            metadata: {
                uid: req.user.uid,
                customerEmail: req.user.email || quotation.customerEmail || '',
                customerName: quotation.customerName || req.user.name || '',
                servicesCount: String(services.length),
                source: 'online-pos'
            }
        });

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount,
            total
        });
    } catch (error) {
        console.error('Error creando PaymentIntent:', error);
        res.status(400).json({
            success: false,
            error: error.message || 'No se pudo crear el pago.'
        });
    }
});

app.use('/css', express.static(path.join(appRoot, 'css')));
app.use('/js', express.static(path.join(appRoot, 'js')));
app.use('/assets', express.static(path.join(appRoot, 'assets')));
app.use('/img', express.static(path.join(appRoot, 'img')));

app.get(['/', '/index.html'], (req, res) => {
    res.sendFile(path.join(appRoot, 'index.html'));
});

app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        res.sendFile(path.join(appRoot, 'index.html'));
        return;
    }
    next();
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Ruta no encontrada.'
    });
});

app.listen(port, () => {
    console.log(`innovationTECH backend escuchando en http://localhost:${port}`);
});
