"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStaticFileAccess = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../config");
const setupStaticFileAccess = (app) => {
    app.use(`/${config_1.config.export.csvFolder}`, express_1.default.static(config_1.config.rootDir + config_1.config.export.csvFolder));
};
exports.setupStaticFileAccess = setupStaticFileAccess;
//# sourceMappingURL=staticFile.js.map