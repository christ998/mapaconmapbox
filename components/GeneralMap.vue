<template>
  <div id="map">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import PolygonMap from "./PolygonMap";
import {createMap, createMarker, createPolygon} from "../scripts/dom";


export default {
  name: "GeneralMap",
  components: {PolygonMap},
  props: {center: Array, zoom: Number, estilo: {type: String, default: "light-v10"}},
  data() {
    return {
      mapaRendered: null,
      ready: false
    }
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9ycm9tcGEiLCJhIjoiY2tzMjZwdXYwMDB4cjJyc21hb2NvNHlwMiJ9.BDv_dfjwQfXeHfephScitQ';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: `mapbox://styles/mapbox/${this.estilo}`, // style URL
      center: [this.center[1], this.center[0]], // starting position [lng, lat]
      zoom: this.zoom // starting zoom
    })

    const mapa = createMap({estilo: this.estilo, center: this.center, zoom: this.zoom})
    this.mapaRendered = mapa
    this.$emit('mb-created', this.mapaRendered)
    this.ready = true
  },

  methods: {},
  computed: {
    verMap() {
      return this.mapaRendered
    }
  },
  provide() {
    return {
      mapaRendered: () => this.mapaRendered
    }
  }
}
</script>

<style>

</style>
