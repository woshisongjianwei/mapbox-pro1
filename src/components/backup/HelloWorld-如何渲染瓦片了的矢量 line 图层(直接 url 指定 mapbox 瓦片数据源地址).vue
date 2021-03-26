<template>
  <div class="hello">
    <div id="map_container"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  name: "HelloWorld",
  data() {
    return {
      map: null,
    };
  },
  props: {},
  mounted() {
    const that = this;
    console.log("mapboxgl");
    console.log(mapboxgl);
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmV2YSIsImEiOiJjaW1kOGNvbmgwMDR5dHpra253aDM5cWtwIn0.YbIIl9U4E5OQ2YV4QWRdbQ";

    that.map = new mapboxgl.Map({
      container: "map_container", // container id
      // https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json  mapbox://styles/mapbox/streets-v11    mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y   mapbox://styles/mapbox/light-v10
      // style: "mapbox://styles/mapbox/streets-v11",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-122.447303, 37.753574], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]  [116.3972282409668, 39.90960456049752]
      zoom: 13,
    });

    that.map.on("load", function() {
      that.map.addSource("mapbox-terrain", {
        type: "vector",
        url: "mapbox://mapbox.mapbox-terrain-v2",
      });

      that.map.addLayer(
        {
          id: "terrain-data",
          type: "line",
          source: "mapbox-terrain",
          "source-layer": "hillshade",
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-opacity": 0.6,
            "line-color": "rgb(53, 175, 109)",
            "line-width": 2,
          },
        },
        "waterway-label"
      );
    });
  },
};
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
