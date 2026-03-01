"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvWriterWrapper = void 0;
const csvLibWriter = require('csv-writer');
const path = require('path');
const config_1 = require("../config");
class CsvWriterWrapper {
    writer = null;
    filename = '';
    startImport = () => {
        this.setExportFilename('page-export');
    };
    setExportFilename = (prefix) => {
        this.filename = `${prefix}.csv`;
    };
    getFilePath = () => {
        return `${config_1.config.rootDir}${config_1.config.export.csvFolder}/${this.filename}`;
    };
    writeHeader = (row) => {
        console.log(`${(new Date()).toLocaleString()}: write csv file at ${this.getFilePath()}`);
        this.writer = csvLibWriter.createObjectCsvWriter({
            path: path.resolve(this.getFilePath()),
            header: row,
        });
    };
    writeRecords = async (rows) => {
        if (this.writer === null) {
            throw new Error('write has not been initialised');
        }
        //@ts-ignore
        return this.writer.writeRecords(rows).then(() => {
            return this.getCsvFileLink();
        });
    };
    getCsvFileLink = () => {
        return `${config_1.config.export.csvFolder}/${this.filename}`;
    };
}
exports.CsvWriterWrapper = CsvWriterWrapper;
//# sourceMappingURL=csv-writer-wrapper.js.map