import HeadlessPhotopea from "./index.js";
import fs from "fs";

let pea = new HeadlessPhotopea({ showBrowser: true, });
console.log(await pea.runScript(`app.echoToOE("hi")`));
let asset = fs.readFileSync("./coolImage.png");
console.log(await pea.addBinaryAsset(asset));
await pea.openFromURL("https://i.imgur.com/wVIP3ow.png", false);
await pea.runScript("app.activeDocument.activeLayer.blendMode = 'scrn'");