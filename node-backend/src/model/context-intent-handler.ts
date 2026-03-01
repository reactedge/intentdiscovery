import {ContextSnapshot, SuggestionResponse} from "../types/intent-context";
import {classifyIntent} from "./context-intent-handler/classify";
import {chooseStrategy} from "./context-intent-handler/strategy";
import {buildSuggestions} from "../intent/buildSuggestions";

export class ContextIntentHandler {
    getIntentSuggestions = async (context: ContextSnapshot): Promise<SuggestionResponse> => {
        const intentStage = classifyIntent(context);
        const strategy = chooseStrategy(intentStage, context);

        const suggestions = await buildSuggestions(strategy);

        return {
            intentStage,
            strategy,
            suggestions,
        };
    }
}