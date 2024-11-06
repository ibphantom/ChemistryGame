<template>
  <div id="app">
    <!-- Canvas for three.js -->
    <canvas id="gameCanvas"></canvas>
    <!-- Periodic Table Component -->
    <PeriodicTable />
    <!-- Reaction Lab Component -->
    <ReactionLab />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Game } from '@/core/Game';
import PeriodicTable from '@/components/PeriodicTable.vue';
import ReactionLab from '@/components/ReactionLab.vue';

export default defineComponent({
  name: 'App',
  components: {
    PeriodicTable,
    ReactionLab
  },
  setup() {
    onMounted(() => {
      const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
      const game = new Game(canvas);
      game.start();
    });
  }
});
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#gameCanvas {
  width: 100%;
  height: 100vh;
  display: block;
}
</style>
