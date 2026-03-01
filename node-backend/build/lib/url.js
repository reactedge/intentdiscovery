"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitiseUrl = exports.normalizeUrl = void 0;
const url_1 = require("url");
const normalizeUrl = (rawUrl) => {
    const url = new url_1.URL(rawUrl);
    // Normalize pathname by collapsing multiple slashes
    url.pathname = url.pathname.replace(/\/{2,}/g, '/');
    // Also clean search parameters and hash if needed (optional)
    // url.search = decodeURIComponent(url.search);
    // url.hash = decodeURIComponent(url.hash);
    return url.toString();
};
exports.normalizeUrl = normalizeUrl;
const sanitiseUrl = (rawUrl) => {
    const dummyHost = 'https://localurl.com';
    const url = new url_1.URL(`${dummyHost}${rawUrl}`);
    // Obscure each query parameter's value
    url.searchParams.forEach((value, key) => {
        url.searchParams.set(key, '***');
    });
    return `${url.pathname}${url.search}`;
};
exports.sanitiseUrl = sanitiseUrl;
//# sourceMappingURL=url.js.map