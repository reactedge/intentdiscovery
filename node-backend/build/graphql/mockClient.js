"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMockedProducts = fetchMockedProducts;
async function fetchMockedProducts(kind) {
    // Simulate latency
    await new Promise(r => setTimeout(r, 50));
    switch (kind) {
        case "best_sellers":
            return [
                { sku: "JKT-001", name: "Top Selling Jacket" },
                { sku: "JKT-002", name: "Popular Waterproof Jacket" },
            ];
        case "complementary_products":
            return [
                { sku: "TRS-010", name: "Matching Waterproof Trousers" },
                { sku: "GLV-003", name: "Thermal Gloves" },
            ];
        case "alternative_products":
            return [
                { sku: "JKT-900", name: "Alternative Lightweight Jacket" },
            ];
        default:
            return [];
    }
}
//# sourceMappingURL=mockClient.js.map