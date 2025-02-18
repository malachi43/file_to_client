#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

if (!fs.existsSync(path.join(process.cwd(), ".ftc_rc.json"))) {
    throw new Error("'ftc_rc.json' does not exist or is not created in the current working directory.")
}

const { Command } = require('commander');
const program = new Command();

program
    .name("ftc")
    .description('file-to-client cli, helps you choose file(s) you want to serve to you friends.')
    .version('0.0.1');

program.command('serve')
    .description('convert you file to html file(s) that will be served as webpages.')
    .action(_ => {
        try {
            const { returnFilesFromDirectory, createHtmlFromJsFiles } = require("./index.js");
            const jsFiles = returnFilesFromDirectory();
            //this creates the FTC_OUTPUT directory in the current working directory(the directory the cli was invoked from)if it does not exist.
            require("./makeDirectory");
            createHtmlFromJsFiles(jsFiles);
        } catch (error) {
            console.error("Error:", error.message)
        }

    });


program.parse();