import { Bar } from "vue-chartjs";
// extend chartjs class
export default {
  mixins: [Bar],
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
