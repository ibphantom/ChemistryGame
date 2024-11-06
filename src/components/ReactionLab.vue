<!-- src/components/ReactionLab.vue -->

<script lang="ts">
import { defineComponent } from 'vue';
import reactionsData from '@/data/reactions.json';

interface Reaction {
  reactants: string[];
  products: string[];
  conditions: {
    temperature: string;     // Changed to 'string' to match data
    pressure: string;        // Changed to 'string' to match data
    catalyst: string | null; // Ensure null is acceptable
  };
}

export default defineComponent({
  name: 'ReactionLab',
  data() {
    return {
      reactions: reactionsData as Reaction[],
    };
  },
  methods: {
    checkReactions() {
      this.reactions.forEach((r: Reaction) => {
        // Your logic here
      });
    },
  },
});
</script>
