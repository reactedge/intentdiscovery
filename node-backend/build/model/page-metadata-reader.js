"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageMetadataReader = void 0;
const db_1 = require("../lib/db");
class PageMetadataReader {
    getWebsiteMetadata = async (websiteId) => {
        const seoData = await (0, db_1.query)(`SELECT slug, title, description, keywords FROM public."Page" WHERE website = $1`, [websiteId]);
        return seoData;
    };
}
exports.PageMetadataReader = PageMetadataReader;
//# sourceMappingURL=page-metadata-reader.js.map