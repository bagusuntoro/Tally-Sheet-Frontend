<template>
  <!-- Topbar -->
  <nav
    class="navbar navbar-expand navbar-light bg-primary topbar mb-4 static-top shadow"
  >
    <!-- Sidebar Toggle (Topbar) -->
    <form class="form-inline"  @submit.prevent>
      <button
        id="sidebarToggleTop"
        class="btn btn-link d-md-none rounded-circle mr-3 text-light"
        @click="sidebarToggled"
      >
        <i class="fa fa-bars"></i>
      </button>
    </form>
    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <div class="topbar-divider d-none d-sm-block"></div>

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="mr-2 d-none d-lg-inline text-white small"
            >Hallo! {{ this.name }}</span
          >
          <img class="img-profile rounded-circle" src="/img/nobi.jpg" />
        </a>
        <!-- Dropdown - User Information -->
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <a
            class="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#logoutModal"
            @click="konfirmasi()"
          >
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- End of Topbar -->
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  // props: ["id"],
  props: {
    sidebarToggled: Boolean // Terima properti sidebarToggled dari komponen induk (App.vue)
  },
  
  data() {
    return {
      name: "",
    };
  },
  methods: {
    sidebarToggled() {
      this.$emit("toggle-sidebar", !this.sidebarToggled);
    },
    konfirmasi() {
      Swal.fire({
        title: "Apakah Anda yakin ingin logout?",
        text: "Anda akan keluar dari akun ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Logout",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout();
        }
      });
    },
    logout() {
      const token = localStorage.getItem("token");
      if (!token) {
        // Jika token tidak ditemukan, tampilkan pesan kesalahan menggunakan Swal.fire()
        Swal.fire({
          title: "Logout gagal",
          text: "Token tidak ditemukan.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }

      axios
        .post(`http://localhost:8000/api/auth/logout`, null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          Swal.fire({
            title: `Logout berhasil!`,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          // Redirect ke halaman tertentu
          localStorage.removeItem("token");
          localStorage.removeItem("expires_in");
          this.$router.push("/"); // or the desired redirect route
        })
        .catch((error) => {
          console.error(error);

          // Jika terjadi kesalahan, tampilkan pesan kesalahan menggunakan Swal.fire()
          Swal.fire({
            title: "Logout gagal",
            text: "Terjadi kesalahan saat melakukan logout.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        });
    },
  },
  created() {
    axios
      .get(`http://localhost:8000/api/auth/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.name = response.data.name;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

</script>
