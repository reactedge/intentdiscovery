"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIHandler = void 0;
const error_handler_1 = require("../error-handler");
const openai_handler_1 = require("../model/openai-handler");
const url_1 = require("../lib/url");
class OpenAIHandler {
    errorWrapper = new error_handler_1.ErrorWrapper();
    getAugmentedMetadata = async (req, res) => {
        try {
            const pageUrl = (0, url_1.normalizeUrl)(req.body.pageUrl);
            const page = req.body.page;
            const include = req.body.include;
            const openAIHandler = new openai_handler_1.OpenaiHandler();
            const augmentedData = await openAIHandler.getAugmentedPageData({ pageUrl, page, include });
            res.json(augmentedData);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    };
}
exports.OpenAIHandler = OpenAIHandler;
//# sourceMappingURL=openai-handler.js.map