<template>
  <div class="test">
    <div>平均值: {{average}}</div>
    <button @click="update">加载更多</button>
    <div class="list" v-for="item in dataList" :key="item.id">
      <div class="item-id">id:{{item.id}}</div>
      <div class="item-data">data:{{item.data}}</div>
      <div class="item-time">{{formattedTime(item.time)}}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
export default {
  name: "test",
  data() {
    return {
      dataList: [],
      average: "",
      isUpdating: false
    };
  },
  computed: {
    ...mapGetters(["getData", "getAverage"]),
   /**
    * @param {Date} time
    */
    formattedTime:()=> (time)=> '' + time.getFullYear() + (time.getMonth()+'').padStart(2,0) + time.getDate()
  },
  methods: {
    update() {
      if (this.isUpdating) return;
      this.isUpdating = true;
      this.$store.dispatch("getDataCall").then(() => {
        this.isUpdating = false;
      });
    }
  },
  created() {
    this.update();
  },
  watch: {
    getData(val) {
      this.dataList = val;
    },
    getAverage(val) {
      this.average = val;
    }
  }
};
</script>

<style scoped lang="less">
.test {
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding:.5rem;
    margin-bottom: .5rem;
    border-bottom:1px #d7d7d7 dashed;
    div {
      height: 2rem;
      line-height: 2rem;
      margin: 0 auto;
      &:last-child {
        width: 100%;
      }
    }
    .item-time{
      color:#aaa;
    }
  }
  button {
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: blue;
    padding: 10px;
    font-size: 15px;
    color: white;
    width: 100%;
  }
}
</style>
