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
        <h1 class="text-center customMargin h3">Halaman Input Tumpukan</h1>
        <!-- detail -->
        <div class="row mt-5">
          <div class="col-1"></div>
          <div class="col-10">
            <div class="row">
              <div class="col-4">
                <h6>Lokasi</h6>
              </div>
              <div class="col-8">
                <h6>: {{ this.detailNote.location }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <h6>Tanggal</h6>
              </div>
              <div class="col-8">
                <h6>: {{ this.detailNote.date }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <h6>Supir</h6>
              </div>
              <div class="col-8">
                <h6>: {{ this.detailNote.driver }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <h6>No. Container</h6>
              </div>
              <div class="col-8">
                <h6>: {{ this.detailNote.no_container }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <h6>No Telp</h6>
              </div>
              <div class="col-8">
                <h6>: {{ this.detailNote.telp }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <h6>No Seal</h6>
              </div>
              <div class="col-8">
                <h6>: {{ this.detailNote.no_seal }}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <h6>Tujuan</h6>
              </div>
              <div class="col-8">
                <h6>: {{ this.detailNote.destination }}</h6>
              </div>
            </div>
          </div>
          <div class="col-1"></div>
        </div>

        <!-- barang -->
        <div class="row mt-4 ms-1">
          <div class="col-1"></div>
          <div class="col-10">
            <div class="row">
              <select
                v-model="selectedSPPG"
                class="form-select"
                aria-label="Default select example"
              >
                <option disabled>Pilih SPPG</option>
                <option
                  v-for="barang in listBarang"
                  :key="barang.id"
                  :value="barang.no_sppg"
                >
                  {{ barang.no_sppg }}
                </option>
              </select>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label for="barang" class="form-label">Barang</label>
                <div class="row">
                  <div class="col-9">
                    <select
                      v-model="selectedBarang"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option disabled>Pilih barang</option>
                      <option
                        v-for="barang in listBarang"
                        :key="barang.id"
                        :value="barang.product_name"
                      >
                        {{ barang.product_name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-3">
                    <button @click="submitBarang" class="btn btn-primary ms-3">
                      <i class="bi bi-arrow-down-square"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-sm-3"></div>
              <div class="col-sm-3">
                <label for="tumpukan" class="form-label">Tumpukan</label>
                <div class="row ms-1">
                  <div class="col-9">
                    <div class="row">
                      <div class="col-8 border bg-white">
                        <h4>{{ this.tumpukan }}</h4>
                      </div>
                      <div class="col-4">
                        <button
                          @click="hitungTumpukan()"
                          class="btn btn-primary"
                        >
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <button
                      @click="submitTumpukan"
                      class="btn btn-primary ms-3"
                    >
                      <i class="bi bi-arrow-down-square"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h4 class="text-center mt-5 mb-3">Data Barang</h4>
            <table class="bordered-table table-striped m-auto">
              <thead>
                <tr>
                  <th>No. SPPG</th>
                  <th>Jenis Barang</th>
                  <th
                    v-for="header in headers"
                    :key="header"
                    class="text-center"
                  >
                    {{ header }}
                  </th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataBarang" :key="index">
                  <td>{{ item.id }}</td>
                  <td>{{ item.barang }}</td>
                  <td v-for="header in headers" :key="header">
                    <!-- <ul> -->
                    <p
                      v-for="tumpukan in item.tumpukan[header]"
                      :key="tumpukan"
                    >
                      {{ tumpukan }}
                    </p>
                    <!-- </ul> -->
                  </td>
                  <td>{{ getTotalTumpukan(item) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-1"></div>
        </div>

        <!-- button -->
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">
            <div class="row mb-5 mt-5">
              <div class="col-6">
                <router-link to="/user-input-note" class="btn btn-danger">
                  Kembali
                </router-link>
              </div>
              <div class="col-6">
                <button class="btn btn-primary float-end" @click="submitData">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
          <div class="col-1"></div>
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
  data() {
    return {
      tumpukan: 0,
      selectedBarang: null,
      listBarang: [],
      dataBarang: [],
      headers: [], // Menyimpan nama header
      detailNote: [],
      role: null,
      id_note: null,
      headers: [],
      selectedSPPG: null,
    };
  },

  methods: {
    submitData() {
      console.log(this.dataBarang);

      const requestData = [];

      this.dataBarang.forEach((item) => {
        const tumpukanFields = {};
        for (const header in item.tumpukan) {
          tumpukanFields[`tumpukan_${header}`] =
            item.tumpukan[header].join(",");
        }

        const total = this.getTotalTumpukan(item);

        const newData = {
          ...tumpukanFields,
          barang: item.barang,
          sppg: item.id,
          id_note: 0,
          total: total,
        };

        requestData.push(newData);
      });

      const data = JSON.stringify(requestData);
      if (requestData.length === 0) {
        this.showAlert();
      }
      localStorage.setItem("tumpukans", data);
      this.$router.push({ name: "user-signature" });
    },
    showAlert() {
      // Use sweetalert2
      this.$swal("Data yang anda inputkan kosong !!").then(() => {
        this.$router.push("/user-note");
      });
    },

    fetchBarang() {
      let formData = new FormData();
      formData.append("lokasi", this.headers.lokasi);
      formData.append("id_keterangan", this.headers.id_keterangan);
      axios
        .post("http://localhost:8000/api/sppg", formData)
        .then((response) => {
          this.listBarang = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });

      // console.log("tesss id :", this.id);
      // axios
      //   .get("http://localhost:8000/api/auth/barang", {
      //     headers: {
      //       Authorization: "Bearer " + localStorage.getItem("token"),
      //     },
      //   })
      //   .then((response) => {
      //     this.listBarang = response.data.data;
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
    submitBarang() {
      if (this.selectedBarang) {
        this.dataBarang.push({
          barang: this.selectedBarang,
          id: this.selectedSPPG,
          tumpukan: {},
        });
        this.selectedBarang = "";
        this.selectedSPPG = "";
      }
    },
    hitungTumpukan() {
      this.tumpukan = parseInt(this.tumpukan + 1);
    },
    submitTumpukan() {
      if (this.tumpukan && this.dataBarang.length > 0) {
        const lastBarang = this.dataBarang[this.dataBarang.length - 1];
        const header = Object.keys(lastBarang.tumpukan).length + 1;
        if (header <= 10) {
          if (!this.headers.includes(header.toString())) {
            this.headers.push(header.toString());
          }
          if (!lastBarang.tumpukan[header.toString()]) {
            lastBarang.tumpukan[header.toString()] = [];
          }
          lastBarang.tumpukan[header.toString()].push(parseInt(this.tumpukan));
        }
        this.tumpukan = 0;
      }
    },
    getTotalTumpukan(item) {
      let total = 0;
      for (const header in item.tumpukan) {
        for (const tumpukan of item.tumpukan[header]) {
          total += tumpukan;
        }
      }
      return total;
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
        this.headers.lokasi = response.data.kodeLokasi;

        const token = localStorage.getItem("token");
        this.detailNote = localStorage.getItem("note");
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
          const dataNote = localStorage.getItem("note");
          if (dataNote) {
            this.detailNote = JSON.parse(dataNote);
            this.headers.id_keterangan = this.detailNote.id_keterangan;
          }
          this.fetchBarang();
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
.bordered-table {
  border-collapse: collapse;
}

.bordered-table th,
.bordered-table td {
  border: 1px solid #ccc;
  padding: 10px;
}

.bordered-li {
  border-bottom: 1px solid #ccc;
  padding: 5px;
}

span.custom {
  float: right;
  margin-right: 130px;
}
</style>

