<script setup>
import Sidebar from "../../components/Sidebar-User.vue";
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
        <div id="app">
          <h1 class="text-center" v-if="this.index <= 1 && this.index >= 0">
            {{ this.index === 0 ? "Tandatangan Petugas" : "Tandatangan Supir" }}
          </h1>
          <h1 class="text-center" v-if="this.index > 1">
            Nama Petugas dan supir
          </h1>
          <div class="row mt-4" v-if="this.index <= 1 && this.index >= 0">
            <div class="col-sm-1"></div>
            <div class="col-sm-10">
              <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-sm-5">
                  <vueSignature
                    ref="signature"
                    :sigOption="option"
                    :h="'200px'"
                    :w="'300px'"
                    :disabled="disabled"
                    :defaultUrl="dataUrl"
                    class="mt-3 m-auto custom"
                  ></vueSignature>
                </div>
                <div class="col-sm-5">
                  <div class="text-center">
                    <!-- save -->
                    <button
                      class="btn btn-primary mb-2 me-2 w-40"
                      type="button"
                      @click="confirmSave"
                    >
                      <i class="bi bi-file-check"> Simpan</i>
                    </button>
                    <!-- clear -->
                    <button
                      class="btn btn-danger mb-2 me-2 w-40"
                      type="button"
                      @click="clear"
                    >
                      <i class="bi bi-x"> Hapus</i>
                    </button>
                    <!-- undo -->
                    <button
                      class="btn btn-warning mb-2 me-2 w-40"
                      type="button"
                      @click="undo"
                    >
                      <i class="bi bi-arrow-counterclockwise"> Kembali</i>
                    </button>
                    <!-- watermark -->
                    <button
                      class="btn btn-success mb-2 me-2 w-40"
                      type="button"
                      @click="addWatermark"
                    >
                      <i class="bi bi-droplet-half"> Tandai</i>
                    </button>

                    <!-- disable -->
                    <button
                      class="btn btn-dark mb-2 me-2 w-40"
                      type="button"
                      @click="toggleDisabled"
                    >
                      <i class="bi bi-journal-x"> Hide</i>
                    </button>
                  </div>
                </div>
                <div class="col-sm-1"></div>
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>
         
          <!-- name -->
          <form
            @submit.prevent="submitNote"
            enctype="multipart/form-data"
            v-if="this.index > 1"
          >
            <div class="row mt-5">
              <div class="col-sm-1"></div>
              <div class="col-sm-10">
                <div class="mb-3">
                  <label for="petugas" class="form-label">Petugas</label>
                  <input
                    type="text"
                    class="form-control disable"
                    id="petugas"
                    placeholder="input petugas"
                    v-model="form.petugas"
                    :disabled="true"
                  />
                </div>
                <div class="mb-3">
                  <label for="supir" class="form-label">Supir</label>
                  <input
                    type="text"
                    class="form-control"
                    id="supir"
                    placeholder="input supir"
                    v-model="form.supir"
                  />
                </div>
              </div>
              <div class="col-sm-1"></div>
            </div>

            <div class="row">
              <div class="col-sm-1"></div>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-6">
                    <router-link to="/user-input-tumpukan" class="btn btn-danger"
                      >Kembali</router-link
                    >
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary float-end">
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-sm-1"></div>
            </div>
          </form>
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
import vueSignature from "vue-signature";
import Swal from "sweetalert2";

export default {
  props: ["id"],
  name: "App",
  components: {
    vueSignature,
  },
  data() {
    return {
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)",
      },
      disabled: false,
      form: {
        petugas: "",
        supir: "",
      },
      signature: [],
      index: 0,
      role: null,
      note: [],
      tumpukans:[],
    };
  },
  methods: {
    submitNote(){
      axios.post("http://localhost:8000/api/auth/notes/", this.note,{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          this.submitTumpukans(response.data.data.id)
        })
        .catch((error) => {
          console.error(error);
        });
    },

    submitTumpukans(id){
      this.tumpukans.forEach((objekTumpukan) => {
        objekTumpukan.id_note = id;
      });
      console.log('id: ',id)
      console.log('id_note: ',this.tumpukans.id_note)
      console.log('tumpukans: ',this.tumpukans)
      axios
        .post("http://localhost:8000/api/auth/tumpukan", this.tumpukans, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.handleSubmit(id)
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleSubmit(id) {
      let formData = new FormData();
      formData.append("petugas", this.form.petugas);
      formData.append("petugas_signature", this.signature[0]);
      formData.append("supir", this.form.supir);
      formData.append("supir_signature", this.signature[1]);
      formData.append("id_note", id);
      console.log(formData);
      axios
        .post("http://localhost:8000/api/auth/signatures/", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.showAlert();
        });
      this.form.name = "";
    },

    showAlert() {
      // Use sweetalert2
      this.$swal("Data Berhasil di inputkan!!").then(() => {
        localStorage.removeItem("note");
        localStorage.removeItem("tumpukans");
        // Redirect to a specific page
        this.$router.push("/user-note");
      });
    },
    confirmSave() {
      Swal.fire({
        title: "Konfirmasi",
        text: `Apakah Anda yakin ingin menyimpan tandatangan ${
          this.index === 0 ? "Petugas" : "Supir"
        } ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          this.save();
        }
      });
    },
    save() {
      // this.signature[this.index]= this.$refs.signature.save("image/svg+xml");
      this.signature[this.index] = this.$refs.signature.save();
      console.log("index awal :", this.index);
      console.log(
        "tandatangan :",
        this.signature[this.index],
        "index akhir :",
        this.index
      );
        this.index++;
      this.clear();
    },
    clear() {
      this.$refs.signature.clear();
    },
    undo() {
      this.$refs.signature.undo();
    },
    addWatermark() {
      this.$refs.signature.addWaterMark({
        text: "PT. Garam(Persero)",
        font: "20px Arial",
        style: "all",
        fillStyle: "red",
        strokeStyle: "blue",
        x: 100,
        y: 100,
        sx: 100,
        sy: 100,
      });
    },
    toggleDisabled() {
      this.disabled = !this.disabled;
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
        this.form.petugas = response.data.name;

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
          const note= localStorage.getItem("note")
          this.note = JSON.parse(note);
          const tumpukans= localStorage.getItem("tumpukans")
          this.tumpukans = JSON.parse(tumpukans);

          console.log('note: ', this.note)
          console.log('tumpukans: ', this.tumpukans)
          
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
