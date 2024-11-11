const { Transform } = require("node:stream");

/**
 * 
 * @returns Transform Stream (This stream is used to convert a stream to an html element).
 */
const transformToHtml = () => {
    const { EOL } = require("node:os");

    const transformStream = new Transform({ encoding: "utf-8" });

    transformStream._transform = (chunk, _, done) => {
        chunk = chunk.toString();
        const htmlLine = `<pre>${chunk}</pre>${EOL}`
        transformStream.push(htmlLine);
        done();
    }

    return transformStream;
}

module.exports = transformToHtml;