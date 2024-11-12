const { basename } = require("node:path");

/**
 * 
 * @param {string} file to convert to a .html file 
 * @returns 
 */
const convertJsToHtml = file => {
    const fileOriginalName = basename(file);
    let filenameWithoutExt = fileOriginalName.split(".")[0]
    const newFilename = `${filenameWithoutExt}.html`;
    return newFilename;
}

module.exports = convertJsToHtml;