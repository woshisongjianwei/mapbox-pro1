<template>
  <div class="hello">
    <div id="map_container"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
  name: 'HelloWorld',
  data() {
    return {
      map: null,
    }
  },
  props: {
    
  },
  mounted() {
    const that = this;
    console.log('mapboxgl');
    console.log(mapboxgl);
    mapboxgl.accessToken = 'pk.eyJ1IjoicmV2YSIsImEiOiJjaW1kOGNvbmgwMDR5dHpra253aDM5cWtwIn0.YbIIl9U4E5OQ2YV4QWRdbQ';
    that.map = new mapboxgl.Map({
        container: 'map_container', // container id
        // https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json  mapbox://styles/mapbox/streets-v11    mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y   mapbox://styles/mapbox/light-v10
        style: 'mapbox://styles/mapbox/light-v10',
        center: [7.5, 58], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]
        zoom: 4, // starting zoom
        antialias: true
    });



    that.map.on('load', function () {

      that.map.addSource('line-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {

            },
            geometry: {
              type: 'LineString',
              coordinates: [[-122.48369693756104, 37.83381888486939],
[-122.48348236083984, 37.83317489144141],
[-122.48339653015138, 37.83270036637107],
[-122.48356819152832, 37.832056363179625],
[-122.48404026031496, 37.83114119107971],
[-122.48404026031496, 37.83049717427869],
[-122.48348236083984, 37.829920943955045],
[-122.48356819152832, 37.82954808664175],
[-122.48507022857666, 37.82944639795659],
[-122.48610019683838, 37.82880236636284],
[-122.48695850372314, 37.82931081282506],
[-122.48700141906738, 37.83080223556934],
[-122.48751640319824, 37.83168351665737],
[-122.48803138732912, 37.832158048267786],
[-122.48888969421387, 37.83297152392784],
[-122.48987674713133, 37.83263257682617],
[-122.49043464660643, 37.832937629287755],
[-122.49125003814696, 37.832429207817725],
[-122.49163627624512, 37.832564787218985],
[-122.49223709106445, 37.83337825839438],
[-122.49378204345702, 37.83368330777276]]
            }
          }, {
            type: 'Feature',
            properties: {

            },
            geometry: {
              type: 'LineString',
              coordinates: [[4.5, 68], [4.8, 69], [5.1, 71]]
            }
          }]
        }
      });

      that.map.addLayer({
        id: 'line-layer',
        type: 'line',
        source: 'line-source',
        layout: {
          visibility: 'visible'
        },
        paint: {
          // 'fill-color': '#ff0000',
          'line-color': '#ff0000',
          'line-opacity': 0.3,
          'line-width': 6,
          'line-offset': 10
        },
        minzoom: 4,
        maxzoom: 6
      });

    });
    

    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    #map_container {
      width: 100%;
      height: 100%;
    }
  }
</style>
