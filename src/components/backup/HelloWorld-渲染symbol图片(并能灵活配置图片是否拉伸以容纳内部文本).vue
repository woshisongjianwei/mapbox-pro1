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
        center: [116.3972282409668, 39.90960456049752], // [-114.34411, 32.6141]  [120.20325890473109, 30.179624300914323]  [116.3972282409668, 39.90960456049752]
        zoom: 0.1 // starting zoom
    });

    const images = {
      'popup': 'https://docs.mapbox.com/mapbox-gl-js/assets/popup.png',
      'popup-debug': 'https://docs.mapbox.com/mapbox-gl-js/assets/popup_debug.png'
    }
    

    function loadImages(urlsObj, callback) {
      let result = {};
      for(let name in urlsObj) {
        that.map.loadImage(urlsObj[name], loadImageCB(name));
      }

      function loadImageCB(name) {
        return (err, image) => {
          if(err) {
            throw err;
          }
          result[name] = err ? null : image;
          if(Object.keys(urlsObj).length == Object.keys(result).length) {
            callback(result);
          }
        }
      }
    }






    loadImages(images, (loadedImages) => {
      console.log('loadedImages');
      console.log(loadedImages);

      that.map.on('load', () => {
        
        // 这个例子非常经典，它把addImage方法的第三个参数配置项 stretchX stretchY 和 content 以及 pixelRatio，这四者的关系鲜明的表达了出来
        // 一定要牢牢记住：symbol(标记) 这个东西是包括两部分的，图片和文本，这四个配置项可以让文本想显示在图片那个部分就显示在图片哪个部分，非常灵活
        // pixelRatio是控制整体 symbol(标记) 的显示像素与图片实际像素的比，该值越大，你该 symbol 的图片就缩的越小
        // 然而上面说的缩的越小指的是正常的情况而已，如果你使用了 stretchX 和 stretchY 指定图片的部分区域范围的话，那么此时你图片的相关区域却是可以拉伸的，然后你文本就自动在 content 指定的那个区域来自适应显示
        // 总之这样记就一定对：stretchX 和 stretchY 二者分别指定了图片水平和垂直方向的两个范围，这俩个范围决定的区域，可以拉伸，不管你图片缩的越小，只是该区域外面的区域缩放而已，该区域却可以各种拉伸
        // 然后你 content 也决定了一个区域，这个区域就是你文本的显示区域，不管你如何缩放如何拉伸，也就是不管你如何配置 stretchX stretchY 和 pixelRatio 这四个值，你最终文本一定是落在 content 区域里面的，绝对不能跑出去
        // 这样记也一定是对的：stretchX 和 stretchY 决定的范围可以各种拉伸，它们拉伸的目的就是为了自适应一个结果：让文本永远舒服的落在 content 的区域范围内！
        that.map.addImage('popup-debug', loadedImages['popup-debug'], {
          stretchX: [
            [25, 55],
            [85, 115]
          ],
          stretchY: [[25, 100]],
          content: [25, 25, 115, 100],
          pixelRatio: 1
        });

        // that.map.addImage('popup', loadedImages['popup'], {
        //   stretchX: [
        //     [25, 55],
        //     [85, 115]
        //   ],
        //   stretchY: [[25, 100]],
        //   content: [25, 25, 115, 100],
        //   pixelRatio: 2
        // });
          
        that.map.addSource('points', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [40, -30]
                },
                'properties': {
                  'image-name': 'popup-debug',
                  'name': 'Line 1one\nLine 2windows2abcd\nLine 3\nLine 3\nLine 3\nLine 3\nLine 30009'
                }
              },
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-40, -30]
                },
                'properties': {
                  'image-name': 'popup-debug',
                  'name': 'One longer line'
                }
              },
              // {
              //   'type': 'Feature',
              //   'geometry': {
              //     'type': 'Point',
              //     'coordinates': [40, 30]
              //   },
              //   'properties': {
              //     'image-name': 'popup',
              //     'name': 'Line 1\nLine 2\nLine 3'
              //   }
              // },
              // {
              //   'type': 'Feature',
              //   'geometry': {
              //     'type': 'Point',
              //     'coordinates': [-40, 30]
              //   },
              //   'properties': {
              //     'image-name': 'popup',
              //     'name': 'One longer line'
              //   }
              // }
            ]
          }
        });

        that.map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'points',
          'layout': {
            'text-field': ['get', 'name'],
            'icon-text-fit': 'both', // 四个取值范围: 'none'  'width'  'height'  'both'
            'icon-image': ['get', 'image-name'],
            'icon-allow-overlap': true,
            'text-allow-overlap': true
          }
        });
          









          
        // the original, unstretched image for comparison
        that.map.addSource('original', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'sjw': 'unstretched image aaa'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [116.3972282409668, 39.90960456049752]
                }
              }
            ]
          }
        });

        that.map.addLayer({
          'id': 'original',
          'type': 'symbol',
          'source': 'original',
          'layout': {
            'text-field': '{sjw}',
            'icon-image': 'popup-debug',
            'icon-allow-overlap': true,
            'text-allow-overlap': true
          }
        });


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
