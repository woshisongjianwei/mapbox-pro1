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
        center: [116.390590, 39.991375], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]  [116.3972282409668, 39.90960456049752]
        zoom: 5 // starting zoom
    });




    that.map.on('load', async function () {

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
                [116.390590, 39.991375],
                [118.88, 39.991375],
                [118.88, 41.88],
                [116.390590, 41.88],
                [116.390590, 39.991375]
              ]
            ]
          }
        }
      });

      try {

        await new Promise((resolve, reject) => {
          that.map.loadImage(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
            (err, image) => {
              console.log('111111');
              if(err) {
                throw err;
              }
              if(!that.map.hasImage('catImg')) {
                that.map.addImage('catImg', image);
                // resolve();
                reject('error了');
              }
            }
          );
        });
        console.log('222222');
        that.map.addLayer({
          id: 'polygon-layer',
          type: 'fill',
          source: 'polygon-source',
          paint: {
            'fill-pattern': 'catImg'
          }
        });

      } catch (error) {
        console.log('aaaaaa');
        console.log(error);
      }

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
