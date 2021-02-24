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
        center: [-68.13734351262877, 45.137451890638886], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]
        zoom: 5, // starting zoom
    });



    that.map.on('load', function () {

      that.map.addSource('polygon-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {

          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-67.13734351262877, 45.137451890638886],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573401557249, 43.090083319667144],
                [-70.75102474636725, 43.08003225358635],
                [-70.79761105007827, 43.21973948828747],
                [-70.98176001655037, 43.36789581966826],
                [-70.94416541205806, 43.46633942318431],
                [-71.08482, 45.3052400000002],
                [-70.6600225491012, 45.46022288673396],
                [-70.30495378282376, 45.914794623389355],
                [-70.00014034695016, 46.69317088478567],
                [-69.23708614772835, 47.44777598732787],
                [-68.90478084987546, 47.184794623394396],
                [-68.23430497910454, 47.35462921812177],
                [-67.79035274928509, 47.066248887716995],
                [-67.79141211614706, 45.702585354182816],
                [-67.13734351262877, 45.137451890638886]
              ]
            ]
          }
        }
      });

      that.map.addLayer({
        id: 'polygon-layer',
        type: 'fill',
        source: 'polygon-source',
        layout: {

        },
        paint: {
          'fill-color': '#ff0000',
          'fill-opacity': 0.3
        }
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
