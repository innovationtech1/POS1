const EXTRAS = {
    rush: { label: 'Entrega urgente', percent: 15 },
    lang: { label: 'Idioma adicional', fixed: 50 },
    revisions: { label: 'Revisiones extra', fixed: 30 }
};

const SERVICES = {
    marketing: {
        id: 'marketing',
        name: 'Marketing Digital',
        prices: { basic: 199, pro: 399, premium: 699 }
    },
    content: {
        id: 'content',
        name: 'Creación de Contenido',
        prices: { basic: 149, pro: 299, premium: 549 }
    },
    video: {
        id: 'video',
        name: 'Edición de Video',
        prices: { basic: 79, pro: 179, premium: 349 }
    },
    logo: {
        id: 'logo',
        name: 'Logotipo e Identidad',
        prices: { basic: 99, pro: 249, premium: 499 }
    },
    web: {
        id: 'web',
        name: 'Página Web',
        prices: { basic: 399, pro: 899, premium: 1899 }
    },
    bundle: {
        id: 'bundle',
        name: 'Pack Emprendedor',
        prices: { basic: 449, pro: null, premium: null }
    }
};

function calcLineTotal(basePrice, extras = {}, qty = 1) {
    let total = basePrice * qty;
    if (extras.rush) total *= 1 + EXTRAS.rush.percent / 100;
    if (extras.lang) total += EXTRAS.lang.fixed;
    if (extras.revisions) total += EXTRAS.revisions.fixed;
    return Math.round(total);
}

function calculateCartTotal(services = []) {
    if (!Array.isArray(services) || services.length === 0) {
        throw new Error('El pedido debe incluir al menos un servicio.');
    }

    return services.reduce((sum, item) => {
        const service = SERVICES[item.serviceId];
        if (!service) {
            throw new Error(`Servicio inválido: ${item.serviceId}`);
        }

        const tier = item.tier || 'basic';
        const basePrice = service.prices[tier];
        if (!basePrice) {
            throw new Error(`Plan inválido para ${service.name}: ${tier}`);
        }

        const qty = Math.max(1, Number.parseInt(item.quantity || item.qty || 1, 10));
        return sum + calcLineTotal(basePrice, item.extras || {}, qty);
    }, 0);
}

module.exports = {
    SERVICES,
    calculateCartTotal
};
