var Pbf = require('pbf');
var fs = require('fs');
var VectorTile = require('vector-tile').VectorTile;
 
var data = fs.readFileSync('14.vector.pbf');
var tile = new VectorTile(new Pbf(data));

// console.log(tile);
// console.log('------------------------------------------------');
// console.log(tile.layers.place_label.feature(0));
console.log('++++++++++++++++++++++++++++++++++++++++++++++++');
 
var layerNames = Object.keys(tile.layers);
console.log("图层名称", layerNames);

if (layerNames.length > 0) {
    //获取其中一个图层的一个要素的geoJson格式;
    var orig = tile.layers[layerNames[6]].feature(20).toGeoJSON(0, 0, 1);
    console.log("geojson", orig);
    //查看坐标
    // console.log("部分坐标",orig.geometry.coordinates[0]);
}