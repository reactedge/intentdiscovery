"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonParser_js_1 = require("./jsonParser.js");
const staticFile_1 = require("./staticFile");
exports.default = (app) => {
    (0, jsonParser_js_1.setupJsonBodyParse)(app);
    (0, staticFile_1.setupStaticFileAccess)(app);
};
//# sourceMappingURL=index.js.map