import { useEffect, useRef, useState } from "react";
import { createIntentEngine } from "../../integration/intent/IntentEngine";

export const useIntent = () => {
    const engineRef = useRef(createIntentEngine());
    const [intentState, setIntentState] = useState(
        engineRef.current.getState()
    );

    useEffect(() => {
        const handler = (event: any) => {
            const signal = event.detail;

            engineRef.current.handle(signal);
            setIntentState({ ...engineRef.current.getState() });
        };

        window.addEventListener("reactedge:intent", handler);

        return () => {
            window.removeEventListener("reactedge:intent", handler);
        };
    }, []);

    return intentState;
};