## file_to_client package

- This package allows you to create `HTML files` from JavaScript files, which can then be hosted as a webpage. The generated `HTML files` will be saved in an OUTPUT directory, which will be created if it doesn’t already exist.

##### NOTE: The main script file should be named `index.js` to serve as the entry point for the webpage.

#### GETTING STARTED

```javascript
//using CommonJs
const {
  returnJsFileFromDirectory,
  createHtmlFromJsFiles,
} = require("file_to_client");

//the directory to traverse
const dir = "scripts";

//file extension for javascript file
const ext = ".js";

//jsFiles is an array containing JavaScript files.
const jsFiles = returnJsFileFromDirectory(dir, ext);

//an OUTPUT folder will be generated in the current working directory (cwd) to store HTML files parsed from the specified directory.
createHtmlFromJsFiles(jsFiles);
```

```javascript
//using ES modules
import {
  returnJsFileFromDirectory,
  createHtmlFromJsFiles,
} from "file_to_client";

//the directory to traverse
const dir = "scripts";

//file extension for javascript file
const ext = ".js";

//jsFiles is an array containing JavaScript files.
const jsFiles = returnJsFileFromDirectory(dir, ext);

//an OUTPUT folder will be generated in the current working directory (cwd) to store HTML files parsed from the specified directory.
createHtmlFromJsFiles(jsFiles);
```
