const { pipeline } = require("node:stream");
const readlineStream = require("./readlineStream");
const transformToHtml = require("./transformToHtmlStream");
const writeToHtmlstream = require("./writeToHtmlStream");

/**
 * 
 * @param {string[]} files this function should be called after the "returnJsFileFromDirectory()" function.
 */
const createHtmlFileFromScript = files => {
    files.forEach(file => {
        pipeline(
            readlineStream(file),
            transformToHtml(),
            writeToHtmlstream(file, files),
            err => {
                if (err) throw err
                console.log(`${file} successfully converted to an html file.`)
            }
        )
    })
}

module.exports = createHtmlFileFromScript