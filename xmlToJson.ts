import * as fs from "fs";
import { parseStringPromise } from "xml2js";

const xmlData = fs.readFileSync("dados.xml", "utf8");

parseStringPromise(xmlData)
    .then((result) => {
        console.log(JSON.stringify(result, null, 2));
    })
    .catch((err) => {
        console.error(err);
    })