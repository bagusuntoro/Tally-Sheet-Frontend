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
        <div class="row ms-1">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <div class="row">
              <div class="col-6">
                <h5>Lokasi</h5>
              </div>
              <div class="col-6">
                <h5>: {{ this.detailNote.location }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h5>Tanggal</h5>
              </div>
              <div class="col-6">
                <h5>: {{ this.detailNote.date }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h5>Supir</h5>
              </div>
              <div class="col-6">
                <h5>: {{ this.detailNote.driver }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h5>No. Container</h5>
              </div>
              <div class="col-6">
                <h5>: {{ this.detailNote.no_container }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h5>No Telp</h5>
              </div>
              <div class="col-6">
                <h5>: {{ this.detailNote.telp }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h5>No Seal</h5>
              </div>
              <div class="col-6">
                <h5>: {{ this.detailNote.no_seal }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h5>Tujuan</h5>
              </div>
              <div class="col-6">
                <h5>: {{ this.detailNote.destination }}</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-1"></div>
        </div>

        <!-- barang -->
        <div class="row mt-4 ms-1">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
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
                        :value="{
                          id: barang.id,
                          jenis_barang: barang.jenis_barang,
                        }"
                      >
                        {{ barang.jenis_barang }}
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
          <div class="col-sm-1"></div>
        </div>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <button
              class="btn btn-primary mb-5 mt-5 float-end"
              @click="submitData"
            >
              Selanjutnya
            </button>
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
      tumpukan: 0,
      selectedBarang: null,
      listBarang: [],
      dataBarang: [],
      headers: [], // Menyimpan nama header
      detailNote: [],
      role: null,
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
          id_barang: item.id,
          id_note: this.id,
          total: total,
        };

        requestData.push(newData);
      });

      axios
        .post("http://localhost:8000/api/auth/tumpukan", requestData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push({
            name: "user-signature",
            params: { id: this.id },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchBarang() {
      console.log("tesss id :", this.id);
      axios
        .get("http://localhost:8000/api/auth/barang", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.listBarang = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get(`http://localhost:8000/api/auth/notes/${this.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.detailNote = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(this.detailNote);
    },
    submitBarang() {
      if (this.selectedBarang) {
        this.dataBarang.push({
          barang: this.selectedBarang.jenis_barang,
          id: this.selectedBarang.id,
          tumpukan: {},
        });
        this.selectedBarang = "";
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

