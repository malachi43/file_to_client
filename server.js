// require("dotenv").config();
const express = require("express");
const app = express();
const ngrok = require('@ngrok/ngrok');
const { existsSync, writeFileSync, unlinkSync } = require("node:fs");
const isDirectoryEmpty = require("./lib/isDirectoryEmpty");
let PORT = 4000;
const path = require("node:path");
const publicFolder = "FTC_OUTPUT"
const outputFilename = "FTC_OUTPUT_FILE_VIEW.txt";

if (existsSync(path.join(process.cwd(), outputFilename))) {
    unlinkSync(path.join(process.cwd(), outputFilename));
}
//file to check what user viewed.
require("./lib/createFTC_OUTPUT_FILE");

if (!existsSync(path.join(process.cwd(), publicFolder))) throw new Error("FTC_OUTPUT not found in current directory.");


app.use((req, res, next) => {
    if (req.url.includes(".html")) {
        writeFileSync(outputFilename, `The user viewed ${path.basename(req.url)}\n`, { flag: "a" });
    }
    next();
})

app.use("/", express.static(path.join(process.cwd(), publicFolder)));

app.use((req, res) => {
    res.send(`<h3 style="text-align: center">OOPS! - PAGE NOT FOUND 404</h3>`)
})

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.send(`<h3 style="text-align: center">${err.message}</h3>`)
})


if (isDirectoryEmpty(publicFolder)) return

app.listen(PORT, async () => {
    console.log(`server is listening on port ${PORT}`)
    ngrok.connect({ addr: PORT, authtoken_from_env: true })
        .then(listener => console.log(`Ingress established at: ${listener.url()}`));
})




