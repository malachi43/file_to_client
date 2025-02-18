const fs = require("node:fs");
const { EOL } = require("node:os");
const { Writable } = require("node:stream");
const path = require("node:path");
const convertJsToHtml = require("./convertJsToHtml");
const { top, bottom } = require("./htmlpartials");

/**
 * 
 * @param {string} filename file to create a writable stream from. 
 * @param {string[]} fileArray array containing all the file to create a navigation link from.
 * @param {string} entryFile -  file to be used as an index.html file.
 * @returns 
 */
const writeToHtmlstream = (filename, fileArray) => {

  if (!fileArray || !Array.isArray(fileArray)) throw new Error(`expected an array but got "${fileArray}"`)

  const newFilename = convertJsToHtml(filename)

  const fileLinks = fileArray.flatMap(file => {
    if (!file.startsWith(filename)) {
      const newFilename = convertJsToHtml(file)
      const link = `${newFilename}`
      let href = `<li>
      <a style="font-family: 'Roboto Mono', serif; color: rgba(0,0,0,0.9)" href="${link}">${newFilename.split(".")[0]}</a>
      </li>`
      return [href];
    }
    return [];

  }).join("");

  const heading = "available file(s) will be listed here:".toUpperCase();
  let navigation = `<nav>
  <p style="font-family: 'Roboto Mono', serif; color: rgba(0,0,0,0.9)">${heading}</p>
  <ul style="font-family: 'Roboto Mono', serif; color: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; gap: 1em; flex-wrap: wrap">
  ${fileLinks}
  </ul>
  </nav>`

  const htmlTop = top({
    filename: newFilename,
    links: navigation,
    newlineChar: EOL
  })

  const htmlBottom = bottom();
  const directory = "FTC_OUTPUT"
  //where to save the output files.
  const fileLocation = path.join(process.cwd(), directory, newFilename)
  const outputFileStream = fs.createWriteStream(fileLocation);

  //write the top html portion to the file.
  outputFileStream.write(htmlTop);

  const htmlOutputStream = new Writable();

  htmlOutputStream._write = (chunk, _encoding, done) => {
    outputFileStream.write(chunk);
    done();
  }

  htmlOutputStream.on("error", err => {
    console.error(err)
  })

  htmlOutputStream.on("finish", () => {
    outputFileStream.write(htmlBottom);
    outputFileStream.end();
  })

  outputFileStream.on("error", (err) => {
    htmlOutputStream.emit("error", err);
  })

  return htmlOutputStream;

}

module.exports = writeToHtmlstream