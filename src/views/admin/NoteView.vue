<script setup>
import Sidebar from "../../components/Sidebar.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import { ref } from "vue";

const sidebarToggled = ref(false);
const sidebarClass = ref("");

const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value;
  sidebarClass.value = sidebarToggled.value ? "toggle-sidebar" : "";
};
</script>
<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <!-- Begin Page Content -->
        <h1 class="text-center">Note Page</h1>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <div class="row mt-5">
              <div class="col-sm-3">
                <!-- <router-link class="btn btn-primary me-2" to="admin-input-note">
                  <i class="bi bi-plus"></i>
                </router-link> -->
              </div>
              <div class="col-sm-9"></div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped mt-2">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Location</th>
                    <th scope="col">Date</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in note" :key="item.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.location }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.destination }}</td>
                    <td>
                      <router-link
                        :to="{
                          name: 'admin-detailNote',
                          params: { id: item.id },
                        }"
                        class="btn btn-primary me-2"
                      >
                        <i class="bi bi-ticket-detailed"></i>
                      </router-link>
                      <router-link
                        :to="{
                          name: 'admin-updateNote',
                          params: { id: item.id },
                        }"
                        class="btn btn-warning me-2"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </router-link>
                      <router-link
                        :to="{
                          name: 'admin-laporan',
                          params: { id: item.id },
                        }"
                        class="btn btn-success me-2"
                      >
                        <i class="bi bi-download"></i>
                      </router-link>
                      <!-- <button @click="deleteItem(item.id)" class="btn btn-danger">
                        <i class="bi bi-trash3"></i>
                      </button> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      note: [],
    };
  },
  methods: {
    async fetchNote() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/notes/",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.note = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      const result = await Swal.fire({
        title: "Apakah Anda yakin ingin menghapus data ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        // Jika user mengklik tombol "Hapus"
        // Lakukan proses delete
        axios
          .delete(`http://localhost:8000/api/auth/notes/${id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            // Berhasil dihapus dari server, lakukan aksi selanjutnya jika diperlukan
            console.log(response.data);
            this.fetchNote();
          })
          .catch((error) => {
            // Terjadi error saat menghapus data dari server, tampilkan pesan error jika diperlukan
            console.error(error);
          });

        // Tampilkan SweetAlert2 jika proses delete berhasil
        await Swal.fire({
          title: `Data berhasil dihapus!`,
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Redirect ke halaman tertentu
        this.$router.push("/admin-note");
      }
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
          this.fetchNote();
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
</style>
