<template>

</template>

<script>
import {addAllPolygons, removeSource} from "../scripts/dom";
export default {
  name: "AllPolygonMap",
  props:['geojson'],
  inject:['mapaRendered'],
  data(){
    return{
      polygonObject:{},
    }
  },

  mounted(){
    this.polygonObject = this.geojson
    addAllPolygons(this.mapaRendered(),this.polygonObject)
  },


}
</script>
