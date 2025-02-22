const { readdirSync } = require("node:fs")
const { join } = require("node:path")

const hasIndexHtmlFile = (dir) => {
    const entries = readdirSync(join(process.cwd(), dir))
    const regex = /index\.html/i
    const test = entry => regex.test(entry)
    return !!entries.find(test);
}

module.exports = hasIndexHtmlFile

