import * as fs from "fs";
import csv from "csv-parser";

const results: any[] = [];


fs.createReadStream("dados.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
        console.log(JSON.stringify(results, null, 2));
    });
