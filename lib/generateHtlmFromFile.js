const { pipeline } = require("node:stream");
const readlineStream = require("./convertFileToReadableStream");
const transformToHtml = require("./toHtmlTransformStream");
const writeToHtmlstream = require("./htmlWriteStream");

/**
 * 
 * @param {string[]} files - the files to convert to html files.
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