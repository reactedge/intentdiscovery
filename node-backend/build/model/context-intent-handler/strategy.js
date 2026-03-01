"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseStrategy = chooseStrategy;
function chooseStrategy(intentStage, context) {
    switch (intentStage) {
        case "exploring":
            return "best_sellers";
        case "narrowing":
            return "refine_filters";
        case "comparing":
            return "alternative_products";
        case "ready":
            return "complementary_products";
        case "unknown":
        default:
            return "do_nothing";
    }
}
//# sourceMappingURL=strategy.js.map