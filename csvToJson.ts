import * as fs from "fs";
import csv from "csv-parser";

const results: any[] = [];

const isEmpty = (value: string | null | undefined): boolean => {
    return value === null || value === undefined || value.trim() === "";
};


fs.createReadStream("dados.csv")
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

        fs.writeFileSync("dadosCsv.json", jsonResult, "utf8");
        console.log("File JSON created with success: data.json")
    })
    
