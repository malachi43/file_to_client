const fs = require("node:fs");
const path = require("node:path");
const { globSync } = require("glob");


const returnFilesFromDirectory = () => {
    let ftc_rc = fs.readFileSync(path.join(process.cwd(), ".ftc_rc.json"), "utf-8");
    const obj = JSON.parse(ftc_rc)
    const excludeFiles = obj.exclude;
    const dir = obj.dir
    let ext = obj.ext

    const hasPeriod = ext.includes(".");
    ext = hasPeriod ? ext : `.${ext}`;

    //replace multiple consecutive slash with single slash
    const pattern = `${dir}/*${ext}`.replace(/\/{2,}/g, "/");

    return globSync(pattern, { ignore: excludeFiles })
}

module.exports = returnFilesFromDirectory;