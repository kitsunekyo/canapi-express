<template>
  <div class="site-wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <div class="navbar-logo d-inline-block align-top">
            <i class="fas fa-leaf"></i>
          </div>
          CannaPi
        </a>
      </div>
    </nav>
    <div class="site-content container">
      <div class="row">
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Status</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Actions</h5>
              <p class="card-text">
                <canvas ref="chart" id="myChart" width="400" height="200"></canvas>
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "./../../../../node_modules/chart.js";

export default {
  data: function() {
    return {
      name: "Alex",
      chart: null
    };
  },
  mounted: function() {
    this.chart = new Chart(this.$refs.chart, {
      type: "line",
      data: [
        {
          x: 10,
          y: 20
        },
        {
          x: 15,
          y: 10
        }
      ],
      options: {}
    });
  }
};
</script>
<style lang="scss">

</style>


