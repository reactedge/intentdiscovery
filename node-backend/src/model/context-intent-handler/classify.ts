import {ContextSnapshot, IntentStage} from "../../types/intent-context";

export function classifyIntent(context: ContextSnapshot): IntentStage {
    const { page, filters, signals } = context;

    // If we really don't know
    if (!page?.type) {
        return "unknown";
    }

    // PDP logic
    if (page.type === "pdp") {
        if (signals?.dwellTimeMs && signals.dwellTimeMs > 15000) {
            return "comparing";
        }

        return "ready";
    }

    // PLP logic
    if (page.type === "plp") {
        if (filters && Object.keys(filters).length > 0) {
            return "narrowing";
        }

        return "exploring";
    }

    // Home or anything else
    return "exploring";
}
