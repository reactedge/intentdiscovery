"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextIntentHandler = void 0;
const classify_1 = require("./context-intent-handler/classify");
const strategy_1 = require("./context-intent-handler/strategy");
const buildSuggestions_1 = require("../intent/buildSuggestions");
class ContextIntentHandler {
    getIntentSuggestions = async (context) => {
        const intentStage = (0, classify_1.classifyIntent)(context);
        const strategy = (0, strategy_1.chooseStrategy)(intentStage, context);
        const suggestions = await (0, buildSuggestions_1.buildSuggestions)(strategy);
        return {
            intentStage,
            strategy,
            suggestions,
        };
    };
}
exports.ContextIntentHandler = ContextIntentHandler;
//# sourceMappingURL=context-intent-handler.js.map