"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPageContent = void 0;
const fetchPageContent = async (url) => {
    // Step 1: Fetch page content
    let pageContent = '';
    try {
        const response = await fetch(url);
        pageContent = await response.text();
    }
    catch (err) {
        console.error('Failed to fetch page:', err);
        pageContent = '';
    }
    return pageContent;
};
exports.fetchPageContent = fetchPageContent;
//# sourceMappingURL=page-fetcher.js.map