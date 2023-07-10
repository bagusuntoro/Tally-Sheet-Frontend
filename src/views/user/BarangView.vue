<template>
  <div class="barang">
    <h1 class="text-center">This is a barang page</h1>

    <div class="row mt-5">
      <div class="col-sm-3">
        <router-link class="btn btn-primary me-2" to="input-barang">
          Insert
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
          <th scope="row">{{index+1}}</th>
          <td>{{ item.jenis_barang }}</td>
          <td>
            <router-link
              :to="{ name: 'updateBarang', params: { id: item.id } }"
              class="btn btn-warning me-2"
              >Update</router-link
            >
            <button 
            @click="deleteItem(item.id)"
            class="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      barang: [],
    };
  },
  methods: {
    async fetchbarang() {
      try {
        const response = await axios.get("http://localhost:8080/api/barang/");
        this.barang = response.data.data;
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
          .post(`http://localhost:8080/api/barang/${id}`)
          .then((response) => {
            // Berhasil dihapus dari server, lakukan aksi selanjutnya jika diperlukan
            console.log(response.data);
            this.fetchbarang();
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
        this.$router.push("/barang");
      }
    },
  },
  created() {
    this.fetchbarang();
  },
};
</script>

<style scoped>
</style>
