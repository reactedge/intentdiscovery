import { useState} from "react";
import {useIntentDecision} from "./useIntentDecision.tsx";
import type {IntentDiscoveryDataConfig} from "../../domain/intent-discovery.types.ts";
import type {MagentoProducts} from "../infra/useProductAttributeLayer.tsx";
import type {IntentControllerState} from "../../domain/intent.types.ts";
import {activity} from "../../activity";
import {useActiveCategory} from "./useActiveCategory.tsx";

export const useIntentController = (
    attributeLayerData: MagentoProducts,
    config: IntentDiscoveryDataConfig
) => {
    useActiveCategory(attributeLayerData, config);

    const [intentText, setIntentText] = useState("");
    const { shouldSearch, remainingChars, canBeInterpreted } = useIntentDecision(attributeLayerData, config, intentText)

    const intent: IntentControllerState = {
        text: intentText,
        setIntent: setIntentText,
        shouldSearch,
        canBeInterpreted,
        remainingChars
    }

    activity('intent-status', 'Intent Status', intent)

    return { intent }
}