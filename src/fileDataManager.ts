import * as fs from "fs";
import * as path from "path";

export const readFile = (relativePath: string, encoding: BufferEncoding = "utf8"): string => {
    const fullPath = path.resolve(__dirname, relativePath);
    return fs.readFileSync(fullPath, encoding);
};

export const writeFile = (relativePath: string, data: string, encoding: BufferEncoding = "utf8"): void => {
    const fullPath = path.resolve(__dirname, relativePath);
    fs.writeFileSync(fullPath, data, encoding);
    console.log(`File JSON created with success: ${fullPath}`);
};
