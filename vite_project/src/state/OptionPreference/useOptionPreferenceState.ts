import {useContext} from "react";
import {LocalOptionPreferenceStateContext} from "./OptionPreferenceState.tsx";
import type {OptionPreferenceState} from "./type.ts";

export function useOptionPreferenceState(): OptionPreferenceState {
    const context = useContext(LocalOptionPreferenceStateContext);
    if (!context) {
        throw new Error("useOptionPreferenceState must be used within OptionPreferenceStateProvider");
    }
    return context;
}