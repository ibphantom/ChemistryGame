<template>
  <div class="reaction-lab">
    <h2>Reaction Lab</h2>
    <div class="molecules">
      <!-- Display molecules added to the reaction -->
      <div
        v-for="(molecule, index) in reactants"
        :key="index"
        class="molecule"
        @click="selectMolecule(molecule)"
      >
        {{ molecule.getFormula() }}
      </div>
    </div>
    <button @click="startReaction">Start Reaction</button>
    <div class="products">
      <!-- Display reaction products -->
      <div
        v-for="(product, index) in products"
        :key="index"
        class="molecule"
      >
        {{ product.getFormula() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Molecule } from '@/components/Molecule';
import reactionsData from '@/data/reactions.json';

export default defineComponent({
  name: 'ReactionLab',
  data() {
    return {
      reactants: [] as Molecule[],
      products: [] as Molecule[]
    };
  },
  methods: {
    selectMolecule(molecule: Molecule) {
      // Remove or manipulate the molecule
    },
    addMoleculeToReaction(molecule: Molecule) {
      this.reactants.push(molecule);
    },
    startReaction() {
      // Find matching reaction from reactionsData
      const reaction = reactionsData.find(r => {
        // Compare reactants
        return this.compareReactants(r.reactants);
      });

      if (reaction) {
        // Generate products based on the reaction
        this.products = this.generateProducts(reaction.products);
      } else {
        alert('No reaction occurred.');
      }
    },
    compareReactants(reactantFormulas: string[]): boolean {
      const reactantFormulasInLab = this.reactants.map(m => m.getFormula()).sort();
      return JSON.stringify(reactantFormulasInLab) === JSON.stringify(reactantFormulas.sort());
    },
    generateProducts(productFormulas: string[]): Molecule[] {
      // Create Molecule instances based on productFormulas
      const products: Molecule[] = [];
      productFormulas.forEach(formula => {
        // Build molecule from formula
        const molecule = new Molecule();
        // Logic to add atoms and bonds based on the formula
        products.push(molecule);
      });
      return products;
    }
  }
});
</script>

<style scoped>
.reaction-lab {
  padding: 10px;
}
.molecules, .products {
  display: flex;
  flex-wrap: wrap;
}
.molecule {
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
