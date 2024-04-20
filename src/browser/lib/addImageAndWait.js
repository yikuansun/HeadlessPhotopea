
var addImageAndWait = async function(contentWindow, imgURI, countDocuments=false) {
    return new Promise(async function(resolve) {
        var layerCountOld = "done";
        while (layerCountOld == "done") layerCountOld = (await Photopea.runScript(contentWindow, `app.echoToOE(${countDocuments?"app.documents.length":"app.activeDocument.layers.length"})`))[0];
        var layerCountNew = layerCountOld;
        await Photopea.runScript(contentWindow, `app.open("${imgURI}", null, true);`);
        var layerCheckInterval = async function () {
            layerCountNew = (await Photopea.runScript(contentWindow, `app.echoToOE(${countDocuments?"app.documents.length":"app.activeDocument.layers.length"})`))[0];
            if (layerCountNew == layerCountOld + 1) {
                resolve();
                return;
            }
            else setTimeout(layerCheckInterval, 50);
        };
        layerCheckInterval();
    });
};