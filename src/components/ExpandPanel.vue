<template>
  <div class="expand-container">
    <span class="close-button" @click="$emit('close')">x</span>
    <b-row align-h="start" align-v="center">
      <b-col
        lg="12"
        md="12"
        sm="12"
        xs="12"
        style="border-right:1px solid #eee"
      >
        <sort-card
          style=";height:40vh"
          :type="type"
          :algorithm="algorithm"
          :count="60"
          flat
      /></b-col>
      <b-col lg="12" md="12" sm="12" xs="12" class="expand-content mt-3">
        <div class="expand-title">{{ algorithm }} Sort</div>

        <span v-html="pseudocodes[algorithm]"></span>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import SortCard from "./SortCard";
import { pseudocodes } from "../helpers";
export default {
  data() {
    return {
      pseudocodes
    };
  },
  props: {
    algorithm: {
      type: String,
      default: "bubble"
    },
    type: {
      type: String,
      default: "random"
    }
  },
  components: { SortCard }
};
</script>
<style>
.expand-container {
  background: #eee;
  padding: 32px;
  border-radius: 12px;
}
.expand-title {
  font-size: 1.5em;
}
.expand-content {
  /* color: white !important; */
  text-align: initial;
}
pre {
  background: #eeeeee;
  padding: 8px;

  border: 1px solid #d1cebd;
  background: #e9e8e2;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
}
.close-button {
  position: absolute;
  top: 12px;
  right: 38px;
  font-size: 20px;
  cursor: pointer;
}
</style>
