<script setup>
import Signature from '../../components/Signature.vue'
import Tumpukan from '../../components/Tumpukan.vue'
</script>

<template>
  <div>
    <h1 class="text-center customMargin">Input Data Note</h1>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="headerNote">
            <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-sm-10">
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
                                <label for="container" class="form-label">Nomor Container</label>
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
                        <div class="col-sm-6">
                            <div class="row mt-3">
                                <div class="row">
                                    <div class="col-sm-6">
                                    <router-link to="/admin-note" class="btn btn-outline-danger mb-5"
                                        >Back</router-link
                                    >
                                    </div>
                                    <div class="col-sm-6">
                                    <button type="submit" class="btn btn-outline-primary float-end">
                                        Submit
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="mb-3">
                                <label for="destination" class="form-label">Destination</label>
                                <input
                                type="text"
                                class="form-control"
                                id="destination"
                                placeholder="input nomor destination"
                                v-model="form.destination"
                                />
                            </div>
                        </div>
                        <div class="col-sm-6">
                            
                        </div>
                    </div>
                </div>
                <div class="col-sm-1"></div>
            </div>
        </div>

    </form>

  </div>
</template>
<script>
import axios from 'axios';
import Signature from '../../components/Signature.vue';
export default {
  components: { Signature },
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
            id:null
        };
    },
    methods: {
        handleSubmit() {
        let formData = new FormData();
        formData.append("location", this.form.location);
        formData.append("date", this.form.date);
        formData.append("no_container", this.form.no_container);
        formData.append("no_seal", this.form.no_seal);
        formData.append("destination", this.form.destination);
        formData.append("no_truck", this.form.no_truck);
        formData.append("driver", this.form.driver);
        formData.append("telp", this.form.telp);
        console.log(formData)
        axios.post("http://localhost:8080/api/create-note/", formData)
          .then((response) => {
              this.id = response.data.data
              console.log(response);
        });
        this.form.jenis_barang = "";
        this.showAlert();
        },

        showAlert() {
        // Use sweetalert2
        this.$swal('Data Berhasil di inputkan!!').then(() => {
            // Redirect to a specific page
            this.$router.push(`admin-input-tumpukan`);
        });
        }

    },
    created() {
        // const token = localStorage.getItem("token");
        // const expires_in = localStorage.getItem("expires_in");

        // // console.log(new Date());
        // // console.log(new Date(expires_in));

        // if (!token || !expires_in || new Date() > new Date(expires_in)) {
        //   // Jika token tidak ada atau kadaluarsa, redirect ke halaman utama
        //   localStorage.removeItem("token");
        //   localStorage.removeItem("expires_in");
        //   this.$router.push("/");
        //   return;
        // }
    },
};
</script>
  
<style scoped>
    .customMargin {
    margin-top: 10px;
    margin-bottom: 50px;
    }
</style>