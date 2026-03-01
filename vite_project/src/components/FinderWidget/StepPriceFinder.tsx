import {useOptionPreferenceState} from "../../state/OptionPreference/useOptionPreferenceState.ts";
import {useFindAttributeOptionsByCode} from "../../hooks/domain/useFindAttributeOptionsByCode.tsx";
import {formatRange} from "../../lib/price.ts";
import type {MagentoCategory} from "../../types/infra/magento/category.types.ts";
import {Spinner} from "../global/Spinner.tsx";
import {ErrorState} from "../global/ErrorState.tsx";

interface StepFinderProps {
    categoryData: MagentoCategory
}

export const StepPriceFinder = ({categoryData}: StepFinderProps) => {
    const option = 'price'
    const {setOptionSelection, setActiveOptionCode} = useOptionPreferenceState()
    const {attributeData, attributeLoading, attributeError} = useFindAttributeOptionsByCode(option, categoryData)



    const onChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        setActiveOptionCode('result')
        setOptionSelection(option, attributeData.label, input.id, input.id)
    };

    if (attributeLoading) return <Spinner />
    if (attributeError) return <ErrorState />

    return (
        <div className="step-finder">
            {attributeData?.options.map((option) => (
                <label
                    key={option.value}
                    className="choice-tile"
                >
                    <input
                        type="radio"
                        name="preference"
                        value={option.value}
                        onChange={() => onChange(option.value)}
                    />

                    <span className="choice-tile__label">
                            {formatRange(option.label)}
                        </span>
                </label>
            ))}
        </div>
    )
}
