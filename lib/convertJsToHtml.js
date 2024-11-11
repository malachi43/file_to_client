const { basename } = require("node:path");

const convertJsToHtml = file => {
    const fileOriginalName = basename(file);
    let filenameWithoutExt = fileOriginalName.split(".")[0]
    const newFilename = `${filenameWithoutExt}.html`;
    return newFilename;
}

module.exports = convertJsToHtml;