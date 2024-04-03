let photopeaFrame;

Photopea.initEmbed(document.querySelector("#photopeaContainer"), JSON.stringify({})).then(async function(frame) {
    photopeaFrame = frame;
    
    let readyTag = document.createElement("span");
    readyTag.id = "readyTag";
    readyTag.innerText = "photopea initialized";
    document.body.appendChild(readyTag);
});