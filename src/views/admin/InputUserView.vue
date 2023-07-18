<script setup>
import Sidebar from "../../components/Sidebar.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
</script>
<template>
  <div id="wrapper">
    <Sidebar />

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar />

        <!-- Begin Page Content -->
        <h1 class="text-center customMargin">Input Data User</h1>
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="input nama"
                  v-model="form.name"
                />
              </div>
              <div class="mb-3">
                <label for="nik" class="form-label">NIK</label>
                <input
                  type="number"
                  class="form-control"
                  id="nik"
                  placeholder="input nik"
                  v-model="form.nik"
                />
              </div>
              <div class="mb-3">
                <label for="telp" class="form-label">Telp</label>
                <input
                  type="number"
                  class="form-control"
                  id="telp"
                  placeholder="input telp"
                  v-model="form.telp"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="input email"
                  v-model="form.email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="input password"
                  v-model="form.password"
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
                  <router-link
                    to="/admin-users"
                    class="btn btn-danger mb-5"
                    >Kembali</router-link
                  >
                </div>
                <div class="col-sm-6">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    style="float:right"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-2"></div>
          </div>
        </form>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <Footer />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: "",
        nik: "",
        telp: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      let formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("nik", this.form.nik);
      formData.append("telp", this.form.telp);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      console.log(formData);
      axios
        .post("http://localhost:8000/api/auth/register/", formData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          console.log(response);
        });
      this.form.name = "";
      this.showAlert();
    },

    showAlert() {
      // Use sweetalert2
      this.$swal("Data Berhasil di inputkan!!").then(() => {
        // Redirect to a specific page
        this.$router.push("/admin-users");
      });
    },
  },
  created() {
    const token = localStorage.getItem("token");
    const expires_in = localStorage.getItem("expires_in");
    // console.log(new Date());
    // console.log(new Date(expires_in));
    if (!token || !expires_in || new Date() > new Date(expires_in)) {
      // Jika token tidak ada atau kadaluarsa, redirect ke halaman utama
      localStorage.removeItem("token");
      localStorage.removeItem("expires_in");
      this.$router.push("/");
      return;
    }
  },
};
</script>
  
<style scoped>
.customMargin {
  margin-top: 10px;
  margin-bottom: 50px;
}
</style>