import {useAiInterpreter} from "../infra/useAiInterpreter.tsx";
import type {MagentoAggregation} from "../infra/useProductAttributeLayer.tsx";
import type {IntentDiscoveryDataConfig} from "../../domain/intent-discovery.types.ts";
import {useIntentAttributes} from "./useIntentAttributes.tsx";
import type {IntentControllerState} from "../../domain/intent.types.ts";

export function useEvaluateMessageIntent(
    config: IntentDiscoveryDataConfig,
    intent: IntentControllerState,
    aggregations: MagentoAggregation[]
) {
    const attributes = useIntentAttributes(aggregations, config)

    const {
        data: aiFilters,
        loading: aiLoading,
        error: aiError,
    } = useAiInterpreter(attributes, intent, config);

    return {
        evaluationFilters: aiFilters,
        evaluationLoading: aiLoading,
        evaluationError: aiError,
    };
}