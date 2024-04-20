async function changeLayerColor(contentWindow, r, g, b) {
    await Photopea.runScript(contentWindow, `
        var myColor =  new SolidColor();
        myColor.rgb.red = ${r};
        myColor.rgb.green = ${g};
        myColor.rgb.blue = ${b};
    
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID("contentLayer"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
        desc.putReference( charIDToTypeID("null"), ref );
        var fillDesc = new ActionDescriptor();
        var colorDesc = new ActionDescriptor();
        colorDesc.putDouble( charIDToTypeID("Rd  "), myColor.rgb.red );
        colorDesc.putDouble( charIDToTypeID("Grn "), myColor.rgb.green );
        colorDesc.putDouble( charIDToTypeID("Bl  "), myColor.rgb.blue );
        fillDesc.putObject( charIDToTypeID("Clr "), charIDToTypeID("RGBC"), colorDesc );
        desc.putObject( charIDToTypeID("T   "), stringIDToTypeID("solidColorLayer"), fillDesc );
        executeAction( charIDToTypeID("setd"), desc, DialogModes.NO );
    `);
}