<template>
  <div class="row mt-4 multiple">
    <!-- <form @submit.prevent="handleSubmit" enctype="multipart/form-data"> -->
      <div class="col-sm-2">
        <label for="destination" class="form-label">Barang</label>

        <select
          class="form-select"
          v-model="tumpukan.id_barang"
          aria-label="Default select example"
        >
          <option selected>pilih</option>
          <option v-for="item in barang" :key="item.id" :value="item.id">
            {{ item.jenis_barang }}
          </option>
        </select>


        <!-- <select class="form-select" aria-label="Default select example" v-model="selectedItem">
          <option selected>Select</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select> -->
      </div>

      <div v-for="(input, index) in inputs" :key="index" class="col-sm-1">
        <div class="mb-3">
          <label :for="'input-' + index" class="form-label">{{ index + 1 }}</label>
          <input type="text" class="form-control" :id="'input-' + index" v-model="inputs[`tumpukan_${index+1}`]" @input="updateTotal" v-if="index < 10" />
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

      <button @click="handleSubmit">Simpan</button>
    <!-- </form> -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      selectedItem: null,
      inputs: [''],
      barang:[],
      tumpukan:[]
    };
  },
  computed: {
    total() {
      return this.inputs.reduce((acc, val) => acc + Number(val || 0), 0);
    },
  },
  methods: {
    handleSubmit() {
      console.log(this.tumpukan)
      // let formData = new FormData();
      // for (let index = 0; index < inputs.length; index++) {
      //   formData.append(`tumpukan_${index+1}`, this.inputs[index]); 
      // }
      console.log(this.inputs)


      // formData.append("signature", this.$refs.signature.save('image/svg+xml'));
      // formData.append("id_note", this.id);
      // console.log(formData)
      // axios.post("http://localhost:8080/api/signature/", formData)
      //   .then((response) => {
      //     console.log(response);
      // });
      // this.form.name = "";
      // this.showAlert();
      // },

      // showAlert() {
      // // Use sweetalert2
      // this.$swal('Data Berhasil di inputkan!!').then(() => {
      //     // Redirect to a specific page
      //     this.$router.push('/admin-note');
      // });
    },
    updateTotal() {
      this.$forceUpdate();
    },
    addInput() {
      // console.log(this.inputs)
      this.inputs.push('');
    },
  },
  created() {
    axios
      .get(`http://localhost:8080/api/barang/`) // Gunakan properti 'id' sebagai bagian dari URL endpoint
      .then((response) => {
        this.barang = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>

</style>
