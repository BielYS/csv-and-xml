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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const xml2js_1 = require("xml2js");
const path = __importStar(require("path"));
const xmlFilePath = path.resolve(__dirname, "../compiledTS/files/data.xml");
const isEmpty = (value) => {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
};
const xmlData = fs.readFileSync(xmlFilePath, "utf8");
(0, xml2js_1.parseStringPromise)(xmlData)
    .then((result) => {
    const filteredResult = JSON.parse(JSON.stringify(result), (key, value) => {
        return isEmpty(value) ? undefined : value;
    });
    const jsonResult = JSON.stringify(filteredResult, null, 2);
    console.log(jsonResult);
    fs.writeFileSync("dadosXml.json", jsonResult, "utf8");
    console.log("File JSON created with success: dataXml.json");
})
    .catch((err) => {
    console.error("Error by converting XML to JSON: ", err);
});
