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
        <h1 class="text-center customMargin h3">Halaman Input Note</h1>
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="headerNote">
            <div class="row">
              <div class="col-1"></div>
              <div class="col-10">
                <div class="row mb-3">
                  <label for="nama" class="form-label">Keteragan</label>
                  <select
                    v-model="selectedKeterangan"
                    class="form-select"
                    aria-label="Default select example"
                    required
                  >
                    <option disabled>Pilih Keterangan</option>
                    <option
                      v-for="item in keterangan"
                      :key="item.id"
                      :value="{
                        id: item.id,
                        keterangan: item.keterangan,
                      }"
                    >
                      {{ item.keterangan }}
                    </option>
                  </select>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="location" class="form-label">Lokasi</label>
                      <input
                        type="text"
                        class="form-control"
                        id="location"
                        placeholder="input lokasi"
                        v-model="form.location"
                        required
                        :disabled="true"
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
                        placeholder="input tanggal"
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
                      >Kembali</router-link
                    >
                  </div>
                  <div class="col-6">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style="float: right"
                    >
                      Selanjutnya
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
  data() {
    return {
      form: {
        location: "",
        id_keterangan: "",
        keterangan: "",
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
      keterangan: [],
      selectedKeterangan: []
    };
  },
  mounted() {
    this.getCurrentDateTime();
  },
  methods: {
    async dataKeterangan() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/keterangan`);
        this.keterangan = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    getCurrentDateTime() {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      this.now = {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}:${seconds}`,
      };
      this.form.date = this.now.date;
    },
    handleSubmit() {
      this.form.id_keterangan = this.selectedKeterangan.id;
      this.form.keterangan = this.selectedKeterangan.keterangan;
      const data = JSON.stringify(this.form);
      if (!data) {
        this.showAlert();
      }
      localStorage.setItem("note", data);
      console.log("test data: ", this.form);
      this.$router.push({ name: "user-input-tumpukan" });
    },
    showAlert() {
      // Use sweetalert2
      this.$swal("Data yang anda inputkan kosong !!").then(() => {
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
        this.form.user_id = response.data.id;
        this.form.location = response.data.namaLokasi;

        console.log("test user id: ", this.form.user_id);

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
          this.dataKeterangan();
          const data = localStorage.getItem("note");
          if (data) {
            this.form = JSON.parse(data);
            this.form.user_id = response.data.id;
            // this.selectedKeterangan.id = this.form.id_keterangan;
            // this.selectedKeterangan.keterangan = this.form.keterangan;
          }
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