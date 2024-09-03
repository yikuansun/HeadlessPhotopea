let pea;

Photopea.createEmbed(document.querySelector("#photopeaContainer"), {}).then(async function(_pea) {
    pea = _pea;
    
    let readyTag = document.createElement("span");
    readyTag.id = "readyTag";
    readyTag.innerText = "photopea initialized";
    document.body.appendChild(readyTag);
});