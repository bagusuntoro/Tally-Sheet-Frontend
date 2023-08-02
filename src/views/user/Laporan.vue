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
        <div id="app" ref="document">
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-10">
              <div class="row">
                <div class="col-6">
                  <router-link to="/user-note" class="btn btn-danger mb-5"
                    >Kembali</router-link
                  >
                </div>
                <div class="col-6">
                  <button
                    @click="exportToPDF"
                    class="btn btn-success float-end"
                  >
                    Export to PDF
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>
          <div id="element-to-convert">
            <div class="text-black">
              <!-- header -->
              <div class="row mt-5">
                <div class="col-1"></div>
                <div class="col-10 text-center bg-white">
                  <img src="/img/logo.png" alt="logo" width="60" />
                  <h5 class="fw-bold mt-3">TALLY SHEET</h5>
                  <p>
                    No. 0{{ note.id }}/TALLYSHEET/{{ romawi }}/{{ this.tahun }}
                  </p>
                </div>
                <div class="col-1"></div>
              </div>
              <!-- content -->
              <div class="row">
                <div class="col-1"></div>
                <div class="col-10 bg-white">
                  <div class="row">
                    <div class="col-6">
                      <p>Lokasi : {{ note.location }}</p>
                    </div>
                    <div class="col-6">
                      <p>No. Truck : {{ note.no_truck }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <p>Tanggal : {{ note.date }}</p>
                    </div>
                    <div class="col-6">
                      <p>Supir : {{ note.driver }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <p>No. Container : {{ note.no_container }}</p>
                    </div>
                    <div class="col-6">
                      <p>No. HP : {{ note.telp }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <p>No. Tujuan : {{ note.destination }}</p>
                    </div>
                    <div class="col-6"></div>
                  </div>
                </div>
                <div class="col-1"></div>
              </div>
              <!-- table -->
              <div class="row">
                <div class="col-1"></div>
                <div class="col-10 bg-white">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Jenis Barang</th>
                          <th scope="col">1</th>
                          <th scope="col">2</th>
                          <th scope="col">3</th>
                          <th scope="col">4</th>
                          <th scope="col">5</th>
                          <th scope="col">6</th>
                          <th scope="col">7</th>
                          <th scope="col">8</th>
                          <th scope="col">9</th>
                          <th scope="col">10</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in note.tumpukans"
                          :key="item.id"
                        >
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item.barang.jenis_barang }}</td>
                          <td>{{ item.tumpukan_1 }}</td>
                          <td>{{ item.tumpukan_2 }}</td>
                          <td>{{ item.tumpukan_3 }}</td>
                          <td>{{ item.tumpukan_4 }}</td>
                          <td>{{ item.tumpukan_5 }}</td>
                          <td>{{ item.tumpukan_6 }}</td>
                          <td>{{ item.tumpukan_7 }}</td>
                          <td>{{ item.tumpukan_8 }}</td>
                          <td>{{ item.tumpukan_9 }}</td>
                          <td>{{ item.tumpukan_10 }}</td>
                          <td>{{ item.total }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-1"></div>
              </div>
              <!-- signature -->
              <div class="row">
                <div class="col-1"></div>
                <div class="col-10 bg-white">
                  <div class="row">
                    <div class="col-8"></div>
                    <div class="col-4 text-center">
                      <p>{{ note.location }}, {{ note.date }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4 text-center">
                      <p>Supir</p>
                      <img
                        :src="note.signatures[0].supir_signature"
                        alt="tandatangan supir"
                        width="150"
                      />
                      <h5>
                        (<span class="fw-bold">{{
                          note.signatures[0].supir
                        }}</span
                        >)
                      </h5>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-4 text-center">
                      <p>Petugas</p>
                      <img
                        :src="note.signatures[0].petugas_signature"
                        alt="tandatangan petugas"
                        width="150"
                      />
                      <h5>
                        (<span class="fw-bold">{{
                          note.signatures[0].petugas
                        }}</span
                        >)
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-10 bg-white">
                  <div class="row mt-5">
                    <small>Dokument ini dicetak oleh: {{ name }}</small>
                    <small
                      >Dokument ini dicetak pada: {{ now.date }}
                      {{ now.time }}</small
                    >
                    <!-- <div class="col-6">
                    </div> -->
                    <!-- <div class="col-6"></div> -->
                  </div>
                </div>
                <div class="col-1"></div>
              </div>
            </div>
          </div>
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
  props: ["id"],
  data() {
    return {
      note: [],
      name: "",
      now: {},
      romawi: null,
      tahun: null,
      alamat: null,
      noTallySheet: "",
    };
  },
  methods: {
    async exportToPDF() {
      // Get the element to be converted to PDF
      const elementToConvert = document.getElementById("element-to-convert");

      // Use html2canvas to render the element to a canvas
      const canvas = await html2canvas(elementToConvert, {
        scale: 2, // Scale the canvas for higher resolution (adjust as needed)
      });

      // Create a new jsPDF instance
      const pdf = new jsPDF("p", "mm", "a4"); // Set the orientation and paper size

      // Calculate the aspect ratio to fit the content within the PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;
      let imageWidth = pdfWidth;
      let imageHeight = pdfWidth / imageAspectRatio;

      // Check if the height of the rendered canvas is greater than the PDF height
      if (imageHeight > pdfHeight) {
        imageHeight = pdfHeight;
        imageWidth = pdfHeight * imageAspectRatio;
      }

      const marginTop = 20;

      // Add the rendered canvas image to the PDF
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        (pdfWidth - imageWidth) / 2,
        marginTop,
        imageWidth,
        imageHeight
      );

      // Save the PDF file
      // pdf.save(`${this.noTallySheet}.pdf`);
      pdf.save(`${this.noTallySheet}.pdf`);
    },
    getRomanMonth(date) {
      const months = [
        "",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ];

      // Split tanggal menjadi array [dd, mm, yyyy]
      const [day, month, year] = date.split("-");

      // Ambil bulan dalam bentuk angka
      const monthNumber = parseInt(month, 10);
      this.tahun = year;
      // Ubah angka bulan ke dalam angka Romawi
      return months[monthNumber];
    },
    async fetchData() {
      const response = await axios.get(
        `http://localhost:8000/api/auth/note-detail/${this.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.note = response.data.data[0];
      this.romawi = this.getRomanMonth(this.note.date);

      this.noTallySheet = `0${this.id}/TALLYSHEET/${this.romawi}/${this.tahun}`;
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
        date: `${day}-${month}-${year}`,
        time: `${hours}:${minutes}:${seconds}`,
      };
    },
  },
  mounted() {
    this.getCurrentDateTime();
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
        this.name = response.data.name;
        this.alamat = response.data.alamat;

        const token = localStorage.getItem("token");
        const expires_in = localStorage.getItem("expires_in");
        if (!token || !expires_in || new Date() > new Date(expires_in)) {
          // If token is missing or expired, redirect to the home page
          localStorage.removeItem("token");
          localStorage.removeItem("expires_in");
          this.$router.push("/");
        } else if (role !== "user") {
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
<style scoped>
.surat {
  background-color: #ffffff !important;
}
hr {
  border: none;
  height: 3px;
  /* Set the hr color */
  color: #000000 !important; /* old IE */
  background-color: #000000 !important; /* Modern Browsers */
}
#app {
  margin-top: 60px;
  /* text-align: center; */
}
</style>