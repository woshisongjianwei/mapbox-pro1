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

    // that.map = new mapboxgl.Map({
    //   container: "map_container", // container id
    //   // https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json  mapbox://styles/mapbox/streets-v11    mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y   mapbox://styles/mapbox/light-v10
    //   // style: "mapbox://styles/mapbox/streets-v11",
    //   style: "mapbox://styles/mapbox/light-v10",
    //   center: [-122.447303, 37.753574], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]  [116.3972282409668, 39.90960456049752]
    //   zoom: 13,
    // });

    const videoStyle = {
      version: 8,
      sources: {
        satellite: {
          type: "raster",
          url: "mapbox://mapbox.satellite",
          tileSize: 256,
        },
        video: {
          type: "video",
          urls: [
            "https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4",
            "https://static-assets.mapbox.com/mapbox-gl-js/drone.webm",
          ],
          coordinates: [
            [-122.51596391201019, 37.56238816766053],
            [-122.51467645168304, 37.56410183312965],
            [-122.51309394836426, 37.563391708549425],
            [-122.51423120498657, 37.56161849366671],
          ],
        },
      },
      layers: [
        {
          id: "background",
          type: "background",
          paint: {
            "background-color": "rgb(4,7,14)",
          },
        },
        {
          id: "satellite",
          type: "raster",
          source: "satellite",
        },
        {
          id: "video",
          type: "raster",
          source: "video",
        },
      ],
    };

    that.map = new mapboxgl.Map({
      container: "map_container", // container id
      style: videoStyle,
      center: [-122.514426, 37.562984],
      zoom: 17,
      minZoom: 14,
      bearing: -96,
    });

    let playingVideo = true;

    that.map.on("click", function() {
      playingVideo = !playingVideo;

      if (playingVideo) that.joinmap.getSource("video").play();
      else that.map.getSource("video").pause();
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
