<script setup>
import Sidebar from "../../components/Sidebar.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
</script>
<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <Sidebar />

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar />

        <!-- Begin Page Content -->
        <h1 class="text-center">User Page</h1>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <div class="row mt-5">
              <div class="col-sm-3">
                <router-link
                  class="btn btn-primary me-2"
                  to="/admin-input-user"
                >
                  <i class="bi bi-plus"></i>
                </router-link>
              </div>
              <div class="col-sm-9"></div>
            </div>

            <table class="table table-striped mt-2">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">NIK</th>
                  <th scope="col">Telp</th>
                  <th scope="col">Email</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in user" :key="item.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ item.name }}</td>
                  <td>{{ item.nik }}</td>
                  <td>{{ item.telp }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <!-- <router-link
                      :to="{
                        name: 'admin-updateuser',
                        params: { id: item.id },
                      }"
                      class="btn btn-warning me-2"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </router-link> -->
                    <button
                      @click="confirmDelete(item.id)"
                      class="btn btn-danger"
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-1"></div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <Footer />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      user: [],
    };
  },
  methods: {
    // dengan token
    async fetchData() {
      const response = await axios.get("http://localhost:8000/api/auth/user",{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
      this.user = response.data.data;
    },
    confirmDelete(id) {
      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin menghapus item ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteItem(id);
        }
      });
    },
    deleteItem(id) {
      axios
        .delete(`http://localhost:8000/api/auth/user/${id}`,{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          console.log(response.data);
          this.fetchData();
        })
        .catch((error) => {
          console.error(error);
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
    this.fetchData();
  },
};
</script>

<style scoped>
</style>
