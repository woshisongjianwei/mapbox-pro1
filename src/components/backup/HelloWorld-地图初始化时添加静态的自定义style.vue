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

    const mapStyle = {
      'version': 8,
      'name': 'Dark',
      'sources': {
        'mapbox': {
          'type': 'vector',
          'url': 'mapbox://mapbox.mapbox-streets-v8'
        },
        'overlay': {
          'type': 'image',
          'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
          'coordinates': [
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936]
          ]
        }
      },
      'sprite': 'mapbox://sprites/mapbox/dark-v10',
      'glyphs': 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
      'layers': [
        {
          'id': 'background',
          'type': 'background',
          'paint': { 'background-color': '#111' }
        },
        {
          'id': 'water',
          'source': 'mapbox',
          'source-layer': 'water',
          'type': 'fill',
          'paint': { 'fill-color': '#2c2c2c' }
        },
        {
          'id': 'boundaries',
          'source': 'mapbox',
          'source-layer': 'admin',
          'type': 'line',
          'paint': {
          'line-color': '#797979',
          'line-dasharray': [2, 2, 6, 2]
          },
          'filter': ['all', ['==', 'maritime', 0]]
        },
        {
          'id': 'overlay',
          'source': 'overlay',
          'type': 'raster',
          'paint': { 'raster-opacity': 0.85 }
        },
        {
          'id': 'cities',
          'source': 'mapbox',
          'source-layer': 'place_label',
          'type': 'symbol',
          'layout': {
            'text-field': '{name_en}',
            'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': [
              'interpolate',
              ['linear'],
              ['zoom'],
              4,
              9,
              6,
              12
            ]
          },
          'paint': {
            'text-color': '#969696',
            'text-halo-width': 2,
            'text-halo-color': 'rgba(0, 0, 0, 0.85)'
          }
        },
        {
          'id': 'states',
          'source': 'mapbox',
          'source-layer': 'place_label',
          'type': 'symbol',
          'layout': {
            'text-transform': 'uppercase',
            'text-field': '{name_en}',
            'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
            'text-letter-spacing': 0.15,
            'text-max-width': 7,
            'text-size': [
              'interpolate',
              ['linear'],
              ['zoom'],
              4,
              10,
              6,
              14
            ]
          },
          'filter': ['==', ['get', 'class'], 'state'],
          'paint': {
            'text-color': '#ff0000',
            'text-halo-width': 2,
            'text-halo-color': 'rgba(0, 0, 0, 0.85)'
          }
        }
      ]
    };

    that.map = new mapboxgl.Map({
        container: 'map_container', // container id
        // https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json  mapbox://styles/mapbox/streets-v11    mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y   mapbox://styles/mapbox/light-v10
        style: mapStyle,
        center: [-75.789, 41.874], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]  [116.3972282409668, 39.90960456049752]
        zoom: 5 // starting zoom
    });




    // that.map.on('load', async function () {


    // });
    

    
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
