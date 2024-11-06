<template>
  <div class="periodic-table">
    <!-- Render elements -->
    <div
      v-for="element in elements"
      :key="element.atomicNumber"
      class="element"
      :style="{ backgroundColor: element.color }"
      @click="selectElement(element)"
    >
      {{ element.symbol }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import elementsData from '@/data/elements.json';

interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  color: string;
  radius: number;
  valency: number;
}

export default defineComponent({
  name: 'PeriodicTable',
  data() {
    return {
      elements: elementsData as ElementData[]
    };
  },
  methods: {
    selectElement(element: ElementData) {
      // Emit event to add atom to the scene
      this.$emit('add-atom', element);
    }
  }
});
</script>

<style scoped>
.periodic-table {
  display: flex;
  flex-wrap: wrap;
}
.element {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin: 2px;
  cursor: pointer;
  color: #fff;
}
</style>
