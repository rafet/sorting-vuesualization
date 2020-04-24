<template>
  <div>
    <b-row>
      <b-col cols="2"></b-col>
      <b-col cols="10">
        <b-row align-h="left">
          <b-col cols="3">
            <SortCard />
          </b-col>
          <b-col cols="3">
            <SortCard algorithm="selection-sort" />
          </b-col>
          <b-col cols="3">
            <SortCard algorithm="insertion-sort" />
          </b-col>
          <b-col cols="3">
            <SortCard algorithm="quick-sort" />
          </b-col>
          <b-col cols="3">
            <SortCard algorithm="merge-sort" />
          </b-col>
          <b-col cols="3">
            <SortCard algorithm="heap-sort" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SortCard from "../components/SortCard";

export default {
  components: { SortCard }
};
</script>
