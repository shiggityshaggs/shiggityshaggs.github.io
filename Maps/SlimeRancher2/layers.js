let World = new ol.layer.Tile({
    zIndex: 1,
    title: 'World',
    updateWhileAnimating: true,
    updateWhileInteracting: true,
    source: new ol.source.TileImage({
        attributions: ``,
        tileGrid: new ol.tilegrid.TileGrid({
            extent: [-1218.72688869863032,-1230.90601862152948,1220.07962325648305,1207.90049333358388],
            origin: [-1218.72688869863032,-1230.90601862152948],
            resolutions: [19.0462009475445093,9.52310047377225466,4.76155023688612733,2.38077511844306366,1.19038755922153183,0.595193779610765916,0.297596889805382958],
            tileSize: [256, 256]            
        }),
        tileUrlFunction: function(tileCoord) {
            return ('./Tiles/World/{z}/{x}/{y}.png'
                .replace('{z}', String(tileCoord[0]))
                .replace('{x}', String(tileCoord[1]))
                .replace('{y}', String(- 1 - tileCoord[2])));
        },
    })
});