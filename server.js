// require("dotenv").config();
const express = require("express");
const app = express();
const { existsSync, writeFileSync, unlinkSync } = require("node:fs");
let PORT = 3000;
const path = require("node:path");
const publicFolder = "FTC_OUTPUT"
const outputFilename = "FTC_OUTPUT_FILE_VIEW.txt";

if (existsSync(path.join(process.cwd(), outputFilename))) {
    unlinkSync(path.join(process.cwd(), outputFilename));
}
//file to check what use viewed.
require("./lib/createFile");

if (!existsSync(path.join(process.cwd(), publicFolder))) throw new Error("FTC_OUTPUT not found in current directory.");


app.use((req, res, next) => {
    const outputFileAbsolutePath = path.join(process.cwd(), outputFilename);
    writeFileSync(outputFilename, `The user viewed ${path.basename(req.url)}\n`, { flag: "a" });
    next();
})

app.use("/", express.static(publicFolder));

app.listen(PORT, async () => {
    console.log(`server is listening on port ${PORT}`)
})




