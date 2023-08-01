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
            <h1 class="text-center mb-3">Detail Note</h1>
            <div v-if="isLoading">Loading...</div>
            <div class="row">
              <div class="col-sm-6">
                <h5>Lokasi :{{ note.location }}</h5>
              </div>
              <div class="col-sm-6">
                <h5>Nomor Truk :{{ note.no_truck }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <h5>Date :{{ note.date }}</h5>
              </div>
              <div class="col-sm-6">
                <h5>Driver :{{ note.driver }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <h5>Nomor Container :{{ note.no_container }}</h5>
              </div>
              <div class="col-sm-6">
                <h5>Nomor Telp :{{ note.telp }}</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <h5>Nomor Seal :{{ note.no_seal }}</h5>
              </div>
              <div class="col-sm-6">
                <h5>Destination :{{ note.destination }}</h5>
              </div>
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
export default {
  props: ["id"],
  data() {
    return {
      isLoading: true,
      note: {
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
    async fetchData() {
      const response = await axios.get(
        `http://localhost:8000/api/auth/notes/${this.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.note.date = response.data.data.date;
      console.log(this.note);
      this.isLoading = false;
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
          console.log(1)
        } else if (role !== "admin") {
          // console.log(response.data);
          // If the user doesn't have admin privileges, redirect to the unauthorized page
          console.log(2)
          this.$router.push("/unauthorized");
        } else {
          console.log(3)
          this.fetchData();
          console.log("success");
        }
      })
      .catch((error) => {
        console.log(4)
        this.$router.push("/");
        console.error(error);
      });
  },
  // methods: {
  //   fetchNote() {
  //     // Ganti URL API dengan URL yang sesuai
  //     const apiUrl = `http://localhost:8000/api/notes/${this.id}`;

  //     // Lakukan permintaan HTTP GET ke API
  //     fetch(apiUrl)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         this.note = data.data;
  //         this.isLoading = false;
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         this.isLoading = false;
  //       });
  //   },
  // },
};
</script>
