import { fetchMockedProducts } from "../graphql/mockClient";
import {Suggestion, SuggestionStrategy} from "../types/intent-context";

export async function buildSuggestions(
    strategy: SuggestionStrategy
): Promise<Suggestion[]> {
    if (strategy === "do_nothing") return [];

    const products = await fetchMockedProducts(strategy);

    return products.map((p, index) => ({
        id: p.sku,
        label: p.name,
        type: "product",
        confidence: Math.max(0.9 - index * 0.1, 0.5),
    }));
}
