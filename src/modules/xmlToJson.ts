import * as fs from "fs";
import { parseStringPromise } from "xml2js";
import * as path from "path";

const xmlFilePath = path.resolve(__dirname, "../compiledTS/files/data.xml");

const isEmpty = (value: any): boolean => {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
};  

const xmlData = fs.readFileSync(xmlFilePath, "utf8");

parseStringPromise(xmlData)
    .then((result: any) => {
        const filteredResult = JSON.parse(JSON.stringify(result), (key, value) => {
            return isEmpty(value) ? undefined : value;
        });

        const jsonResult = JSON.stringify(filteredResult, null, 2);
        console.log(jsonResult);

        fs.writeFileSync("dadosXml.json", jsonResult, "utf8");
        console.log("File JSON created with success: dataXml.json");
    })
    .catch((err: any) => {
        console.error("Error by converting XML to JSON: ", err)
    });
