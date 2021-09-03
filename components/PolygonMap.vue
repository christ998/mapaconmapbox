<template></template>
<script>
import {changeDisplay, createPolygonOneByOne, removeSource} from "../scripts/dom";

export default {
  name: "PolygonMap",
  props: {
    geojson: {type: Object}, visibility: {type: Boolean}
  },
  inject: ['mapaRendered'],
  data() {
    return {
      polygonObject: {
        name: "",
        type: "",
        coordinates: [],
        fillColour: "",
        fillOpacity: "",
        lineColour: "",
        lineWidth: "",
        display: String,
      }
    }
  },
  created() {
    this.polygonObject.type = this.geojson['properties']['type']
    this.polygonObject.name = this.geojson["properties"]["name"]
    this.polygonObject.coordinates = this.geojson["geometry"]["coordinates"]
    this.polygonObject.fillColour = this.geojson["properties"]["fill"]
    this.polygonObject.fillOpacity = this.geojson["properties"]['fill-opacity']
    this.polygonObject.lineColour = this.geojson["properties"]['stroke']
    this.polygonObject.lineWidth = this.geojson["properties"]['stroke-width']
    this.polygonObject.display = this.visibility ? 'visible' : 'none'

  },
  mounted() {
    createPolygonOneByOne(this.mapaRendered(), this.polygonObject)
  },
  methods: {},
  computed: {},
  destroyed() {
    // removeSource(this.mapaRendered(), this.polygonObject.name)
    // changeDisplay(this.mapaRendered(), this.polygonObject.name)
  },
  watch: {
    visibility(newValue){
      if (newValue){
        changeDisplay(this.mapaRendered(), this.polygonObject.name, 'visible')
      } else {
        changeDisplay(this.mapaRendered(), this.polygonObject.name, 'none')
      }
    }
  }
}
</script>

<style>

</style>
