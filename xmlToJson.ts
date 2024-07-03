import * as fs from "fs";
import { parseStringPromise } from "xml2js";

const isEmpty = (value: any): boolean => {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
  };  

const xmlData = fs.readFileSync("dados.xml", "utf8");

parseStringPromise(xmlData)
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
        console.error("Error by converting XML to JSON: ", err)
    })