const fs = require("node:fs");
const { EOL } = require("node:os");
const { Writable } = require("node:stream");
const path = require("node:path");
const convertJsToHtml = require("./convertJsToHtml");

/**
 * 
 * @param {string} filename file to create a writable stream from. 
 * @param {string[]} fileArray array containing all the file to create a navigation link from.
 * @returns 
 */
const writeToHtmlstream = (filename, fileArray) => {

  if (!fileArray) throw new Error
    (`fileArray argument missing got ${fileArray}.`)

  const newFilename = convertJsToHtml(filename)

  const fileLinks = fileArray.flatMap(file => {
    if (!file.startsWith(filename)) {
      const newFilename = convertJsToHtml(file)
      const link = `${newFilename}`
      let href = `<li><a href="${link}">${newFilename.split(".")[0]}</a></li>`
      return [href];
    }
    return [];

  }).join("");

  const heading = "available file(s) will be listed:"
  let navigation = `<nav><ul><h3>${heading}</h3>${fileLinks}</ul></nav>`

  let top = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${newFilename}</title>
     <style>
      body {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        font-family:'Courier New', Courier, monospace;
        margin: 20px;
        margin-bottom: 50px;
        padding: 20px;
        max-width: 90%;
      }
     footer{
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        text-align: center;
        background-color: black;
        color: white;
        padding: 8px 16px;
    }
    nav{
     margin-block-end: 50px;
    }
    ul {
    list-style-type: none;
    }
    ul li{
    border-inline-start: 1px solid black;
    border-block-end: 1px solid black;
    width: fit-content;
    padding: 5px;
    margin: 5px;
    }
    ul li a {
    text-decoration: none;
    }
    h2{
    border: 1px solid black;
    background-color: black;
    padding: 10px;
    margin-top: -27px;
    color: white;
    max-width: fit-content;
    }
    h3{
    font-weight: bold;
    font-variant: small-caps;
    margin-block: 30px;
    }
    main{
     border-inline-end: 1px dashed black;
     border-block-start: 1px dashed black;
    }
    </style>
  </head>
  <body>${EOL}
  ${navigation}
  <main>
  <h2>${newFilename.split(".")[0]}</h2>`;

  let bottom = `</main><footer>Made with ❤ by UKO CHBUIKE MALACHI</footer></body></html>`

  //where to save the output files.
  const fileLocation = path.join(process.cwd(), "OUTPUT", newFilename)
  const outputFileStream = fs.createWriteStream(fileLocation);

  //write the html portion to the file.
  outputFileStream.write(top);

  const htmlOutputStream = new Writable();

  htmlOutputStream._write = (chunk, _, done) => {
    outputFileStream.write(chunk);
    done();
  }

  htmlOutputStream.on("finish", () => {
    outputFileStream.write(bottom);
    outputFileStream.end();
  })

  outputFileStream.on("error", (err) => {
    htmlOutputStream.emit("error", err);
  })

  return htmlOutputStream;
}

module.exports = writeToHtmlstream