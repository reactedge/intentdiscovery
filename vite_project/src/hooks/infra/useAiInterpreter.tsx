import {useCallback, useEffect, useState} from "react";
import {activity} from "../../activity";
import {useSystemState} from "../../state/System/useSystemState.ts";
import type {MagentoAggregation} from "./useProductAttributeLayer.tsx";
import {buildAiInterpretationPayload} from "../../lib/ai-recommendations.ts";
import {useOptionLabelMap} from "../domain/useOptionLabelMap.ts";
import type {IntentControllerState} from "../../domain/intent.types.ts";
import type {IntentDiscoveryDataConfig} from "../../domain/intent-discovery.types.ts";

export type AiInterpretationRequest = {
    intent: {
        text: string
        signals: Record<string, Record<string, number>>
    }
    attributes: {
        code: string
        label: string
        options: {
            label: string
            value: string
            count: number
        }[]
    }[]
}

export type AiInterpretationResponse = {
    filters: Record<string, string>
}

export function useAiInterpreter(
    attributeData: MagentoAggregation[],
    intent: IntentControllerState,
    config: IntentDiscoveryDataConfig
) {

    const { intentState, setIntentText, setPreference, intentApiClient } = useSystemState()

    const [data, setData] = useState<AiInterpretationResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const optionLabelMap = useOptionLabelMap(attributeData);

    const load = useCallback(async () => {
        if (intentState.status === 'idle' || loading) return

        setLoading(true)
        setError(null)

        try {
            const payload = buildAiInterpretationPayload(
                intentState,
                attributeData,
                intent.text,
                optionLabelMap,
                config
            )

            const json = await intentApiClient.interpret(payload)
            //const json = await intentApiClient.dummy(payload)

            activity('ai-interpretation', 'AI interpretation API ran', json)

            setData(json)

            if (json?.filters) {
                setIntentText(intent.text)

                for (const [attribute, value] of Object.entries(json?.filters)) {
                    setPreference(attribute, value)
                }
            }

        } catch (err: unknown) {

            activity('ai-interpretation', 'AI Interpretation Error', {
                error: (err as Error).message
            }, 'error')

            setError(err instanceof Error ? err : new Error("Unknown error"))

        } finally {
            setLoading(false)
        }

    }, [intent.text, attributeData, optionLabelMap, intentState.status])

    useEffect(() => {
        activity('ai-interpretation', 'Triggering interpretation')
        load()
    }, [load])

    return {
        data,
        loading,
        error,
        refetch: load,
    }
}