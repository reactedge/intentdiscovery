import { IntentEngine } from "./intent/IntentEngine.ts";

const engine = new IntentEngine()

// export function createIntentBridge() {
//     const engine = new IntentEngine()

//     return {
//         emit: (signal: any) => engine.handle(signal),
//         getState: () => engine.getState()
//     }
// }

export function emitIntent(signal: any) {
    engine.handle(signal)
}

export function getIntentState() {
    return engine.getState()
}

export function getIntentEngine() {
    return engine
}