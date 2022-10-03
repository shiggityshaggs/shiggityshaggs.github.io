const zWorld = 5;
const zPOI = 10;
const zFeatures = 15;
const IconPath = './Icons/';
const IconMissing = 'unknownIcon';

let World = new ol.layer.Tile({
    zIndex: zWorld,
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

let POI_Fields = new ol.layer.Vector({
    title: 'POI_Fields',
    updateWhileAnimating: false,
    updateWhileInteracting: false,
    postrender: console.log('POI_Fields.postrender'),
    source: new ol.source.Vector({
        attributions: [ `` ],
        featuresloadend: console.log('POI_Fields.featuresloadend'),
        url: `./GeoJSON/POI_Fields.geojson`,
        format: new ol.format.GeoJSON({
            dataProjection:'pixels',
            featureProjection:'pixels',
        }),
    }),
    style: function(feature) {
        return featureStyle(feature);
    }
});

let POI_Gorge = new ol.layer.Vector({
    title: 'POI_Gorge',
    updateWhileAnimating: false,
    updateWhileInteracting: false,
    postrender: console.log('POI_Gorge.postrender'),
    source: new ol.source.Vector({
        attributions: [ `` ],
        featuresloadend: console.log('POI_Gorge.featuresloadend'),
        url: `./GeoJSON/POI_Gorge.geojson`,
        format: new ol.format.GeoJSON({
            dataProjection:'pixels',
            featureProjection:'pixels',
        }),
    }),
    style: function(feature) {
        return featureStyle(feature);
    }
});

let POI_Strand = new ol.layer.Vector({
    title: 'POI_Strand',
    updateWhileAnimating: false,
    updateWhileInteracting: false,
    postrender: console.log('POI_Strand.postrender'),
    source: new ol.source.Vector({
        attributions: [ `` ],
        featuresloadend: console.log('POI_Strand.featuresloadend'),
        url: `./GeoJSON/POI_Strand.geojson`,
        format: new ol.format.GeoJSON({
            dataProjection:'pixels',
            featureProjection:'pixels',
        }),
    }),
    style: function(feature) {
        return featureStyle(feature);
    }
});

function featureStyle(feature) {
    let props = feature.getProperties();
    props.itemIcon = IconMissing;
    props.zIndex = zFeatures;

    for (key in ItemData) {
        if (props.name.startsWith(key)) {
            props.itemName = key;
            props.itemIcon = ItemData[key].icon;
            props.zIndex = ItemData[key].zIndex;
        }
    }

    feature.setProperties(props);

    let style = new ol.style.Style({
        zIndex: props.zIndex,
        image: new ol.style.Icon({
            src: `${IconPath}${props.itemIcon}.png`,
            scale: 0.2,
            opacity: 0.8,
        })
    });
    return style;
}

let POI_Group = new ol.layer.Group({
    layers: [ POI_Fields ], //, POI_Gorge, POI_Strand ],
    zIndex: zPOI,
});