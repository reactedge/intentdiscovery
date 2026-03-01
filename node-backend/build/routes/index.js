"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intentRouter_1 = require("./intentRouter");
const openaiRouter_1 = require("./openaiRouter");
exports.default = (app) => {
    (0, intentRouter_1.setupIntentRoutes)(app);
    (0, openaiRouter_1.setupOpenAIRoutes)(app);
};
//# sourceMappingURL=index.js.map