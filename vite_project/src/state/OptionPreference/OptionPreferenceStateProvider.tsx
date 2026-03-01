import {type ReactNode, useCallback} from "react";
import {useImmer} from "use-immer";
import {LocalOptionPreferenceStateContext, readActiveOption} from "./OptionPreferenceState.tsx";
import type {OptionPreferenceInfoState} from "./type.ts";

interface OptionPreferenceStateProviderProps {
    children: ReactNode;
}

const LocalStateProvider = LocalOptionPreferenceStateContext.Provider;

export const OptionPreferenceStateProvider: React.FC<OptionPreferenceStateProviderProps> = ({ children}) => {
    const [state, setState] = useImmer<{ optionState: OptionPreferenceInfoState }>({
        optionState : readActiveOption()
    });

    const updateState = useCallback(
        <K extends keyof OptionPreferenceInfoState>(
            key: K,
            value: OptionPreferenceInfoState[K]
        ) => {
            setState(draft => {
                draft.optionState[key] = value;
            });
        },
        []
    );

    const setActiveOptionCode = (code: string) => {
        updateState('activeOptionCode', code);
    }

    const setOptionSelection = (
        code: string,
        attributeLabel: string,
        value: string,
        label: string
    ) => {
        setState(draft => {
            draft.optionState.optionSelection.push({
                code,
                attributeLabel,
                value,
                label
            });
        });
    };

    const setActiveCategoryName = (name: string) => {
        updateState('activeCategoryName', name);
    }

    return (
        <LocalStateProvider
            value={{
                setActiveOptionCode,
                setActiveCategoryName,
                setOptionSelection,
                optionState: state.optionState
            }}
        >
            {children}
        </LocalStateProvider>
    );
};
