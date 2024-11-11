const { Readable } = require("node:stream");
const readline = require("node:readline");
const fs = require("node:fs");

/**
 * 
 * @param {string} filename file to create a stream from. 
 * @returns Readable Stream.
 */
const readlineStream = (filename) => {
    const readstream = new Readable({ encoding: "utf-8" });

    readstream._read = () => { }

    const rl = readline.createInterface({ input: fs.createReadStream(filename) })

    rl.on("line", line => {
        readstream.push(line.toString());
    })
    rl.on("end", () => {
        readstream.push(null);
    })

    return readstream
}

module.exports = readlineStream