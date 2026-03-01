"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../config");
const initilisers_1 = require("./initilisers");
const error_handler_1 = require("../error-handler");
const startServer = async () => {
    const app = (0, express_1.default)();
    const port = config_1.config.port;
    const errorWrapper = new error_handler_1.ErrorWrapper();
    console.log('port', port);
    await (0, initilisers_1.initialiseApp)(app);
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (error) {
        errorWrapper.handle(error);
    }
};
exports.startServer = startServer;
//# sourceMappingURL=server.js.map