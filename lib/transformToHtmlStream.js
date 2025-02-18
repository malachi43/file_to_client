const { Transform } = require("node:stream");

/**
 * 
 * @returns Transform Stream (This stream is used to convert a stream to an html element).
 */
const transformToHtml = () => {
    const { EOL } = require("node:os");

    const transformStream = new Transform({ encoding: "utf-8" });
    let count = 0;
    transformStream._transform = (chunk, _, done) => {
        chunk = chunk.toString();
        const htmlLine = `<pre style="font-family: 'Roboto Mono', serif; color: rgba(0,0,0,0.9)">${++count} ${chunk}</pre>${EOL}`
        transformStream.push(htmlLine);
        done();
    }

    return transformStream;
}

module.exports = transformToHtml;