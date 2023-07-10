<template>
  <div id="app">
    <div class="row mt-4">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <vueSignature
          ref="signature"
          :sigOption="option"
          :h="'400px'"
          :disabled="disabled"
          :defaultUrl="dataUrl"
        ></vueSignature>
      </div>
      <div class="col-sm-1"></div>
    </div>
    <div class="row mt-2">
      <div class="col-sm-1"></div>
      <div class="col-sm-2">
        <button class="btn btn-primary w-100" type="button" @click="save"><i class="bi bi-file-check"></i></button>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-danger w-100" type="button" @click="clear"><i class="bi bi-x"></i></button>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-warning w-100" type="button" @click="undo"><i class="bi bi-arrow-counterclockwise"></i></button>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-success w-100" type="button" @click="addWatermark"><i class="bi bi-droplet-half"></i></button>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-secondary w-100" type="button" @click="toggleDisabled"><i class="bi bi-journal-x"></i></button>
      </div>
      <div class="col-sm-1"></div>
    </div>


    <!-- name -->
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="input name"
              v-model="form.name"
            />
          </div>
        </div>
        <div class="col-sm-2"></div>
      </div>
      

      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <div class="row">
            <div class="col-sm-6">
              <router-link to="/admin-note" class="btn btn-outline-danger mb-5"
                >Back</router-link
              >
            </div>
            <div class="col-sm-6">
              <button type="submit" class="btn btn-outline-primary float-end">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import vueSignature from 'vue-signature';

export default {
  props: ['id'],
  name: 'App',
  components: {
    vueSignature,
  },
  data() {
    return {
      option: {
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255,255,255)',
      },
      disabled: false,
      form: {
        jenis_barang: ""
      },
    };
  },
  methods: {
    handleSubmit() {
        let formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("signature", this.$refs.signature.save('image/svg+xml'));
        formData.append("id_note", this.id);
        console.log(formData)
        axios.post("http://localhost:8080/api/signature/", formData)
          .then((response) => {
            console.log(response);
        });
        this.form.name = "";
        this.showAlert();
        },

        showAlert() {
        // Use sweetalert2
        this.$swal('Data Berhasil di inputkan!!').then(() => {
            // Redirect to a specific page
            this.$router.push('/admin-note');
        });
        },


    save() {
      const png = this.$refs.signature.save();
      const jpeg = this.$refs.signature.save('image/jpeg');
      const svg = this.$refs.signature.save('image/svg+xml');
      console.log(png);
      console.log(jpeg);
      console.log(svg);
    },
    clear() {
      this.$refs.signature.clear();
    },
    undo() {
      this.$refs.signature.undo();
    },
    addWatermark() {
      this.$refs.signature.addWaterMark({
        text: 'PT. Garam(Persero)',
        font: '20px Arial',
        style: 'all',
        fillStyle: 'red',
        strokeStyle: 'blue',
        x: 100,
        y: 200,
        sx: 100,
        sy: 200,
      });
    },
    toggleDisabled() {
      this.disabled = !this.disabled;
    },
  },
};
</script>

<style scoped>
</style>
