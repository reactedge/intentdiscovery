"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHtml = void 0;
const escapeHtml = (unsafe) => {
    if (unsafe === undefined || unsafe === null || typeof unsafe !== "string") {
        return '';
    }
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
exports.escapeHtml = escapeHtml;
//# sourceMappingURL=string.js.map