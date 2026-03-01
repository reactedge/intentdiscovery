"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupOpenAIRoutes = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../config");
const cors_setup_1 = require("../lib/cors-setup");
const openai_handler_1 = require("../controller/openai-handler");
const url_1 = require("../lib/url");
const setupOpenAIRoutes = (app) => {
    const router = express_1.default.Router();
    const options = (0, cors_setup_1.corsOptions)();
    router.use(options);
    const openaiHandlerController = new openai_handler_1.OpenAIHandler();
    router.use('/', (req, res, next) => {
        console.log(`augment metadata request sanitised: ${(0, url_1.sanitiseUrl)(req.url)}`);
        next();
    });
    router.post("/augment-page-data", openaiHandlerController.getAugmentedMetadata);
    router.options('*', options);
    app.use(config_1.config.route.openaiPrefix, router);
};
exports.setupOpenAIRoutes = setupOpenAIRoutes;
//# sourceMappingURL=openaiRouter.js.map