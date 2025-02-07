require("dotenv").config();
const express = require("express");
const app = express();
let PORT = 8080;
const ngrok = require("@ngrok/ngrok");
const path = require("node:path");

app.use("/", express.static(path.join(process.cwd(), "OUTPUT")));

app.listen(PORT, async () => {
    const publicUrl = await generatePublicUrl({ port: PORT })
    // Output ngrok url to console
    console.log(`public_url: ${publicUrl}`);
})

async function generatePublicUrl({ port }) {
    // Establish connectivity
    const listener = await ngrok.forward({ addr: port, authtoken_from_env: true });
    return listener.url()
}


