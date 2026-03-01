"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSuggestions = buildSuggestions;
const mockClient_1 = require("../graphql/mockClient");
async function buildSuggestions(strategy) {
    if (strategy === "do_nothing")
        return [];
    const products = await (0, mockClient_1.fetchMockedProducts)(strategy);
    return products.map((p, index) => ({
        id: p.sku,
        label: p.name,
        type: "product",
        confidence: Math.max(0.9 - index * 0.1, 0.5),
    }));
}
//# sourceMappingURL=buildSuggestions.js.map