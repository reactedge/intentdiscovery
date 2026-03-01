import type {OptionSelection} from "../state/OptionPreference/type.ts";
import {formatRange} from "./price.ts";
import {unescapeHtml} from "./string.ts";

export const getOptionLabel = (option: OptionSelection) => {
    if (option.code === 'price') {
        return formatRange(option.label)
    }

    return unescapeHtml(option.label)
}

export const getOptionQuery = (optionSelection: OptionSelection[]) => {
    const getOptionSelectionQuery = (query: string, option: OptionSelection) => {
        const optionQuery = `${option.code}=${option.value}`
        if (query === '') {
            query += `?${optionQuery}`
        } else {
            query += `&${optionQuery}`
        }

        return query
    }

    return optionSelection.reduce(getOptionSelectionQuery, '')
}
