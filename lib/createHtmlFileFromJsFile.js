const { pipeline } = require("node:stream");
const readlineStream = require("./readlineStream");
const transformToHtml = require("./transformToHtmlStream");
const writeToHtmlstream = require("./writeToHtmlStream");

/**
 * 
 * @param {string[]} files the files to convert to html files.
 * @param {string} entryFile -  the file to use as an index.html file.
 */
const createHtmlFileFromScript = async (files) => {
    files.forEach(file => {
        pipeline(
            readlineStream(file),
            transformToHtml(),
            writeToHtmlstream(file, files),
            err => {
                if (err) throw err;
            }
        )
    })

}

module.exports = createHtmlFileFromScript