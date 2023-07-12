<template>
  <div>
    <h1>Detail Note</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <p>Location: {{ note.location }}</p>
      <p>Date: {{ note.date }}</p>
      <p>No Container: {{ note.no_container }}</p>
      <p>No Seal: {{ note.no_seal }}</p>
      <p>Destination: {{ note.destination }}</p>
      <p>No Truck: {{ note.no_truck }}</p>
      <p>Driver: {{ note.driver }}</p>
      <p>Telp: {{ note.telp }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      isLoading: true,
      note: {},
    };
  },
  mounted() {
    this.fetchNote();
  },
  methods: {
    fetchNote() {
      // Ganti URL API dengan URL yang sesuai
      const apiUrl = `http://localhost:8080/api/note/${this.id}`;

      // Lakukan permintaan HTTP GET ke API
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          this.note = data.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
        });
    },
  },
};
</script>
