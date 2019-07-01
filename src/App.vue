<template>
  <div id="app">
    <map-container ref="map-container" :layers=layers></map-container>
    <control ref="control" :changeEnable=changeEnable :layers=layers.slice().reverse()></control>
  </div>
</template>

<script>
import Map from './components/Map.vue';
import Control from './components/Control.vue';
import layers from './layers/layers.js';


export default {
    name: 'app',
    data () {
        return {
          layers: layers,
          changeEnable: 2
        };
    },
    mounted () {
      const CONTROL = this.$refs.control;

      CONTROL.$on('enable-layer', this.onLayerEnable);
      CONTROL.$on('drag-layer', layers => {
        this.layers = layers;
      });
    },
    components: {
      'map-container': Map,
      'control': Control
    },
    methods: {
      onLayerEnable (layer, enabled) {
        const MAP = this.$refs['map-container'];
        
        if (enabled) {
          MAP.enableLayer(layer);
        } else {
          MAP.disableLayer(layer);
        }
      }
    }
}

</script>

<style>

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
}

#app {
  height: 100%;
  width: 100%;
}

</style>
