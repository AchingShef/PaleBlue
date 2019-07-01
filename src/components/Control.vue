<template>
    <draggable v-model="v_layers" class="layer-control layer-control-right layer-control-top" @update="onUpdate">
        <div class="layer" v-for="row in v_layers">
            <p>{{row.name}}</p>
            <br>
            <label>Включить слой<input type="checkbox" v-model="row.enabled" @change="checkboxToggle(row)"></label>
            <br>
            <label>Прозрачность(клики)<input type="range" min="0" max="1" step="0.1" v-model="row.opacity" @change="rangeToggle(row)"></label>
            <br>
        </div>
    </draggable>
</template>

<script>

import draggable from 'vuedraggable'

export default {
    name: 'control',
    props: ['layers'],
    data () {
        const V_LAYERS = [];

        this.layers.forEach(item => {
            V_LAYERS.push({
                name: item.name,
                enabled: true,
                opacity: 1,
                layer: item.layer
            });
        });

        return {
            v_layers: V_LAYERS
        };
    },
    methods: {
        checkboxToggle (row) {
            this.$emit('enable-layer', row.layer, row.enabled);
        },
        rangeToggle (row) {
            row.layer.setOpacity(+row.opacity);
        },
        onUpdate () {
            this.$emit('drag-layer', this.v_layers.slice().reverse());
        }
    },
    components: {
        draggable
    },
}

</script>

<style>

.layer-control {
    position: absolute;
    z-index: 1000;
    border: 2px solid rgba(0, 0, 0, 0.2);
	background-clip: padding-box;
    border-radius: 2px;
    background-color: #ffffff;
}

.layer-control-right {
    right: 10px;
}

.layer-control-top {
    top: 10px;
}

.layer:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}

</style>