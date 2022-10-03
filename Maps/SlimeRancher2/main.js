const extent = [-1218.72688869863032,-1230.90601862152948,1220.07962325648305,1207.90049333358388];
const divCoords = document.getElementById('coordinates');

let view = new ol.View({
    extent: extent,
    center: ol.extent.getCenter(extent),
    constrainOnlyCenter: true,
	zoom: 16,
	maxZoom: 20,
	minZoom: 16
});

let attribution = new ol.control.Attribution({
	collapsible: true,
	collapsed: false,
});

let map = new ol.Map({
    controls: ol.control.defaults({attribution: false}).extend([attribution]),
    target: 'map',
    view: view,
    layers: [ World, POI_Group ],
    loadend: console.log('map.loadend')
});

map.on('pointermove', evt => {
    let coords = `${evt.coordinate[0].toFixed(0)},${evt.coordinate[1].toFixed(0)}`;
    divCoords.innerHTML = coords;
    HoverHandler(evt);
});

let featureCollection = new ol.layer.Vector({
    source: new ol.source.Vector()
});

function HoverHandler(evt) {
    let fc = featureCollection.getSource();
    fc.clear();

    map.forEachFeatureAtPixel(evt.pixel, (feature => {
    if (!fc.hasFeature(feature)) {
        // let props = feature.getProperties();
        // let name = props.name;

        // for (key in ItemData) {
        //     if (name.startsWith(key)) {
        //         props.name = ItemData[key].name;
        //         props.icon = ItemData[key].icon;
        //     }
        // }

        // feature.setProperties(props);
        fc.addFeature(feature);
    }
    }))

    let arr = new Array();
    fc.forEachFeature(feature => {
        let props = feature.getProperties();
        let name = props.hasOwnProperty('itemName') ? props.itemName : props.name;
        let img = `<img class="hoverIcon" src="${IconPath}${props.itemIcon}.png">`
        arr.push(`<div>${img}${name}</div>`);
    });
    document.getElementById('list').innerHTML = arr.join('');
}

window.addEventListener('load', () => {
	let loading = document.getElementById("loading");
	loading.parentNode.removeChild(loading);
    console.log('main.js')
});