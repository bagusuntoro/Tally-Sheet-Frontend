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
import axios from "axios";

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

      pdf.text("TALLY SHEET", 105, lineHeight * 3, {
        align: "center",
      });

      try {
        const response = await axios.get(
          `http://localhost:8000/api/note-detail/2`
        );
        const apiData = response.data.data[0];

        // Menambahkan teks dalam dua kolom
        const columnWidth = pdf.internal.pageSize.getWidth() / 2; // Lebar kolom
        pdf.text("Lokasi                : " + apiData.location, textSpacing, lineHeight * 7);
        pdf.text("No. Truk            : " + apiData.no_truck,
          columnWidth + textSpacing,
          lineHeight * 7
        );
        pdf.text("Tanggal             : " + apiData.date, textSpacing, lineHeight * 8);
        pdf.text("Supir                 : " + apiData.driver,
          columnWidth + textSpacing,
          lineHeight * 8
        );
        pdf.text("No. Container    : " + apiData.no_container,
          textSpacing,
          lineHeight * 9
        );
        pdf.text("No. HP              : " + apiData.telp,
          columnWidth + textSpacing,
          lineHeight * 9
        );
        pdf.text("No. Seal            : " + apiData.no_seal, textSpacing, lineHeight * 10);
        pdf.text("Tujuan               : " + apiData.destination,
          columnWidth + textSpacing,
          lineHeight * 10
        );

        const tableData = []; // Buat array untuk menyimpan data tabel

        for (let i = 0; i < apiData.tumpukans.length; i++) {
          tableData.push([
            apiData.tumpukans[i].barang.jenis_barang,
            apiData.tumpukans[i].tumpukan_1,
            apiData.tumpukans[i].tumpukan_2,
            apiData.tumpukans[i].tumpukan_3,
            apiData.tumpukans[i].tumpukan_4,
            apiData.tumpukans[i].tumpukan_5,
            apiData.tumpukans[i].tumpukan_6,
            apiData.tumpukans[i].tumpukan_7,
            apiData.tumpukans[i].tumpukan_8,
            apiData.tumpukans[i].tumpukan_9,
            apiData.tumpukans[i].tumpukan_10,
            apiData.tumpukans[i].total,
          ]);
        }

        pdf.autoTable({ 
          head: [
            [
              "Barang",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "Total",
            ],
          ],
          body: tableData, // Gunakan array yang telah diisi dengan data
          startY: lineHeight * 12,
          theme: "grid",
          styles: { overflow: "linebreak" },
        });

        // petugas
        pdf.text(
          String(apiData.location)+', '+String(apiData.date),
          pdf.internal.pageSize.getWidth() - textSpacing,
          lineHeight * 16,
          {
            align: "right",
          }
        );
        pdf.text(
          "Petugas",
          pdf.internal.pageSize.getWidth() - textSpacing,
          lineHeight * 17,
          {
            align: "right",
          }
        );
        pdf.text(
          String(apiData.signatures[0].petugas),
          pdf.internal.pageSize.getWidth() - textSpacing,
          lineHeight * 20,
          {
            align: "right",
          }
        );

        // Text on the left side
        pdf.text(
          "supir",
          textSpacing,
          lineHeight * 17
        );
        pdf.text(
          String(apiData.signatures[0].supir),
          textSpacing,
          lineHeight * 20
        );
        // image

        this.pdfPreviewSrc = pdf.output("datauristring");
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },
  },
};
</script>
