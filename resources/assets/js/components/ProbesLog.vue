<template>
    <div class="probes-log">
        <div class="row row-eq-height">
            <div class="col-12">
                <canvas ref="air_temperature_chart" width="400" height="200"></canvas>
            </div>
            <div class="col-12">
                <canvas ref="air_humidity_chart" width="400" height="200"></canvas>
            </div>
            <div class="col-12">
                <canvas ref="soil_chart" width="400" height="200"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
import Chart from "./../../../../node_modules/chart.js";
import CONFIG from "./../../../../env.config";
import axios from "axios";

export default {
  data() {
    return {
      humidityData: null,
      temperatureData: null,
      soilData: null,
    };
  },
  methods: {
    getProbes() {
      axios.get(`${CONFIG.SERVER.API}/api/probes`).then(
        response => {
          this.humidityData = response.data.map((v, i) => {
            return {
              x: new Date(v.timestamp),
              y: v.air_humidity
            };
          });
          this.temperatureData = response.data.map((v, i) => {
            return {
              x: new Date(v.timestamp),
              y: v.air_temperature
            };
          });
          this.soilData = response.data.map((v, i) => {
            return {
              x: new Date(v.timestamp),
              y: v.soil_status
            };
          });
          this.init_chart_air_temperature();
          this.init_chart_air_humidity();
          this.init_chart_soil_status();
        },
        err => {
          console.log(err);
        }
      );
    },
    init_chart_air_temperature() {
      this.chart = new Chart(this.$refs.air_temperature_chart, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Temperature",
              borderColor: "#48c5db",
              data: this.temperatureData.sort((a, b) => {
                return a.x - b.x;
              }),
              lineTension: 0
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Air Temperature"
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
                time: {},
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
        }
      });
    },
    init_chart_air_humidity() {
      this.chart = new Chart(this.$refs.air_humidity_chart, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Humidity",
              borderColor: "#48c5db",
              data: this.humidityData.sort((a, b) => {
                return a.x - b.x;
              }),
              lineTension: 0
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Air Humidity"
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
                time: {},
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
                  labelString: "%"
                }
              }
            ]
          }
        }
      });
    },
    init_chart_soil_status() {
      this.chart = new Chart(this.$refs.soil_chart, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Dry / Wet",
              borderColor: "#48c5db",
              data: this.humidityData.sort((a, b) => {
                return a.x - b.x;
              }),
              lineTension: 0
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Soil Status"
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
                time: {},
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
                display: false,
                scaleLabel: {
                  display: true,
                  labelString: "%"
                }
              }
            ]
          }
        }
      });
    },
  },
  mounted() {
    this.getProbes();
  }
};
</script>