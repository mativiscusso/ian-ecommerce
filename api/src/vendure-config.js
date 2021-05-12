const {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
} = require("@vendure/core");
const { defaultEmailHandlers, EmailPlugin } = require("@vendure/email-plugin");
const { AssetServerPlugin } = require("@vendure/asset-server-plugin");
const { AdminUiPlugin } = require("@vendure/admin-ui-plugin");
const path = require("path");

const config = {
    apiOptions: {
        port: 3000,
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
    },
    dbConnectionOptions: {
        type: "mysql",
        synchronize: true, // turn this off for production
        logging: false,
        database: "vendure_example",
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
                verifyEmailAddressUrl: "http://localhost:8080/verify",
                passwordResetUrl: "http://localhost:8080/password-reset",
                changeEmailAddressUrl:
                    "http://localhost:8080/verify-email-address-change",
            },
        }),
        AdminUiPlugin.init({
            route: "admin",
            port: 3002,
        }),
    ],
};

module.exports = { config };
