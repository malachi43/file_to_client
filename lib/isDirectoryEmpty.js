const { readdirSync } = require("node:fs");
const { join } = require("node:path");


const isDirectoryEmpty = (dir) => {
    const entries = readdirSync(join(process.cwd(), dir))

    return entries.length === 0;
}

module.exports = isDirectoryEmpty