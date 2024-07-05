"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fileDataManager_1 = require("../fileDataManager");
const results = [];
const isEmpty = (value) => {
    return value === null || value === undefined || value.trim() === "";
};
const csvFilePath = path.resolve(__dirname, "../files/data.csv");
fs.createReadStream(csvFilePath)
    .pipe((0, csv_parser_1.default)())
    .on("data", (data) => {
    const filteredData = {};
    for (const key in data) {
        if (!isEmpty(data[key])) {
            filteredData[key] = data[key];
        }
    }
    results.push(filteredData);
})
    .on("end", () => {
    const jsonResult = JSON.stringify(results, null, 2);
    console.log(jsonResult);
    (0, fileDataManager_1.writeFile)("../files/dataCsv.json", jsonResult);
});
