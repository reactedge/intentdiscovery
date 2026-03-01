"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const config_1 = require("../config");
const cors = require("cors");
// https://brianflove.com/posts/2017-03-22-express-cors-typescript/
const corsOptions = () => {
    const options = {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: [config_1.config.frontendUrl, config_1.config.siteConsumerUrl],
        preflightContinue: false,
    };
    return cors(options);
};
exports.corsOptions = corsOptions;
//# sourceMappingURL=cors-setup.js.map