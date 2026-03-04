import {useState} from "react";
import {useActiveAttributeState} from "../state/ActiveAttribute/useActiveAttributeState.ts";
import {useSelectedPreferences} from "./selectedPreferencesUtils";
import type {IntentDiscoveryDataConfig} from "../domain/intent-discovery.types.ts";
import {useSystemState} from "../state/System/useSystemState.ts";
import type {MagentoAggregation, MagentoProducts} from "../hooks/infra/useProductAttributeLayer.tsx";

type Props = {
    config: IntentDiscoveryDataConfig;
    attributeLayerData: MagentoProducts
    disabled: boolean
};

export const AttributeLayer = ({ config, attributeLayerData, disabled }: Props) => {
    const { setActiveAttributeCode } = useActiveAttributeState();
    const {intentState} = useSystemState()
    const { valueFor: prefValue } =
        useSelectedPreferences(attributeLayerData, intentState);

    const [showAll, setShowAll] = useState(false);

    const allAttributes = (attributeLayerData?.aggregations || []).filter(
        (attr: MagentoAggregation) => !config.attributeExcludedInLayer?.includes(attr.attribute_code)
    );
    const visibleAttributes = showAll ? allAttributes : allAttributes.slice(0, 3);

    const isAttributeSelected = (attributeCode: string): boolean => {
        // Check if attribute is in attributeScore
        if (intentState?.attributeScore && attributeCode in intentState.attributeScore) {
            return true;
        }

        // Check if this is the price attribute and priceAffinity has been set
        if (attributeCode === 'price' && intentState?.priceAffinity &&
            Object.keys(intentState.priceAffinity).length > 0) {
            return true;
        }

        return false;
    };

    return (
        <>
            <div className="finder">
                <h2 className="finder__title">Need help choosing?</h2>
                <div className={`step-finder ${disabled ? 'step-finder--disabled' : ''}`}>
                    {visibleAttributes.map((attr: MagentoAggregation) => (
                        <div
                            key={attr.attribute_code}
                            className="choice-tile"
                            onClick={() => setActiveAttributeCode(attr.attribute_code)}
                        >
                            <span
                                className={`choice-tile__label ${isAttributeSelected(attr.attribute_code) ? 'choice-tile__label--selected' : ''}`}
                            >
                                {attr.label}
                            </span>
                            {prefValue(attr.attribute_code) && (
                                <span className="choice-tile__info">
                                    {prefValue(attr.attribute_code)}
                                </span>
                            )}
                        </div>
                    ))}
                    {allAttributes.length > 4 && (
                        <button
                            className="choice-tile choice-tile--view-all"
                            onClick={() => setShowAll(prev => !prev)}
                        >
                            {showAll ? "Show less" : "View all"}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
