const fs = require("node:fs");
const path = require("node:path");
const directory = "FTC_OUTPUT";
const absolutePath = path.join(process.cwd(), directory)

//make directory if it does not exist.
if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath);
}
