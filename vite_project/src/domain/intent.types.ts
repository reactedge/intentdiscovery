export type IntentControllerState = {
    text: string
    setIntent: (text: string) => void
    shouldSearch: boolean
    canBeInterpreted: boolean
    remainingChars: number
}
