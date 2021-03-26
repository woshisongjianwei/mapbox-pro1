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
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-87.622088, 41.878781], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]  [116.3972282409668, 39.90960456049752]
        zoom: 8 // starting zoom
    });

    
    that.map.on('load', function() {
      // Add Mapillary sequence layer.
      // https://www.mapillary.com/developer/tiles-documentation/#sequence-layer
      that.map.addSource('mapillary', {
        'type': 'vector',
        'tiles': [
          'https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt'
        ],
        'minzoom': 6,
        'maxzoom': 14
      });

      that.map.addLayer({
        'id': 'mapillary',
        'type': 'line',
        'source': 'mapillary',
        'source-layer': 'mapillary-sequences',
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-opacity': 0.6,
          'line-color': 'rgb(53, 175, 109)',
          'line-width': 2
        }
      }, 'waterway-label');


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
