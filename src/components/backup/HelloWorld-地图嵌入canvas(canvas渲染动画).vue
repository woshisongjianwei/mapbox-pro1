<template>
  <div class="hello">
    <div id="map_container"></div>
    <canvas id="canvasID" width="400" height="400">Canvas not supported</canvas>
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
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y', // https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json  mapbox://styles/mapbox/streets-v11
        center: [95.899147, 18.088694], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]
        zoom: 9, // starting zoom
        // pitch: 60,
        // antialias: true
    });

    //Animation from https://javascript.tutorials24x7.com/blog/how-to-draw-animated-circles-in-html5-canvas
    var canvas = document.getElementById('canvasID');
    var ctx = canvas.getContext('2d');
    var circles = [];
    var radius = 20;
    
    function Circle(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      
      this.radius = radius;
      
      this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = color;
        ctx.stroke();
      };
      
      this.update = function () {
        if (this.x + this.radius > 400 || this.x - this.radius < 0) {
        this.dx = -this.dx;
        }
        
        if (this.y + this.radius > 400 || this.y - this.radius < 0) {
        this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
      };
    }
    
    for (var i = 0; i < 5; i++) {
      var color =
        '#' +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
      var x = Math.random() * (400 - radius * 2) + radius;
      var y = Math.random() * (400 - radius * 2) + radius;
      
      var dx = (Math.random() - 0.5) * 2;
      var dy = (Math.random() - 0.5) * 2;
      
      circles.push(new Circle(x, y, dx, dy, radius, color));
      console.log('circles');
      console.log(circles);
    }
    
    function animate() {
      // requestAnimationFrame(animate);
      ctx.clearRect(0, 0, 400, 400);
      
      for (var r = 0; r < 5; r++) {
        circles[r].update();
      }
    }
    
    animate();

    that.map.on('load', function () {
      that.map.addSource('canvas-source', {
        type: 'canvas',
        canvas: 'canvasID',
        coordinates: [
          [91.4461, 21.5006],
          [100.3541, 21.5006],
          [100.3541, 13.9706],
          [91.4461, 13.9706]
        ],
        // Set to true if the canvas source is animated. If the canvas is static, animate should be set to false to improve performance.
        animate: true
      });
      
      that.map.addLayer({
        id: 'canvas-layer',
        type: 'raster',
        source: 'canvas-source'
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
