<template>
  <div class="container main-container">
    <div class="expand-panel" v-if="showExpandPanel">
      <b-row align-v="center" align-h="center">
        <b-col lg="6" sm="12" xs="12">
          <ExpandPanel
            :type="selected.type"
            class="m-2"
            style="z-index:123123; display:block;"
            :algorithm="selected.algorithm"
            @close="showExpandPanel = false"
          />
        </b-col>
      </b-row>
    </div>
    <b-row align-h="between" align-v="center">
      <b-col cols="auto" class="text-light">
        <a
          href="https://github.com/rafettopcu"
          target="_blank"
          style="color:#34495e"
        >
          <b-row no-gutters>
            <b-col><i class="fab fa-github"></i></b-col>
            <b-col><span style="" class="ml-2">github/rafettopcu</span></b-col>
          </b-row></a
        >
      </b-col>
      <b-col cols="auto"
        >Made with
        <i
          v-b-tooltip.hover.v-success.bottom="'Vue.js'"
          class="fab fa-vuejs"
        ></i
      ></b-col>
    </b-row>
    <hr style="border-color:#34495e33" />
    <b-row>
      <b-col>
        <div class="title mb-5 mt-5">
          Sorting Algorithms Vuesualizations
        </div>
      </b-col>
    </b-row>

    <b-row align-h="between">
      <b-col cols="auto">
        <span class="text-dark">
          To sort cells, click them!
        </span>
      </b-col>
      <b-col cols="auto">
        <b-input-group size="sm" class="mb-2">
          <b-form-input
            style="border-radius:40px"
            type="number"
            v-model="count"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              size="sm"
              text="Button"
              @click="sort"
              variant="outline-secondary"
              pill
              class="ml-2"
              >Sort Again!</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <div class="w-100"><hr /></div>
      <b-col cols="12">
        <b-row>
          <b-col
            sm="6"
            xxxs="6"
            xs="6"
            xxs="6"
            lg="2"
            mdd="4"
            v-for="item in t_a"
            :key="'random' + item.algorithm + item.type"
          >
            <SortCard
              style="height:150px"
              ref="cell"
              :type="item.type"
              :algorithm="item.algorithm"
              @onexpand="clickExpand"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SortCard from "../components/SortCard";
import ExpandPanel from "../components/ExpandPanel";

export default {
  components: { SortCard, ExpandPanel },
  data() {
    return {
      types: ["random", "reversed", "nearly"],
      algorithms: [
        "bubble",
        "selection",
        "insertion",
        "quick",
        "merge",
        "heap"
      ],
      count: 20,
      selected: {
        type: null,
        algorithm: null
      },
      showExpandPanel: false
    };
  },
  computed: {
    cellWidth() {
      return console.log(this.$refs.cell[0]);
    },
    t_a() {
      const arr = [];
      this.types.forEach(x => {
        this.algorithms.forEach(y => {
          arr.push({
            type: x,
            algorithm: y
          });
        });
      });
      return arr;
    }
  },
  methods: {
    sort() {
      this.$refs.cell.forEach(element => {
        element.reSort(this.count);
      });
    },
    clickExpand(t, a) {
      this.showExpandPanel = true;
      this.selected = {
        type: t,
        algorithm: a
      };
    }
  }
};
</script>
<style>
.cell {
  padding: 0 !important;
  border: 1px solid #393e46;
}
.all-cells {
  -webkit-box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.1);
}
.title {
  font-family: "Nunito", sans-serif;
  font-size: 42px;
  color: #34495e;

  width: 100%;
}
.main-container {
  margin-top: 64px;
}
.head {
  background: #34495e;
  color: white;
}
.col-name {
  padding: 12px;
}
td {
  width: 12.5%;
}
table {
  border-collapse: collapse !important;
  border-radius: 1.5em !important;
  overflow: hidden !important;
}
table,
th,
td {
  border: 1px solid #ffffff33 !important;
}
.expand-panel {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000000cc;

  z-index: 111;
}
</style>
