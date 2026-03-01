import {useOptionPreferenceState} from "../../state/OptionPreference/useOptionPreferenceState.ts";
import type {MagentoCategory} from "../../types/infra/magento/category.types.ts";
import {categoryLayereIds} from "../../lib/category.ts";
import {useMemo} from "react";

export function useOptionSelectionFilter(categoryData?: MagentoCategory) {
    const { optionState } = useOptionPreferenceState();

    return useMemo(() => {
        const filter: any = {
            category_id: {
                in: categoryLayereIds(categoryData)
            }
        };

        optionState.optionSelection.forEach(selection => {
            filter[selection.code] = { eq: selection.value };
        });

        return filter;
    }, [categoryData, optionState.optionSelection]);
}