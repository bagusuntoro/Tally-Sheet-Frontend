<script setup>
import Sidebar from "../../components/Sidebar.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import { ref } from 'vue';

const sidebarToggled = ref(false);
const sidebarClass = ref('');

const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value;
  sidebarClass.value = sidebarToggled.value ? 'toggle-sidebar' : '';
};
</script>
<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass"/>

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar"/>

        <!-- Begin Page Content -->
        <h1 class="text-center customMargin">Input Data Barang</h1>
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
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
            <div class="col-1"></div>
          </div>

          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row">
                <div class="col-6">
                  <router-link
                    to="/admin-barang"
                    class="btn btn-danger"
                    >Kembali</router-link
                  >
                </div>
                <div class="col-6">
                  <button
                    type="submit"
                    class="btn btn-primary float-end"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
            <div class="col-1"></div>
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
        jenis_barang: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      let formData = new FormData();
      formData.append("jenis_barang", this.form.jenis_barang);
      console.log(formData);
      axios
        .post("http://localhost:8000/api/auth/barang/", formData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          console.log(response);
        });
      this.form.jenis_barang = "";
      this.showAlert();
    },

    showAlert() {
      // Use sweetalert2
      this.$swal("Data Berhasil di inputkan!!").then(() => {
        // Redirect to a specific page
        this.$router.push("/admin-barang");
      });
    },
  },
  created() {
     axios
      .get(`http://localhost:8000/api/auth/me/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const role = response.data.role; // Get the user's role from the response
        const token = localStorage.getItem("token");
        const expires_in = localStorage.getItem("expires_in");
        if (!token || !expires_in || new Date() > new Date(expires_in)) {
          // If token is missing or expired, redirect to the home page
          localStorage.removeItem("token");
          localStorage.removeItem("expires_in");
          this.$router.push("/");
        } else if (role !== "admin") {
          // console.log(response.data);
          // If the user doesn't have admin privileges, redirect to the unauthorized page
          this.$router.push("/unauthorized");
        } else {
          console.log("success");
        }
      })
      .catch((error) => {
        this.$router.push("/");
        console.error(error);
      });
  },
};
</script>
  
<style scoped>
.customMargin {
  margin-top: 10px;
  margin-bottom: 50px;
}
</style>