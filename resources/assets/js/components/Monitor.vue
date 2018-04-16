<template>
  <div class="monitor">
    <div class="loader" v-if="loading">
      <div class="loader-bg"></div>
      <div class="loader-content">
        <i class="fas fa-spinner fa-pulse"></i>
        <div class="loader-text">please wait</div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <div class="monitor-item">
          <div class="monitor-item__title">
            <i class="fas fa-thermometer"></i> Temperature</div>
          <div class="monitor-item__content">{{ status.air_temperature }}°C</div>
        </div>
      </div>
      <div class="col">
        <div class="monitor-item">
          <div class="monitor-item__title">
            <i class="fas fa-cloud"></i> Humidity</div>
          <div class="monitor-item__content">{{ status.air_humidity }}%</div>
        </div>
      </div>
      <div class="col">
        <div class="monitor-item">
          <div class="monitor-item__title">
            <i class="fas fa-tint"></i> Soil</div>
          <div class="monitor-item__content">Wet</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <div class="btn btn-info btn-xs" @click="getStatus"><i class="fas fa-sync-alt"></i> Refresh</div>
          <div class="updated">Last Updated <br />{{ lastUpdated.format('HH:mm:ss - DD/MM/YY') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

import ENV from './../../../../ENV';

export default {
  data() {
    return {
      loading: true,
      status: {
        air_temperature: 0,
        air_humidity: 0,
      },
      lastUpdated: moment(),
    };
  },
  methods: {
    getStatus() {
      this.loading = true;
      axios.get(`${ENV.SERVER.API}/api/status`).then(response => {
        this.status = response.data;
        this.lastUpdated = new moment();
        this.loading = false;
      });
    }
  },
  mounted() {
    this.getStatus();
  }
};
</script>
<style lang="scss">
.updated {
  font-size: 0.8rem;
  color: #b1b1b1;
  font-style: italic;
  margin-top: 1rem;
}
.monitor-item__content {
  line-height: 1;
  font-size: 2.5rem;
  color: #9ecc54;
  font-weight: 700;
}
.col:not(:last-child)>.monitor-item {
  border-right: solid 1px #e2e2e2;
}
</style>

