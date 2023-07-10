<template>
  <div>
    <h1 class="text-center customMargin">Input Data Barang</h1>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <div class="mb-3">
            <label for="barang" class="form-label">Jenis Barang</label>
            <input
              type="text"
              class="form-control"
              id="jenis_barang"
              placeholder="input barang"
              v-model="form.jenis_barang"
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
              <router-link to="/admin-barang" class="btn btn-outline-danger mb-5"
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
export default {
    data() {
        return {
            form: {
                jenis_barang: ""
            },
        };
    },
    methods: {
        handleSubmit() {
        let formData = new FormData();
        formData.append("jenis_barang", this.form.jenis_barang);
        console.log(formData)
        axios.post("http://localhost:8080/api/barang/", formData)
          .then((response) => {
            console.log(response);
        });
        this.form.jenis_barang = "";
        this.showAlert();
        },

        showAlert() {
        // Use sweetalert2
        this.$swal('Data Berhasil di inputkan!!').then(() => {
            // Redirect to a specific page
            this.$router.push('/admin-barang');
        });
        }

    },
    created() {
        // const token = localStorage.getItem("token");
        // const expires_in = localStorage.getItem("expires_in");

        // // console.log(new Date());
        // // console.log(new Date(expires_in));

        // if (!token || !expires_in || new Date() > new Date(expires_in)) {
        //   // Jika token tidak ada atau kadaluarsa, redirect ke halaman utama
        //   localStorage.removeItem("token");
        //   localStorage.removeItem("expires_in");
        //   this.$router.push("/");
        //   return;
        // }
    },
};
</script>
  
<style scoped>
    .customMargin {
    margin-top: 10px;
    margin-bottom: 50px;
    }
</style>