<template>
    <div class="probes-log">
        <canvas ref="chart" width="400" height="200"></canvas>
    </div>
</template>
<script>
import Chart from "./../../../../node_modules/chart.js";
import ENV from './../../../../ENV';
import axios from "axios";

export default {
  data() {
    return {
      humidityData: null,
      temperatureData: null,
    };
  },
  methods: {
    getProbes() {
      const chartOptions = {
        responsive: true,
        title: {
          display: true,
          text: "Air Quality"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },

        scales: {
          xAxes: [
            {
              time: {
                min: new Date("2018-03-14"),
                max: new Date("2018-04-14"),
              },
              type: "time",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Date"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "°C"
              }
            }
          ]
        }
      };
      axios.get(`${ENV.SERVER.API}/api/probes`).then(
        response => {
          this.humidityData = response.data.map((v, i) => {
            return {
              x: new Date(v.timestamp),
              y: v.air_humidity,
            };
          });
          this.temperatureData = response.data.map((v, i) => {
            return {
              x: new Date(v.timestamp),
              y: v.air_temperature,
            }
          });
          this.chart = new Chart(this.$refs.chart, {
            type: "line",
            data: {
              datasets: [
                {
                  label: "Humidity",
                  borderColor: "#48c5db",
                  data: this.humidityData.sort((a,b) => {
                    return a.x - b.x;
                  }),
                  lineTension: 0,
                },
                {
                  label: "Temperature",
                  borderColor: "#8be5f4",
                  data: this.temperatureData.sort((a,b) => {
                    return a.x - b.x;
                  }),
                  lineTension: 0,
                }
              ]
            },
            options: chartOptions
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    this.getProbes();
  }
};
</script>

