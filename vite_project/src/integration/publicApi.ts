import { emitIntent, getIntentState } from "./intentBridge"

declare global {
    interface Window {
        ReactEdgeIntent?: any
    }
}

window.ReactEdgeIntent = {
    emit: emitIntent,
    getState: getIntentState
}