import HeadlessPhotopea from "./index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pea = new HeadlessPhotopea({ showBrowser: true, });
console.log(await pea.runScript(`app.echoToOE("hi")`));
let asset = fs.readFileSync("./coolImage.png");
console.log(await pea.addBinaryAsset(asset));
await pea.openFromURL("https://i.imgur.com/wVIP3ow.png", true);
await pea.runScript("app.activeDocument.activeLayer.blendMode = 'scrn'");
await pea.screenshot(__dirname + "/screen.png");