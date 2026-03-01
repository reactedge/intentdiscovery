"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenaiAgent = void 0;
const openai_1 = require("openai");
const config_1 = require("../../config");
const openai = new openai_1.OpenAI({ apiKey: config_1.config.openai.apiKey });
class OpenaiAgent {
    createPrompt = (pageUrl, pageContent, fields, include) => {
        const safeContent = pageContent.replace(/<[^>]*>/g, '').slice(0, 5000);
        return `You are an expert SEO assistant. A web page was fetched from the following URL: ${pageUrl}
                
                Below is its HTML content:
                ---
                ${safeContent} <!-- Truncate to avoid token overflow -->
                ---
                
                Existing metadata:
                - Title: "${fields.title}"
                - Keywords: "${fields.keywords}"
                - Description: "${fields.description}"
                
                Instructions:
                Please suggest improved ${[
            include.title ? 'title' : '',
            include.keywords ? 'keywords' : '',
            include.description ? 'description' : '',
        ]
            .filter(Boolean)
            .join(', ')} based on the page content and existing metadata.
                
                Respond in strict JSON:
                {
                  "title": "Improved title",
                  "keywords": ["list", "of", "keywords"],
                  "description": "Improved description"
                }`;
    };
    getAugmentedPageData = async (prompt, include) => {
        /*try {
            const completion = await openai.chat.completions.create({
                model: config.openai.model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
            });

            if (completion === undefined) {
                throw new Error('The AI model setting is invalid')
            }

            const raw = completion?.choices[0].message.content || '{}';
            const suggestions = this.extractSuggestion(raw);

            if (!suggestions) {
                return ''; // Or better: return null or throw
            }

            // Step 4: Filter by include flags
            const result = {
                ...(include.title && { title: suggestions.title }),
                ...(include.keywords && { keywords: suggestions.keywords.join(',') }),
                ...(include.description && { description: suggestions.description }),
            };

            return result;
        } catch (err) {
            console.error('OpenAI error:', err);
            return ''
        }*/
    };
    extractSuggestion(raw) {
        try {
            // Remove markdown code block fences if present
            const cleaned = raw
                .replace(/^```json\s*/i, '')
                .replace(/^```/, '')
                .replace(/```$/, '')
                .trim();
            return JSON.parse(cleaned);
        }
        catch (err) {
            console.error('Failed to parse OpenAI response:', raw);
            return null;
        }
    }
}
exports.OpenaiAgent = OpenaiAgent;
//# sourceMappingURL=ai-agent.js.map