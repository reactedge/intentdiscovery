import {ContextSnapshot, IntentStage, SuggestionStrategy} from "../../types/intent-context";

export function chooseStrategy(
    intentStage: IntentStage,
    context: ContextSnapshot
): SuggestionStrategy {
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
