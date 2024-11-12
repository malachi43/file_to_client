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

  const htmlTop = top({
    filename: newFilename,
    links: navigation,
    newlineChar: EOL
  })

  const htmlBottom = bottom();

  //where to save the output files.
  const fileLocation = path.join(process.cwd(), "OUTPUT", newFilename)
  const outputFileStream = fs.createWriteStream(fileLocation);

  //write the html portion to the file.
  outputFileStream.write(htmlTop);

  const htmlOutputStream = new Writable();

  htmlOutputStream._write = (chunk, _, done) => {
    outputFileStream.write(chunk);
    done();
  }

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