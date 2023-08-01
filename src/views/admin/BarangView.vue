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
  <!-- Page Wrapper -->
  <div id="wrapper">
    <Sidebar :class="sidebarClass"/>

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar"/>

        <!-- Begin Page Content -->
        <h1 class="text-center">Barang Page</h1>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <div class="row mt-5">
              <div class="col-sm-3">
                <router-link
                  class="btn btn-primary me-2"
                  to="/admin-input-barang"
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
                  <th scope="col">Jenis Barang</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in barang" :key="item.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ item.jenis_barang }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'admin-updateBarang',
                        params: { id: item.id },
                      }"
                      class="btn btn-warning me-2"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </router-link>
                    <!-- <button
                      @click="confirmDelete(item.id)"
                      class="btn btn-danger"
                    >
                      <i class="bi bi-trash3"></i>
                    </button> -->
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
      barang: []
    };
  },
  methods: {
    async fetchData() {
      const response = await axios.get("http://localhost:8000/api/auth/barang",{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
      this.barang = response.data.data;
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
        .delete(`http://localhost:8000/api/auth/barang/${id}`,{
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
    axios
    .get(`http://localhost:8000/api/auth/me/`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      const role = response.data.role; // Get the user's role from the response

      const token = localStorage.getItem('token');
      const expires_in = localStorage.getItem('expires_in');
      if (!token || !expires_in || new Date() > new Date(expires_in)) {
        // If token is missing or expired, redirect to the home page
        localStorage.removeItem('token');
        localStorage.removeItem('expires_in');
        this.$router.push('/');
      } else if (role !== 'admin') {
        // If the user doesn't have admin privileges, redirect to the unauthorized page
        this.$router.push('/unauthorized');
      } else {
        console.log('success')
        this.fetchData();
      }
    })
    .catch((error) => {
      this.$router.push('/');
      console.error(error);
    });
  },
};
</script>

<style scoped>
</style>
