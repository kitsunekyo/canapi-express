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
        <div class="col-12 mb-4">
          <div class="card">
            <div class="card-header">
              Plant Monitor
            </div>
            <div class="card-body">
              <div class="card-text">
                <monitor></monitor>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              History
            </div>
            <div class="card-body">
              <p class="card-text">
                <probes-log></probes-log>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import probesLog from './ProbesLog.vue';
import monitor from './Monitor.vue';

export default {
  data: function() {
    return {
      name: "Alex",
    };
  },
  components: {
    probesLog,
    monitor,
  },
  mounted: function() {
  }
};
</script>
<style lang="scss">

</style>


