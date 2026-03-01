"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupJsonBodyParse = void 0;
const express_1 = __importDefault(require("express"));
const setupJsonBodyParse = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({
        extended: true
    }));
};
exports.setupJsonBodyParse = setupJsonBodyParse;
//# sourceMappingURL=jsonParser.js.map