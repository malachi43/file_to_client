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

    const rl = readline.createInterface({ input: fs.createReadStream(filename, "utf-8") })



    rl.on("line", line => {
        // console.log("a line has been read: ", line)
        readstream.push(line);
    })

    rl.on("close", () => {
        readstream.push(null);
    })

    readstream.on("error", err => {
        console.error(err)
    })

    rl.on("error", err => {
        readstream.emit("error", err);
    })

    return readstream
}

module.exports = readlineStream