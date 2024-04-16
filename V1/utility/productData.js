import fs from "fs";

export const productData = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
