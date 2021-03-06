const {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
} = require("@vendure/core");
const { defaultEmailHandlers, EmailPlugin } = require("@vendure/email-plugin");
const { AssetServerPlugin } = require("@vendure/asset-server-plugin");
const { AdminUiPlugin } = require("@vendure/admin-ui-plugin");
const path = require("path");
require('dotenv').config()

const config = {
    apiOptions: {
        port: 4000,
        adminApiPath: "admin-api",
        adminApiPlayground: {
            settings: {
                "request.credentials": "include",
            },
        }, // turn this off for production
        adminApiDebug: true, // turn this off for production
        shopApiPath: "shop-api",
        shopApiPlayground: {
            settings: {
                "request.credentials": "include",
            },
        }, // turn this off for production
        shopApiDebug: true, // turn this off for production
    },
    authOptions: {
        superadminCredentials: {
            identifier: "superadmin",
            password: "superadmin",
        },
        tokenMethod: 'cookie',
        cookieOptions: {
          secret: process.env.COOKIE_SESSION_SECRET
        },
        requireVerification: true,
    },
    dbConnectionOptions: {
        type: "mysql",
        synchronize: true, // turn this off for production
        logging: false,
        database: "ian_ecommerce",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        migrations: [path.join(__dirname, "../migrations/*.ts")],
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: "assets",
            assetUploadDir: path.join(__dirname, "../static/assets"),
        }),
        DefaultJobQueuePlugin,
        DefaultSearchPlugin,
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, "../static/email/test-emails"),
            route: "mailbox",
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, "../static/email/templates"),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: "http://localhost:3000/users/verify",
                passwordResetUrl: "http://localhost:3000/users/password-reset",
                changeEmailAddressUrl:
                    "http://localhost:3000/users/verify-email-address-change",
            },
        }),
        AdminUiPlugin.init({
            route: "admin",
            port: 3002,
        }),
    ],
};

module.exports = { config };
