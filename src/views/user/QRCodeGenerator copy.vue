<template>
  <div>
    <form>
        <input type="text" v-model="barcodeValue" /><br />
    </form>
    <qrcode-vue 
        :value="barcodeValue" 
        :size="300" 
        level="H"
        tag="svg"
    >
        <template v-slot:logo>
         <img src="/img/logo.png" alt="Logo" />
        </template>
    </qrcode-vue>

    <button type="button" @click="show()">Show</button>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      barcodeValue: null,
    };
  },
  components: {
    QrcodeVue
  },
  methods: {
    show() {
        alert(this.barcodeValue)
    }
  }
};
</script>
