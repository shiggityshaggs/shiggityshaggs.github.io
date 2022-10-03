const extent = [-1218.72688869863032,-1230.90601862152948,1220.07962325648305,1207.90049333358388];
const divCoords = document.getElementById('coordinates');
const hoverOffset = 5;

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
            obj[props.itemName] = { itemIcon: props.itemIcon, count: 1, hoverIcon: props.hoverIcon ? props.hoverIcon : null };
        }
    }
    })

    for (o in obj) {
        let img = `<img class="hoverIcon" src="${IconPath}${obj[o].itemIcon}.png">`;
        let name = `<span class="hoverName">${o}</span>`;
        let hoverIcon = obj[o].hoverIcon ? `<img class="hoverIcon" src="${IconPath}${obj[o].hoverIcon}.png">` : '';
        let qty = obj[o].count > 1 ? `<span class="hoverCountX">x</span><span class="hoverCount">${obj[o].count}</span>` : '';
        outArr.push(`<div class="hoverItem">${img} ${name}${hoverIcon} ${qty}</div>`);
    }

    let l = document.getElementById('list');
    l.innerHTML = outArr.join('');
    l.style.top = `${event.clientY + hoverOffset}px`;
    l.style.left = `${event.clientX + hoverOffset}px`;
}

window.addEventListener('load', () => {
	let loading = document.getElementById("loading");
	loading.parentNode.removeChild(loading);
    console.log('main.js')
});