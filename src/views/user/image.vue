<template>
  <div>
    <button @click="generatePDF">Generate PDF Preview</button>
    <div v-if="pdfPreviewSrc">
      <h4>PDF Preview</h4>
      <iframe :src="pdfPreviewSrc" width="100%" height="500"></iframe>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  data() {
    return {
      pdfPreviewSrc: null,
    };
  },
  methods: {
    async generatePDF() {
      const pdf = new jsPDF();
      const textSpacing = 10;
      const lineHeight = 10;

      pdf.text("Sample PDF with Image", 105, lineHeight * 3, {
        align: "center",
      });

      const imageUrl = "/img/logo.png"; // Ganti dengan path yang sesuai
      const imgWidth = 50; // Lebar gambar
      const imgHeight = 50; // Tinggi gambar

      try {
        const imgResponse = await fetch(imageUrl);
        const imgBlob = await imgResponse.blob();
        const imgDataUrl = URL.createObjectURL(imgBlob);

        const img = new Image();
        img.src = imgDataUrl;

        img.onload = () => {
          pdf.addImage(img, "PNG", textSpacing, lineHeight * 10, imgWidth, imgHeight);
          this.pdfPreviewSrc = pdf.output("datauristring");
        };
      } catch (error) {
        console.error("Error loading image:", error);
      }
    },
  },
};
</script>
