const { Transform } = require("node:stream");
const { EOL } = require("node:os");

/**
 * 
 * @param {*} str - the string to escape.
 * @returns string
 */
const escapeHtml = (str) => {
    const obj = {
        ">": "&gt;",
        "<": "&lt;"
    }

    return str.replaceAll(/[<>]/g, (match) => obj[match])
}

/**
 * 
 * @returns instance of a Transform stream (This stream is used to convert a string to an html element).
 */
const transformToHtml = () => {

    const transformStream = new Transform({ encoding: "utf-8" });
    let count = 0;
    transformStream._transform = (chunk, _, done) => {
        chunk = chunk.toString();
        chunk = escapeHtml(chunk)
        const htmlLine = `<pre style="font-family: 'Roboto Mono', serif; color: rgba(0,0,0,0.9)">${++count} ${chunk}</pre>${EOL}`
        transformStream.push(htmlLine);
        done();
    }

    return transformStream;
}

module.exports = transformToHtml;


