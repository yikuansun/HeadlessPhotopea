import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HeadlessPhotopea {

    browser;
    page;
    initialized = false;
    options = {
        showBrowser: false,
        logFunction: console.log,
        maxWaitTime: 60000,
    };

    /**
     * Create an instance of HeadlessPhotopea.
     * @param {Object} options Settings to override the defaults.
     */
    constructor(options={}) {
        for (let key in options) {
            this.options[key] = options[key];
        }
        (async () => {
            this.browser = await puppeteer.launch({
                headless: this.options.showBrowser?false:"new",
                args: ["--no-sandbox"],
                defaultViewport: null,
            });
            this.page = await this.browser.newPage();
            this.page.setDefaultTimeout(this.options.maxWaitTime);
            await this.page.goto("file://" + __dirname + "/browser/index.html");
            await this.page.waitForSelector("#readyTag");
            this.initialized = true;
            this.logMessage("photopea initialized!");
        })();
    }

    /**
     * Wait for window to be initialized
     * @returns {boolean} true when Photopea is ready
     */
    async isInitialized() {
        return new Promise((resolve) => {
            var check = () => {
                if (this.initialized) resolve(true);
                else setTimeout(check, 100);
            };
            check();
        });
    }

    /**
     * Run a script in Photopea.
     * @param {string} script script to run.
     * @returns {Array} output from Photopea, ending with "done". All ArrayBuffers will be converted to base 64 strings.
     */
    async runScript(script) {
        await this.isInitialized();
        let res = await this.page.evaluate(`
            new Promise(function(resolve, reject) {
                Photopea.runScript(photopeaFrame.contentWindow, ${JSON.stringify(script)}).then(function(out) {
                    for (let i = 0; i < out.length; i++) {
                        if (out[i] instanceof ArrayBuffer) {
                            out[i] = base64ArrayBuffer(out[i]);
                        }
                    }
                    resolve(out);
                });
            })
        `);
        return res;
    }

    /**
     * Open a file in Photopea.
     * @param {Buffer} buff file to load into Photopea.
     * @returns {boolean} true, once the file is loaded.
     */
    async addBinaryAsset(buff) {
        await this.isInitialized();
        let b64 = buff.toString("base64");
        let res = await this.page.evaluate(`
            new Promise(async function(resolve, reject) {
                let b64 = ${JSON.stringify(b64)};
                let binStr = atob(b64);
                let bytes = new Uint8Array(binStr.length);
                for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
                resolve(await Photopea.addBinaryAsset(photopeaFrame.contentWindow, bytes.buffer));
            })
        `);
        return res;
    }

    /**
     * Open a file in Photopea from a URL.
     * @param {*} url url of asset. make sure it can be accessed cross-origin
     * @param {boolean} asSmart open as smart object?
     * @returns {void}
     */
    async openFromURL(url, asSmart=true) {
        await this.isInitialized();
        return new Promise(async (resolve) => {
            var layerCountOld = "done";
            while (layerCountOld == "done") layerCountOld = (await this.runScript(`app.echoToOE(${asSmart?"app.activeDocument.layers.length":"app.documents.length"})`))[0];
            var layerCountNew = layerCountOld;
            await this.runScript(`app.open("${url}", null, ${asSmart});`);
            while (layerCountNew == layerCountOld) {
                layerCountNew = (await this.runScript(`app.echoToOE(${asSmart?"app.activeDocument.layers.length":"app.documents.length"})`))[0];
            }
            resolve();
        });
    }

    /**
     * Change the color of a Color Fill layer.
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     * @returns {Array} [ 'done' ]
     */
    async changeLayerColor(r, g, b) {
        await this.isInitialized();
        let res = await this.page.evaluate(`
            new Promise(function(resolve, reject) {
                changeLayerColor(photopeaFrame.contentWindow, ${r}, ${g}, ${b}).then(function(out) {
                    resolve(out);
                });
            })
        `);
        return res;
    }

    /**
     * Save a debugging screenshot to file
     * @param {string} fName Absolute path name of the file
     */
    async screenshot(fName) {
        await this.page.screenshot({
            path: fName,
        });
    }

    /**
     * Kill this window.
     */
    async destroy() {
        await this.browser.close();
    }

    /**
     * Log a message.
     * @param {string} msg Line to save to log.
     */
    logMessage(msg) {
        this.options.logFunction(msg);
    }

    /**
     * Restart the browser in an emergency situation.
     */
    async emergencyRestart() {
        this.logMessage("ERROR CAUGHT: EMERGENCY RESTART SEQUENCE INITIATED");
        this.initialized = false;
        let pageURL = await this.page.url();
        await this.page.evaluate(`document.querySelector("iframe").remove();`);
        await this.page.goto(pageURL);
        await this.page.waitForSelector("#readyTag");
        this.initialized = true;
        this.logMessage("restart sequence completed!");
    }

}

export default HeadlessPhotopea;