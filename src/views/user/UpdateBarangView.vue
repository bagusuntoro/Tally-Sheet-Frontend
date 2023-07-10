<template>
  <div>
    <h1 class="text-center mt-3 mb-5">Update Data Barang</h1>
    <form @submit.prevent="updateBarang">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <div class="mb-3">
            <label for="jenis barang" class="form-label">Jenis Barang</label>
            <input
              type="text"
              class="form-control"
              id="jenis_barang"
              placeholder="input barang"
              v-model="barang.jenis_barang"
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
              <router-link to="/barang" class="btn btn-outline-danger mb-5"
                >Back</router-link
              >
            </div>
            <div class="col-sm-6">
              <button type="submit" class="btn btn-outline-primary float-end">
                Update
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </form>
    <footer-admin-component/>
      <change-color-component/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      barang: [],
      fileName: '',
      itemID: null
    };
  },
  methods: {
    async fetchData() {
      this.itemID = this.$route.params.id;
      console.log('contoh id',this.$route.params.id);
      const response = await axios.get(`http://localhost:8080/api/barang/${this.itemID}`);
      console.log(this.itemID);
      this.barang = response.data.data;
    },

    updateBarang() {
        let formData = new FormData();
        formData.append("jenis_barang", this.barang.jenis_barang);

        axios
        .put(`http://localhost:8080/api/barang/${this.itemID}`, formData)
        .then((response) => {
            console.log(response);
        });
      this.portfolio.jenis_barang = "";
      this.showAlert()
    },

    showAlert() {
      // Use sweetalert2
      this.$swal('Data Berhasil di update!!').then(() => {
        // Redirect to a specific page
        this.$router.push('/barang');
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
    // Panggil method fetchData saat pertama kali dijalankan
    this.fetchData();
    // console.log(Vue.version)
  },
  mounted() {
    // Panggil method fetchData setiap kali nilai itemID berubah
    this.$watch("itemID", this.fetchData);
  },
};
</script>

<style scoped>
.customPadding{
  padding-top: 35px;
}
</style>


