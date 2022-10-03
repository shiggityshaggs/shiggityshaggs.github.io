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
const fc = featureCollection.getSource();
let outArr = new Array();
let obj = new Object();

function HoverHandler(evt) {
    fc.clear();
    obj = {};
    outArr.length = 0;
    
    map.forEachFeatureAtPixel(evt.pixel, feature => {
    if (!fc.hasFeature(feature)) {
        fc.addFeature(feature);
        let props = feature.getProperties();
        if (props.itemName in obj) {
            obj[props.itemName].count += 1
        } else {
            obj[props.itemName] = { itemIcon: props.itemIcon, count: 1 };
        }
    }
    })

    for (o in obj) {
        let img = `<img class="hoverIcon" src="${IconPath}${obj[o].itemIcon}.png">`
        let name = `<span class="hoverName">${o}</span>`;
        let qty = obj[o].count > 1 ? `x<span class="hoverCount">${obj[o].count}</span>` : '';
        outArr.push(`<div>${img} ${name} ${qty}</div>`);
    }

    // fc.forEachFeature(feature => {
    //     let props = feature.getProperties();
    //     let img = `<img class="hoverIcon" src="${IconPath}${props.itemIcon}.png">`
    //     outArr.push(`<div>${img} ${props.itemName} ${obj[props.itemName]}</div>`);
    // });
    document.getElementById('list').innerHTML = outArr.join('');
}

window.addEventListener('load', () => {
	let loading = document.getElementById("loading");
	loading.parentNode.removeChild(loading);
    console.log('main.js')
});