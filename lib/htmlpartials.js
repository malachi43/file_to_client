
/**
 * 
 * @param {{filename:string, links: string, newlineChar: string}} 
 * @returns 
 */
const generateHtmlTop = ({ filename, links, newlineChar }) => {

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Schoolbell&display=swap" rel="stylesheet">
      <title>${filename}</title>
       <style>
        body {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          font-family: 'Roboto Mono', serif;
          margin: 1em;
          margin-bottom: 0.5em;
          padding: 0.5em;
          max-width: 90%;
          background-color: rgba(255,255,255,0.5);
        }
       footer{
          position: fixed;
          padding: 0.5em;
          right: 0;
          left: 0;
          bottom: 0;
          text-align: center;
          background-color: black;
          color: white;
          padding: 0.5em 1em;
      }
      nav{
       margin-block-end: 0.5em;
      }
      ul {
      list-style-type: none;
      }
      ul li{
      border-inline-start: 1px solid rgba(0,0,0,0.5);
      border-block-end: 1px solid rgba(0,0,0,0.5);
      width: fit-content;
      padding: 0.5em;
      margin: 0.5em;
      }
      ul li a {
      text-decoration: none;
      }
      ul li a:hover {
      color: rgba(0,0,0,0.7);
      }
      h3{
      background-color: black;
      padding: 0.2em 1em;
      margin-top: -1em;
      // color: rgba(255,255,255,0.9);
      color: white;
      max-width: fit-content;
      border-radius: 5px;
      }
      p{
      font-weight: bold;
      font-variant: small-caps;
      margin-block: 0.5em;
      }
      main{
       border-inline-end: 1px dashed rgba(0,0,0,0.9);
       border-block-start: 1px dashed rgba(0,0,0,0.9);
       margin-block: 2em;
      }
      </style>
    </head>
    <body>${newlineChar}
    ${links}
    <main>
    <h3>${filename.split(".")[0]}</h3>`;
}

const generateHtmlBottom = () => {
  return `</main><footer>Made with ❤ by UKO CHBUIKE MALACHI</footer></body></html>`
}


module.exports = { top: generateHtmlTop, bottom: generateHtmlBottom }