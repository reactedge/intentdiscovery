"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialiseApp = void 0;
const index_js_1 = __importDefault(require("../../routes/index.js"));
const access_1 = __importDefault(require("../../access"));
const initialiseApp = async (app) => {
    (0, access_1.default)(app);
    (0, index_js_1.default)(app);
};
exports.initialiseApp = initialiseApp;
//# sourceMappingURL=index.js.map