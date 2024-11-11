const fs = require("node:fs");
const path = require("node:path");

/**
 * 
 * @param {string} dir directory to traverse for file(s) containing the "ext" parameter
 * @param {string} ext extension of the file to return. 
 * @returns an array containing file(s) with the "ext".
 */
const returnJsFileFromDirectory = (dir, ext) => {


    const dirEntries = fs.readdirSync(dir);
    const jsFilesArray = dirEntries.filter(file => file.endsWith(ext));

    return jsFilesArray.map(file => {
        const absolutePath = path.join(process.cwd(), dir, file);
        const normalizePath = path.normalize(absolutePath);
        return normalizePath;
    });
}

module.exports = returnJsFileFromDirectory;