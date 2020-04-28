<template>
  <div>
    <div class="sort-box" @click="reSort(count)">
      <div style="display:flex;align-items:flex-end" class="w-100 h-100">
        <div
          style="display:flex;align-items:flex-end"
          v-for="(_, index) in arr"
          :key="index"
          class="bar"
          :class="{ pointed: cursorIndexes.includes(index) }"
          :style="{
            width: 100 / count + '%',
            height: ((count - _ + 1) * 100) / count + '%'
          }"
        >
          <b-icon
            v-if="cursorIndexes.includes(index)"
            class="cursor"
            icon="caret-up-fill"
          ></b-icon>
        </div>
      </div>
      <span class="algorithm-name">{{ algorithm }} {{ type }}</span>
    </div>
    <!-- <b-button @click="shuffle()">Karıştır</b-button> -->
  </div>
</template>

<script>
export default {
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
  data() {
    return {
      count: 20,
      arr: [],
      cursorIndexes: [],
      b: null,
      sleepTime: 75
    };
  },
  created() {
    this.reSort(this.count);
  },
  methods: {
    reSort(c) {
      if (this.cursorIndexes.length > 0) return;
      this.count = c;
      this.arr = [];
      for (let i = 1; i <= this.count; i++) {
        this.arr.push(i);
      }

      if (this.type === "random") {
        this.shuffle();
      } else if (this.type === "reversed") {
        console.log();
      } else if (this.type === "nearly") {
        this.arr.reverse();
        for (let i = 0; i < this.count; i += 4) {
          const t = this.arr[i];
          this.arr[i] = this.arr[i + 1];
          this.arr[i + 1] = t;
        }
      }

      if (this.algorithm === "bubble") {
        this.bubbleSort();
      } else if (this.algorithm === "insertion") {
        this.insertionSort();
      } else if (this.algorithm === "selection") {
        this.selectionSort();
      } else if (this.algorithm === "quick") {
        this.quickSort(0, this.count - 1);
      } else if (this.algorithm === "merge") {
        this.mergeSort(0, this.count - 1);
      } else if (this.algorithm === "heap") {
        this.heapSort();
      }
    },
    sleep() {
      return new Promise(resolve => setTimeout(resolve, this.sleepTime));
    },
    shuffle() {
      let temp;
      for (let i = this.arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        temp = this.arr[i];
        this.$set(this.arr, i, this.arr[j]);
        this.$set(this.arr, j, temp);
      }
    },
    async bubbleSort() {
      let temp;
      this.cursorIndexes = [0, 1];
      for (let i = 0; i < this.count; i++) {
        for (let j = 0; j < this.count - 1 - i; j++) {
          await this.sleep();

          this.cursorIndexes = [j, j + 1];
          if (this.arr[j] < this.arr[j + 1]) {
            temp = this.arr[j];
            this.$set(this.arr, j, this.arr[j + 1]);
            this.$set(this.arr, j + 1, temp);
          }
        }
      }
      this.cursorIndexes = [];
    },
    async selectionSort() {
      this.cursorIndexes = [0, 1];
      for (let i = 0; i < this.count; i++) {
        let min_index = i;
        for (let j = i + 1; j < this.count; j++) {
          await this.sleep();
          this.cursorIndexes = [j, min_index];
          if (this.arr[min_index] < this.arr[j]) {
            min_index = j;
          }
        }
        let temp = this.arr[i];
        this.$set(this.arr, i, this.arr[min_index]);
        this.$set(this.arr, min_index, temp);
      }
      this.cursorIndexes = [];
    },
    async insertionSort() {
      let i, key, j;
      for (i = 1; i < this.count; i++) {
        key = this.arr[i];
        j = i - 1;
        while (j >= 0 && this.arr[j] < key) {
          await this.sleep();
          this.cursorIndexes = [i, j];
          this.arr[j + 1] = this.arr[j];
          j = j - 1;
        }
        this.arr[j + 1] = key;
      }
      this.cursorIndexes = [];
    },
    async partition(low, high) {
      let pivot = this.arr[high]; // pivot
      let i = low - 1; // Index of smaller element
      let temp;

      for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than the pivot
        this.cursorIndexes = [i, j];
        // for (let _ = i; _ < j; _++) {
        //   this.cursorIndexes.push(_);
        // }
        if (this.arr[j] > pivot) {
          await this.sleep();
          i++; // increment index of smaller element
          temp = this.arr[i];
          this.$set(this.arr, i, this.arr[j]);
          this.$set(this.arr, j, temp);
        }
      }
      temp = this.arr[i + 1];
      this.$set(this.arr, i + 1, this.arr[high]);
      this.$set(this.arr, high, temp);

      return i + 1;
    },

    async quickSort(low, high) {
      if (low < high) {
        let pi = await this.partition(low, high);
        await this.quickSort(low, pi - 1);
        await this.quickSort(pi + 1, high);
      }
      this.cursorIndexes = [];
    },

    async merge(l, m, r) {
      let i, j, k;
      let n1 = m - l + 1;
      let n2 = r - m;

      let L = Array(n1),
        R = Array(n2);

      for (i = 0; i < n1; i++) L[i] = this.arr[l + i];
      for (j = 0; j < n2; j++) R[j] = this.arr[m + 1 + j];
      i = 0;
      j = 0;
      k = l;
      while (i < n1 && j < n2) {
        await this.sleep();
        this.cursorIndexes = [l + i, m + 1 + j];
        if (L[i] > R[j]) {
          this.$set(this.arr, k, L[i]);
          i++;
        } else {
          this.$set(this.arr, k, R[j]);
          j++;
        }
        k++;
      }
      while (i < n1) {
        this.$set(this.arr, k, L[i]);
        this.cursorIndexes = [l + i, m + 1 + j];
        i++;
        k++;
        await this.sleep();
      }

      while (j < n2) {
        this.$set(this.arr, k, R[j]);
        this.cursorIndexes = [l + i, m + 1 + j];
        j++;
        k++;
        await this.sleep();
      }
    },
    async mergeSort(l, r) {
      if (l < r) {
        let m = Math.floor(l + (r - l) / 2);

        await this.mergeSort(l, m);
        await this.mergeSort(m + 1, r);
        await this.merge(l, m, r);
      }
      this.cursorIndexes = [];
    },
    async heapify(n, i) {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;

      if (l < n && this.arr[l] < this.arr[largest]) largest = l;

      if (r < n && this.arr[r] < this.arr[largest]) largest = r;
      this.cursorIndexes = [l, r];
      await this.sleep();
      if (largest != i) {
        {
          let temp = this.arr[i];
          this.$set(this.arr, i, this.arr[largest]);
          this.$set(this.arr, largest, temp);
        }
        await this.heapify(n, largest);
      }
    },

    async heapSort() {
      for (let i = Math.floor(this.count / 2 - 1); i >= 0; i--)
        await this.heapify(this.count, i);

      for (let i = this.count - 1; i > 0; i--) {
        let temp = this.arr[i];
        this.$set(this.arr, i, this.arr[0]);
        this.$set(this.arr, 0, temp);
        await this.heapify(i, 0);
      }
      console.log(this.algorithm + " end");
      this.cursorIndexes = [];
    }
  }
};
</script>

<style>
.sort-box {
  border-radius: 8px;
  background: #393e46;
  padding: 24px;

  width: 100%;
  height: 150px;
  cursor: pointer;
  margin: 14px 0;

  -webkit-box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.55);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.55);
  border: 1px solid #ffffff22;
}

.bar {
  background: #eee;
  height: 100%;
  margin-right: 1px;
  border-radius: 2px;
  text-align: center;
}
.cursor {
  text-align: center;
  margin-bottom: -12px;

  color: #f0daa4;
  font-size: 8px;
}
.pointed {
  background: #f0daa4;
}
.box-overlay {
  background: red;
}
.algorithm-name {
  color: white;
  font-size: 12px;
  opacity: 0.5;
}
</style>
