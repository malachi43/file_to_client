// //this creates the FTC_OUTPUT directory if it does not exist.
// require("./makeDirectory");
const returnFilesFromDirectory = require("./returnFileFromDirectory");
const createHtmlFromJsFiles = require("./createHtmlFileFromJsFile");

module.exports = {
    returnFilesFromDirectory,
    createHtmlFromJsFiles
}