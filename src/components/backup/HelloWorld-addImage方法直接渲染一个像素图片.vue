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
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
        center: [7.5, 58], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]
        zoom: 3, // starting zoom
        antialias: true
    });


    that.map.on('load', function () {
      var width = 64; // The image will be 64 pixels square
      var bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
      var data = new Array(width * width * bytesPerPixel);
      
      for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
          var offset = (y * width + x) * bytesPerPixel;
          data[offset + 0] = (y / width) * 255; // red
          data[offset + 1] = (x / width) * 255; // green
          data[offset + 2] = 128; // blue
          data[offset + 3] = 255; // alpha
        }
      }

      console.log('data');
      console.log(data);
      
      that.map.addImage('gradient', { width: width, height: width, data: data });
      
      that.map.addSource('point', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
          {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [7.5, 58]
          }
          }
        ]
        }
      });
      that.map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point',
        'layout': {
        'icon-image': 'gradient'
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
