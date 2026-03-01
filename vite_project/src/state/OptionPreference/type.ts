export interface OptionSelection {
    code: string
    attributeLabel: string
    value: string
    label: string
}

export interface OptionPreferenceInfoState {
    activeCategoryName: string
    optionSelection: OptionSelection[],
    activeOptionCode: string
}

export interface OptionPreferenceState {
    optionState: OptionPreferenceInfoState
    setActiveOptionCode: (code: string) => void
    setOptionSelection: (code: string, attributeLabel: string, value: string, label: string) => void
    setActiveCategoryName: (name: string) => void
}