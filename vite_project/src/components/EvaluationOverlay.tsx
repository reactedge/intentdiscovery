import {Spinner} from "./global/Spinner.tsx";

export const EvaluationOverlay = () => {
    return (
        <div className="intent-evaluation-overlay">
            <Spinner />
            <p>Evaluating your preferences…</p>
        </div>
    )
}