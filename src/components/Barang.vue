<template>
  <div class="row mt-4 multiple">
    <div class="col-sm-2">
      <label for="destination" class="form-label">Barang</label>
      <select class="form-select" aria-label="Default select example" v-model="selectedItem">
        <option selected>Select</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>

    <div v-for="(input, index) in inputs" :key="index" class="col-sm-1">
      <div class="mb-3">
        <label :for="'input-' + index" class="form-label">{{ index + 1 }}</label>
        <input type="text" class="form-control" :id="'input-' + index" v-model="inputs[index]" @input="updateTotal" v-if="index < 10" />
      </div>
    </div>

    <div class="col-sm-1">
      <div class="mb-3">
        <button type="button" class="btn btn-primary" @click="addInput" v-if="inputs.length < 10">+</button>
      </div>
    </div>

    <div class="col-sm-2">
      <div class="mb-3">
        <label for="total" class="form-label">Total</label>
        <input type="text" class="form-control" id="total" :value="total" disabled />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: null,
      inputs: [''],
    };
  },
  computed: {
    total() {
      return this.inputs.reduce((acc, val) => acc + Number(val || 0), 0);
    },
  },
  methods: {
    updateTotal() {
      this.$forceUpdate();
    },
    addInput() {
      this.inputs.push('');
    },
  },
};
</script>

<style>

</style>
