
/**
 * 
 * @param {{filename:string, links: string, newlineChar: string}} 
 * @returns 
 */
const generateHtmlTop = ({ filename, links, newlineChar }) => {

    return `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${filename}</title>
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
    <body>${newlineChar}
    ${links}
    <main>
    <h2>${filename.split(".")[0]}</h2>`;
}

const generateHtmlBottom = () => {
    return `</main><footer>Made with ❤ by UKO CHBUIKE MALACHI</footer></body></html>`
}


module.exports = { top: generateHtmlTop, bottom: generateHtmlBottom }