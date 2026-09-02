const eslint = require("@eslint/js");
const globals = require("globals");

module.exports = [
    eslint.configs.recommended,

    {
        files: ["**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },

        rules: {
            "no-unused-vars": "warn",
            "no-console": "warn",
        },
    },

    {
        ignores: [
            "dist/",
            "node_modules/",
            "coverage/",
        ],
    },
];