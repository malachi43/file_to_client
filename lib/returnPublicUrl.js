// require("dotenv").config();
const express = require("express");
const app = express();
const { existsSync } = require("node:fs");
let PORT = 3000;
const path = require("node:path");
console.log("ftc_output path: ", path.join(process.cwd(), "FTC_OUTPUT"))
const publicFolder = "FTC_OUTPUT"
if (!existsSync(path.join(process.cwd(), publicFolder))) throw new Error("FTC_OUTPUT not found in current directory.")
app.use("/output", express.static(path.join(process.cwd(), publicFolder)));


app.get("/", (req, res) => {
    res.json({ msg: "hit route", success: true })
})
app.listen(PORT, async () => {
    // const publicUrl = await generatePublicUrl({ port: PORT })
    // // Output ngrok url to console
    // console.log(`public_url: ${publicUrl}`);
    console.log(`server is listening on port ${PORT}`)
})

async function generatePublicUrl({ port }) {
    // Establish connectivity
    const listener = await ngrok.forward({ addr: port, authtoken_from_env: true });
    return listener.url()
}


