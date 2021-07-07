const {
    dummyPaymentHandler,
    PaymentMethodHandler,
    CreatePaymentResult,
    SettlePaymentResult,
    SettlePaymentErrorResult,
    LanguageCode,
} = require("@vendure/core");

const mercadopago = require("mercadopago");

function mapProductsOfCart(cart) {
    const products = [];
    cart.forEach((item) =>
        products.push({
            id: item.id,
            quantity: Number(item.quantity),
            title: item.productVariant.name,
            unit_price: item.unitPriceWithTax,
        })
    );

    return products;
}

export const mercadoPagoIntegration = new PaymentMethodHandler({
    code: "mercado-pago-handler",
    description: [
        {
            languageCode: LanguageCode.es,
            value: "Mercado Pago",
        },
    ],
    args: {
        apiKey: { type: "string" },
    },

    /** This is called when the `addPaymentToOrder` mutation is executed */
    createPayment: async (ctx, order, amount, args, metadata) => {
        try {
            mercadopago.configure({
                access_token: process.env.ACCESS_TOKEN,
            });

            const preference = {
                items: mapProductsOfCart(order.lines),
                back_urls: {
                    success: process.env.BACK_URL_MERCADO_PAGO + "/success",
                    failure: process.env.BACK_URL_MERCADO_PAGO + "/failure",
                    pending: process.env.BACK_URL_MERCADO_PAGO + "/pending",
                },
                auto_return: "approved",
            };

            const resultGeneratePreference =
                await mercadopago.preferences.create(preference);

            return {
                amount: order.total,
                state: "Settled",
                transactionId: resultGeneratePreference.body.id.toString(),
                metadata: {
                    public: {
                        referenceCode: resultGeneratePreference.body,
                    },
                },
            };
        } catch (err) {
            return {
                amount: order.total,
                state: "Declined",
                metadata: {
                    errorMessage: err.message,
                },
            };
        }
    },

    /** This is called when the `settlePayment` mutation is executed */
    settlePayment: async (ctx, order, payment, args) => {
        try {
            return { success: true };
        } catch (err) {
            return {
                success: false,
                errorMessage: err.message,
            };
        }
    },
});
