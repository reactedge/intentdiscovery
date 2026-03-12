import {useCallback, useEffect, useState} from "react";
import {activity} from "../../activity";
import {useSystemState} from "../../state/System/useSystemState.ts";
import type {MagentoAggregation} from "./useProductAttributeLayer.tsx";
import {useDebounce} from "../useDebounce.tsx";
import {buildAiInterpretationPayload} from "../../lib/ai-recommendations.ts";
import {useOptionLabelMap} from "../domain/useOptionLabelMap.ts";
import type {IntentControllerState} from "../../domain/intent.types.ts";

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
) {

    const { intentState, setPreference, intentApiClient } = useSystemState()

    const [data, setData] = useState<AiInterpretationResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const optionLabelMap = useOptionLabelMap(attributeData);

    const debouncedIntent = useDebounce(intent.text, 600)

    const load = useCallback(async () => {
        if (!intent.canBeInterpreted || loading) return

        setLoading(true)
        setError(null)

        try {
            const payload = buildAiInterpretationPayload(
                intentState,
                attributeData,
                debouncedIntent,
                optionLabelMap
            )

            const json = await intentApiClient.interpret(payload)

            activity('ai-interpretation', 'AI interpretation API ran', json)

            setData(json)

            if (json?.filters) {
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

    }, [intentState, debouncedIntent, attributeData, optionLabelMap, intent.canBeInterpreted])

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