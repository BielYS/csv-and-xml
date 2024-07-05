import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";
import { writeFile } from "../fileDataManager";

const results: any[] = [];

const isEmpty = (value: string | null | undefined): boolean => {
    return value === null || value === undefined || value.trim() === "";
};

const csvFilePath = path.resolve(__dirname, "../files/data.csv");

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data: any) => {
        const filteredData: any = {};
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

        writeFile("../files/dataCsv.json", jsonResult);
    });
