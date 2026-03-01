import {setupIntentRoutes} from "./intentRouter"
import {Application} from "express";
import {setupOpenAIRoutes} from "./openaiRouter";

export default (app: Application) => {
    setupIntentRoutes(app)
    setupOpenAIRoutes(app)
}