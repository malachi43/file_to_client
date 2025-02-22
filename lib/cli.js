#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const { Command } = require('commander');
const program = new Command();

program
    .name("ftc")
    .description('file-to-client cli, helps you choose file(s) you want to serve to you friends.')
    .version('0.0.1');

program.command('serve')
    .description('convert you file to html file(s) that will be served as webpages.')
    .action(_ => {

        //check if the .ftc_rc.json file exist in root of project.
        if (!fs.existsSync(path.join(process.cwd(), ".ftc_rc.json"))) {
            throw new Error("'ftc_rc.json' does not exist or is not created in the current working directory.")
        }

        try {
            const { returnFilesFromDirectory, generateHtlmFromFile } = require("./index.js");
            const files = returnFilesFromDirectory();
            //this creates the FTC_OUTPUT directory in the current working directory(the directory the cli was invoked from)if it does not exist.
            require("./makeFTC_OUPTUT_Directory.js");

            generateHtlmFromFile(files);
        } catch (error) {
            console.error("Error:", error?.stack)
        }

    });

program.command("clean")
    .description("delete files and directory create by the ftc cli command")
    .action(_ => {
        const filesAndFolder = [".ftc_rc.json", "FTC_OUTPUT", "FTC_OUTPUT_FILE_VIEW.txt"]
        try {
            filesAndFolder.forEach(entry => {
                if (fs.existsSync(entry)) {
                    fs.rmSync(path.join(process.cwd(), entry), { recursive: true })
                } else { }
            })
        } catch (error) {
            console.error("Error: ", error?.stack)
        }
    })


program.parse();