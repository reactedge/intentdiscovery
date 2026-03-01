"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportCreator = void 0;
const csv_writer_wrapper_1 = require("./csv-writer-wrapper");
class ExportCreator {
    csvWriter = new csv_writer_wrapper_1.CsvWriterWrapper();
    getPageData = async (data) => {
        const header = [
            { 'id': 'title', 'title': 'Title' },
            { 'id': 'keywords', 'title': 'Keywords' },
            { 'id': 'description', 'title': 'Description' },
            { 'id': 'ranking', 'title': 'Ranking' },
            { 'id': 'priority', 'title': 'Priority' },
        ];
        this.csvWriter.startImport();
        this.csvWriter.writeHeader(header);
        return data.map((page) => {
            return {
                slug: page.slug,
                title: page.title,
                keywords: page.keywords,
                description: page.description
            };
        });
    };
    finaliseWriteRows = async (csvRows) => {
        console.log(`Import file with ${csvRows.length}`);
        return await this.csvWriter.writeRecords(csvRows);
    };
}
exports.ExportCreator = ExportCreator;
//# sourceMappingURL=export-creator.js.map