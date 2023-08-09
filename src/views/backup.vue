<template>
    <div>
		<ul v-for="item in note" :key="item.id">
			<li>{{item.kodeData}}</li>
			<li>{{item.namaData}}</li>
		</ul>
	</div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      note: [],
      user_id: "",
      role: null,
    };
  },
  methods: {
    async data() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lokasi`);
        this.note = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.data();
  },
};
</script>