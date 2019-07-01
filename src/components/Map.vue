<template>
    <div id ="map-container">
    </div>
</template>

<script>

import L from "leaflet";
import layers from '../layers/layers';

export default {
    name: 'map-container',
    props: ['layers'],
    mounted () {
        this.initMap();
        this.initLayers();
    },
    data () {
        return {
            map: null,
            v_layers: [],
            count: 0
        };
    },
    watch: {
        layers: {
            handler (newVal, oldVal) {
                this.initLayers();
            }
        },
        deep: true
    },
    methods: {
        initMap () {
            const MAP = L.map('map-container').setView([38.272, -112.500], 2);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(MAP);

            L.control.scale({
                imperial: false
            }).addTo(MAP);

            this.map = MAP;
        },
        initLayers () {
            for (let i = this.v_layers.length - 1; i >= 0; i-= 1) {
                let layer = this.v_layers[i].layer;

                this.map.removeLayer(layer)
                this.v_layers.splice(i, 1)
            }

            this.layers.forEach(item => {
                let layer = item.layer;

                if (item.enabled === true) {
                    this.map.addLayer(layer);
                    layer.setOpacity(+item.opacity);
                }
                
                this.v_layers.push({
                    layer: layer,
                    enabled: item.enabled
                });
            });
        },
        enableLayer (layer) {
            this.v_layers.forEach(item => {
                this.map.removeLayer(item.layer);
                
                if (item.layer === layer) {
                    item.enabled = true;
                }

                if (item.enabled === true) {
                    this.map.addLayer(item.layer);
                }
            });
        },
        disableLayer (layer) {
            if (this.map.hasLayer(layer)) {
                this.map.removeLayer(layer);

                this.v_layers.forEach(item =>{
                    if (item.layer === layer) {
                        item.enabled = false;
                    }
                });
            }
        }
    }
}

</script>

<style>

#map-container {
    width: 100%;
    height: 100%;
}

</style>