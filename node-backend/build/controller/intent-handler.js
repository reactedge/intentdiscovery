"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentHandler = void 0;
const error_handler_1 = require("../error-handler");
const context_intent_handler_1 = require("../model/context-intent-handler");
class IntentHandler {
    errorWrapper = new error_handler_1.ErrorWrapper();
    buildContextSuggestion = async (req, res) => {
        try {
            const context = req.body;
            const IntentHandler = new context_intent_handler_1.ContextIntentHandler();
            const suggestions = await IntentHandler.getIntentSuggestions(context);
            res.json(suggestions);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    };
}
exports.IntentHandler = IntentHandler;
//# sourceMappingURL=intent-handler.js.map