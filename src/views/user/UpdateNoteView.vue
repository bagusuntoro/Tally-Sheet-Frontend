<script setup>
import Sidebar from "../../components/Sidebar-User.vue";
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
        <h1 class="text-center customMargin h3">Halaman Update Note</h1>
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="headerNote">
            <div class="row">
              <div class="col-1"></div>
              <div class="col-10">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="location" class="form-label">Lokasi</label>
                      <input
                        type="text"
                        class="form-control"
                        id="location"
                        placeholder="input barang"
                        v-model="form.location"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="truck" class="form-label">Nomor Truk</label>
                      <input
                        type="text"
                        class="form-control"
                        id="no_truck"
                        placeholder="input barang"
                        v-model="form.no_truck"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="location" class="form-label">Tanggal</label>
                      <input
                        type="date"
                        class="form-control"
                        id="date"
                        placeholder="input date"
                        v-model="form.date"
                        :max="now.date"
                        :min="now.date"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="driver" class="form-label">Supir</label>
                      <input
                        type="text"
                        class="form-control"
                        id="driver"
                        placeholder="input driver"
                        v-model="form.driver"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="container" class="form-label"
                        >Nomor Kontainer</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="no_container"
                        placeholder="input nomor container"
                        v-model="form.no_container"
                        required
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
                        required
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
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="destination" class="form-label">Tujuan</label>
                      <input
                        type="text"
                        class="form-control"
                        id="destination"
                        placeholder="input nomor destination"
                        v-model="form.destination"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <router-link to="/user-note" class="btn btn-danger mb-5"
                      >Batal</router-link
                    >
                  </div>
                  <div class="col-6">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style="float: right"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-1"></div>
            </div>
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
        user_id: "",
      },
      now: {},
      role: null,
    };
  },
  methods: {
    async fetchData() {
      const response = await axios.get(
        `http://localhost:8000/api/auth/notes/${this.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.form = response.data.data;
      console.log("test response:", this.note.signatures[0].petugas_signature);
    },
    handleSubmit() {
      axios.put(`http://localhost:8000/api/auth/notes/${this.id}`, this.form,{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          this.showAlert();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showAlert() {
      // Use sweetalert2
      this.$swal("Data berhasil di update !!").then(() => {
        this.$router.push("/user-note");
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
        this.role = response.data.role; // Get the user's role from the response

        const token = localStorage.getItem("token");
        const expires_in = localStorage.getItem("expires_in");
        if (!token || !expires_in || new Date() > new Date(expires_in)) {
          // If token is missing or expired, redirect to the home page
          localStorage.removeItem("token");
          localStorage.removeItem("expires_in");
          this.$router.push("/");
        } else if (this.role !== "user") {
          // If the user doesn't have admin privileges, redirect to the unauthorized page
          this.$router.push("/unauthorized");
          // console.log(response.data.role)
        } else {
          console.log("success");
          this.fetchData();
        }
      })
      .catch((error) => {
        this.$router.push("/");
        console.error(error);
      });
  },
};
</script>
