require("./lib/makeDirectory");
const returnJsFileFromDirectory = require("./lib/returnJsFileFromDirectory");
const createhHtmlFromJsFiles = require("./lib/createHtmlFileFromJsFile");
const cp = require("node:child_process");

const dir = "./lib"
const files = returnJsFileFromDirectory(dir, ".js");
createhHtmlFromJsFiles(files);
// const command = "live-server"
// const args = ["OUTPUT"];
// const childProcess = cp.spawnSync(command, args, { stdio: "pipe", shell: true });
