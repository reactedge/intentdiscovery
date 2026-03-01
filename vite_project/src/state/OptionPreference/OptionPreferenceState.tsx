import {createContext} from "react";
import type {OptionPreferenceInfoState, OptionPreferenceState} from "./type.ts";

export const readActiveOption = (): OptionPreferenceInfoState => {
    return {
        optionSelection: [],
        activeOptionCode: '',
        activeCategoryName: ''
    }
}

export const LocalOptionPreferenceStateContext = createContext<OptionPreferenceState | undefined>(undefined);