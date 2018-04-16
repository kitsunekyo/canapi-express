<template>
  <div class="pump">
    <div class="loader" v-if="loading">
      <div class="loader-bg"></div>
      <div class="loader-content">
        <i class="fas fa-spinner fa-pulse"></i>
        <div class="loader-text">please wait</div>
      </div>
    </div>
    <div class="status mb-2">
      <div class="status-icon" :class="{ 'status-icon--active' : status === 'on'}">
        <i class="fas fa-power-off ui" @click="togglePump"></i><br />
      </div>
      <span>{{ status }}</span>
    </div>
    <div class="btn btn-info btn-xs" @click="getStatus"><i class="fas fa-sync-alt"></i> Refresh</div>
    <div class="btn btn-warning btn-xs" @click="water"><i class="fas fa-tint"></i> Water Manually</div>
    <div class="updated" v-if="lastUpdated !== null">Last Updated <br />{{ lastUpdated.format('HH:mm:ss - DD/MM/YY') }}</div>
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
      status: "unknown",
      lastUpdated: null,
    };
  },
  methods: {
    getStatus() {
      axios.get(`${ENV.SERVER.API}/api/pump/status`).then(
        res => {
          this.status = res.data;
          this.lastUpdated = new moment();
          this.loading = false;
        },
        err => {
          //
        }
      );
    },
    water() {
      this.loading = true;
      axios.post(`${ENV.SERVER.API}/api/pump/water`).then(
        res => {
          try {
            setTimeout(()=>{
              this.watering = false;
              this.loading = false;
            }, res.data.data.timeout);
          } catch (e) {
            //
          }
        },
        err => {
          //
        }
      );
    },
    togglePump() {
      console.log("toggle");
      if (this.status === "off") {
        this.pumpOn();
      } else {
        this.pumpOff();
      }
    },
    pumpOn() {
      axios.post(`${ENV.SERVER.API}/api/pump/on`).then(
        res => {
          this.status = "on";
        },
        err => {
          //
        }
      );
    },
    pumpOff() {
      axios.post(`${ENV.SERVER.API}/api/pump/off`).then(
        res => {
          this.status = "off";
        },
        err => {
          //
        }
      );
    }
  },
  mounted() {
    this.getStatus();
  }
};
</script>
<style lang="scss">
.pump {
  text-align: center;
}
.status {
  color: #ddd;
  text-align: center;
  &-icon {
    font-size: 3rem;
    color: #ddd;
    transition: all 0.25s ease;
    &--active {
      color: #9ecc54;
    }
    &:hover {
      color: #888;
      &.status-icon--active {
        color: #c1e28b;
      }
    }
  }
}
.updated {
  font-size: 0.8rem;
  color: #b1b1b1;
  font-style: italic;
  margin-top: 1rem;
}
</style>
