import {useOptionPreferenceState} from "../state/OptionPreference/useOptionPreferenceState.ts";
import {useEffect, useMemo} from "react";
import type {IntentDiscoveryDataConfig} from "../domain/intent-discovery.types.ts";
import {getNextPreferenceStep} from "../types/domain/magento/attribute.ts";
import {StepFinder} from "./FinderWidget/StepFinder.tsx";
import {StepPriceFinder} from "./FinderWidget/StepPriceFinder.tsx";
import {ResultMatch} from "./FinderWidget/ResultMatch.tsx";
import {FinderRow} from "./FinderRow.tsx";
import type {MagentoCategory} from "../types/infra/magento/category.types.ts";
import {activity} from "../activity";

export interface Props {
    config: IntentDiscoveryDataConfig
    categoryData: MagentoCategory
}

type StepConfig = {
    label: string;
    render: () => React.ReactNode;
};

type StepCode = 'climate' | 'material' | 'size' | 'price' | 'result';

export const IntentDiscovery = ({ config, categoryData }: Props) => {
    const { optionState, setActiveCategoryName } = useOptionPreferenceState();

    useEffect(() => {
        setActiveCategoryName(config.categoryUrlKey);
    }, [config.categoryUrlKey, setActiveCategoryName]);

    const stepMap = useMemo<Record<StepCode, StepConfig>>(() => ({
        style_general: {
            label: "Do you have a style of preference?",
            render: () => (
                <StepFinder optionCode="style_general" categoryData={categoryData} />
            )
        },
        climate: {
            label: "Do you know the type of weather you need this clothing for?",
            render: () => (
                <StepFinder optionCode="climate" categoryData={categoryData} />
            )
        },
        material: {
            label: "Let's decide on the material upfront, shall we?",
            render: () => (
                <StepFinder optionCode="material" categoryData={categoryData} />
            )
        },
        size: {
            label: "Let's decide on the size now?",
            render: () => (
                <StepFinder optionCode="size" categoryData={categoryData} />
            )
        },
        price: {
            label: "Let's narrow the price range?",
            render: () => <StepPriceFinder categoryData={categoryData} />
        },
        result: {
            label: "Here are your best matches",
            render: () => <ResultMatch categoryData={categoryData} />
        }
    }), [config.categoryUrlKey]);

    const stepCode = getNextPreferenceStep(config, optionState.activeOptionCode) as StepCode;
    const step = stepMap[stepCode];

    activity('Intent Discovery', 'Intent Discover Step', stepCode);

    return (
        <div className="finder">
            <h2 className="finder__title">
                Let's roll up our sleeves, put some sweat in this search
            </h2>

            <FinderRow>
                <p className="finder__label">{step.label}</p>
                {step.render()}
            </FinderRow>
        </div>
    );
};