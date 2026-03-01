"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorWrapper = void 0;
class ErrorWrapper {
    handle = (error) => {
        if (error instanceof Error) {
            console.log(error.message);
        }
        else {
            throw error;
        }
    };
}
exports.ErrorWrapper = ErrorWrapper;
//# sourceMappingURL=error-handler.js.map