import {useEvaluateMessageIntent} from "../../hooks/domain/useEvaluateMessageIntent.tsx";
import type {MagentoProducts} from "../../hooks/infra/useProductAttributeLayer.tsx";
import {Spinner} from "../global/Spinner.tsx";
import {ErrorState} from "../global/ErrorState.tsx";
import type {IntentDiscoveryDataConfig} from "../../domain/intent-discovery.types.ts";
import {useTranslationState} from "../../state/Translation/useTranslationState.ts";
import type {IntentControllerState} from "../../domain/intent.types.ts";

type Props = {
    config: IntentDiscoveryDataConfig,
    intent: IntentControllerState,
    attributeLayerData: MagentoProducts
};
export const IntentMessage = ({config, intent, attributeLayerData}: Props) => {
    const { evaluationLoading, evaluationError } = useEvaluateMessageIntent(
        config,
        intent,
        attributeLayerData?.aggregations
    )
    const {t} = useTranslationState()

    if (evaluationLoading) return <Spinner />
    if (evaluationError) return <ErrorState error={evaluationError} />

    return (
        <div className="finder">
            <h2 className="finder__title">{t("May I ask why you came here to shop?")}</h2>
            <div className="intent-input-wrapper">
                <input
                    type="text"
                    placeholder={t("Tell us what matters most for your purchase")}
                    value={intent.text}
                    onChange={(e) => intent.setIntent(e.target.value)}
                    className="intent-input"
                />
                <div className={`intent-ai-threshold ${intent.remainingChars === 0 ? "ready" : ""}`}>
                    {intent.remainingChars > 0
                        ? `AI activates in ${intent.remainingChars} more characters`
                        : "AI ready — interpreting request"}
                </div>
            </div>
        </div>
    )
}