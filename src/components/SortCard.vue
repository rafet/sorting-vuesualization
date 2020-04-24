<template>
  <div>
    <div class="sort-box">
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
          <!-- <b-icon
            v-if="cursorIndexes.includes(index)"
            class="cursor"
            icon="caret-up-fill"
          ></b-icon> -->
        </div>
      </div>
      <span style="color:white;font-size:12px">{{ algorithm }}</span>
    </div>
    <!-- <b-button @click="shuffle()">Karıştır</b-button> -->
  </div>
</template>

<script>
export default {
  props: {
    algorithm: {
      type: String,
      default: 'bubble-sort'
    }
  },
  data() {
    return {
      count: 25,
      arr: [],
      cursorIndexes: [30, 12],
      b: null,
      sleepTime: 75
    };
  },
  created() {
    for (let i = 1; i <= this.count; i++) {
      this.arr.push(i);
    }

    this.shuffle();

    if (this.algorithm === 'bubble-sort') {
      this.bubbleSort();
    } else if (this.algorithm === 'insertion-sort') {
      this.insertionSort();
    } else if (this.algorithm === 'selection-sort') {
      this.selectionSort();
    } else if (this.algorithm === 'quick-sort') {
      this.quickSort(0, this.count - 1);
    } else if (this.algorithm === 'merge-sort') {
      this.mergeSort(0, this.count - 1);
    } else if (this.algorithm === 'heap-sort') {
      this.heapSort();
    }

    // this.sort(0, this.count - 1);

    // console.log(this.mergeSort(this.arr));
  },
  methods: {
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

      /* create temp arrays */
      let L = Array(n1),
        R = Array(n2);

      /* Copy data to temp arrays L[] and R[] */
      for (i = 0; i < n1; i++) L[i] = this.arr[l + i];
      for (j = 0; j < n2; j++) R[j] = this.arr[m + 1 + j];

      /* Merge the temp this.arrays back into this.arr[l..r]*/
      i = 0; // Initial index of first subthis.array
      j = 0; // Initial index of second subthis.array
      k = l; // Initial index of merged subthis.array
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

      /* Copy the remaining elements of L[], if there
       are any */
      while (i < n1) {
        this.$set(this.arr, k, L[i]);
        this.cursorIndexes = [l + i, m + 1 + j];
        i++;
        k++;
      }

      /* Copy the remaining elements of R[], if there
       are any */
      while (j < n2) {
        this.$set(this.arr, k, R[j]);
        this.cursorIndexes = [l + i, m + 1 + j];
        j++;
        k++;
      }
    },

    /* l is for left index and r is right index of the
   sub-array of arr to be sorted */
    async mergeSort(l, r) {
      if (l < r) {
        // Same as (l+r)/2, but as overflow for
        // large l and h
        let m = Math.floor(l + (r - l) / 2);

        // Sort first and second halves
        await this.mergeSort(l, m);
        await this.mergeSort(m + 1, r);

        await this.merge(l, m, r);
        this.cursorIndexes = [];
      }
    },
    async heapify(n, i) {
      let largest = i; // Initialize largest as root
      let l = 2 * i + 1; // left = 2*i + 1
      let r = 2 * i + 2; // right = 2*i + 2

      // If left child is larger than root
      if (l < n && this.arr[l] < this.arr[largest]) largest = l;

      // If right child is larger than largest so far
      if (r < n && this.arr[r] < this.arr[largest]) largest = r;
      this.cursorIndexes = [l, r];
      await this.sleep();
      // If largest is not root
      if (largest != i) {
        {
          let temp = this.arr[i];
          this.$set(this.arr, i, this.arr[largest]);
          this.$set(this.arr, largest, temp);
        }

        // Recursively heapify the affected sub-tree
        await this.heapify(n, largest);
      }
    },

    // main function to do heap sort
    async heapSort() {
      // Build heap (rearrange array)
      for (let i = Math.floor(this.count / 2 - 1); i >= 0; i--)
        await this.heapify(this.count, i);

      // One by one extract an element from heap
      for (let i = this.count - 1; i > 0; i--) {
        // Move current root to end
        let temp = this.arr[i];
        this.$set(this.arr, i, this.arr[0]);
        this.$set(this.arr, 0, temp);

        // call max heapify on the reduced heap
        await this.heapify(i, 0);
      }
      this.cursorIndexes = [];
    }
  }
};
</script>

<style>
.sort-box {
  background: #393e46;
  padding: 24px 8px;

  width: 100%;
  height: 150px;
  border-radius: 8px;
  margin-top: 4px;
}
.bar {
  background: #eee;
  height: 100%;
  margin-right: 2px;
  border-radius: 2px;
  text-align: center;
}
.cursor {
  text-align: center;
  margin-bottom: -12px;
  margin-left: -1px;
  color: #4ecca3;
}
.pointed {
  background: #4ecca3;
}
</style>
