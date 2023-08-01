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
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <h1 class="text-center mt-3 mb-5">Update Data Note</h1>
            <form @submit.prevent="updateNote">
              <div class="headerNote">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="location" class="form-label">Location</label>
                      <input
                        type="text"
                        class="form-control"
                        id="location"
                        placeholder="input barang"
                        v-model="form.location"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="truck" class="form-label">Nomor Truck</label>
                      <input
                        type="text"
                        class="form-control"
                        id="no_truck"
                        placeholder="input barang"
                        v-model="form.no_truck"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="location" class="form-label">Date</label>
                      <input
                        type="date"
                        class="form-control"
                        id="date"
                        placeholder="input date"
                        v-model="form.date"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="driver" class="form-label">Driver</label>
                      <input
                        type="text"
                        class="form-control"
                        id="driver"
                        placeholder="input driver"
                        v-model="form.driver"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="container" class="form-label"
                        >Nomor Container</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="no_container"
                        placeholder="input nomor container"
                        v-model="form.no_container"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="telp" class="form-label">No Telp</label>
                      <input
                        type="text"
                        class="form-control"
                        id="telp"
                        placeholder="input telp"
                        v-model="form.telp"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="seal" class="form-label">Nomor Seal</label>
                      <input
                        type="text"
                        class="form-control"
                        id="no_seal"
                        placeholder="input nomor seal"
                        v-model="form.no_seal"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6"></div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="destination" class="form-label"
                        >Destination</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="destination"
                        placeholder="input nomor destination"
                        v-model="form.destination"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6"></div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="row">
                  <div class="col-sm-6">
                    <router-link
                      to="/admin-note"
                      class="btn btn-danger mb-5"
                      >Back</router-link
                    >
                  </div>
                  <div class="col-sm-6">
                    <button type="submit" class="btn btn-primary float-end">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
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

export default {
  props: ["id"],

  data() {
    return {
      form: {
        location: "",
        date: "",
        no_container: "",
        no_seal: "",
        destination: "",
        no_truck: "",
        driver: "",
        telp: "",
      },
    };
  },
  methods: {
    updateNote() {
      axios
        .put(
          `http://localhost:8000/api/auth/notes/${this.id}`,
          this.form,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.showAlert();
          this.$router.push("/admin-note");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showAlert() {
      this.$swal("Data berhasil diperbarui!").then(() => {
        // Aksi lanjutan setelah menampilkan swal
      });
    },

    fetchNote()
    {
      axios
      .get(`http://localhost:8000/api/auth/notes/${this.id}`,{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }) // Gunakan properti 'id' sebagai bagian dari URL endpoint
      .then((response) => {
        this.form = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    }
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

<style>
</style>
