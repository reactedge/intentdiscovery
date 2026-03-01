import { ErrorWrapper } from "../error-handler";
import { Request, Response } from "express";
import {ContextIntentHandler} from "../model/context-intent-handler";

export class IntentHandler {
    errorWrapper = new ErrorWrapper()

    buildContextSuggestion = async (req: Request, res: Response): Promise<void> => {
        try {
            const context = req.body;

            const IntentHandler = new ContextIntentHandler()
            const suggestions = await IntentHandler.getIntentSuggestions(context);

            res.json(suggestions);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    }
}