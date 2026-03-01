export type ContextSnapshot = {
    page: {
        type: "home" | "plp" | "pdp";
        category?: string;
        productSku?: string;
    };

    filters?: {
        [attribute: string]: string[];
    };

    signals: {
        dwellTimeMs?: number;
        interactionsCount?: number;
        stalled?: boolean;
    };

    locale: {
        language: string;
        country: string;
    };
};

export type IntentStage =
    | "exploring"
    | "narrowing"
    | "comparing"
    | "ready"
    | "unknown";

export type SuggestionStrategy =
    | "complementary_products"
    | "alternative_products"
    | "best_sellers"
    | "refine_filters"
    | "do_nothing";

export type Suggestion = {
    id: string;
    label: string;
    type: "product" | "category";
    confidence: number;
};

export type SuggestionResponse = {
    intentStage: IntentStage;
    strategy: SuggestionStrategy;

    suggestions: Array<Suggestion>;
};
