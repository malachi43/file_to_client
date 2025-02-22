const fs = require("node:fs");
const path = require("node:path");
const outputFile = "FTC_OUTPUT_FILE_VIEW.txt";
const absolutePath = path.join(process.cwd(), outputFile);


//create file if it does not exist.
if (!fs.existsSync(absolutePath)) {
    fs.writeFileSync(absolutePath, "", { encoding: "utf-8" });
}
