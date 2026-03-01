"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenaiHandler = void 0;
const page_fetcher_1 = require("./openai-handler/page-fetcher");
const ai_agent_1 = require("./openai-handler/ai-agent");
class OpenaiHandler {
    getAugmentedPageData = async ({ pageUrl, page, include }) => {
        const pageContent = await (0, page_fetcher_1.fetchPageContent)(pageUrl);
        const openaiAgent = new ai_agent_1.OpenaiAgent();
        const prompt = openaiAgent.createPrompt(pageUrl, pageContent, page, include);
        return await openaiAgent.getAugmentedPageData(prompt, include);
    };
}
exports.OpenaiHandler = OpenaiHandler;
//# sourceMappingURL=openai-handler.js.map