<template>
  <div id="wrap">
    <div class="left">
      <div id="echartDom"></div>
      <div id="echartDom1"></div>
    </div>
    <div class="right">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";

import timeInfo from './timestamp.js'
export default {
  name: "Home",
  data() {
    return {
      // baseInfo: [{
      //     name: '换手率'
      // },
      // {
      //     name: '昨收'
      // }],
      timeInfo: timeInfo,
      avg_price: [],
      current: [],
      volume: [],
    };
  },
  mounted() {
    this.getInfo()
    // setInterval( () => {
      this.getInfo()
    // }, 5000);
  },
  methods: {
    getInfo() {
      axios.get("http://localhost:3000/users").then((res) => {
        this.avg_price = [];
        this.current = [];
        this.volume = [];

        var originInfo = [];
        var recordCurrent = "";
        if (res.status == 200 && res.data && res.data.data) {
          originInfo = res.data.data;
        }
        originInfo.items.forEach((item, index) => {
          this.current.push(item.current); // 股价
          this.avg_price.push(item.avg_price); // 平均价
          
          // 成交量
          recordCurrent =
            index !== 0
              ? originInfo.items[index - 1].current
              : originInfo.items[0].current;
          if (index === 0 || item.current < recordCurrent) {
            this.volume.push({
              value: item.volume,
              itemStyle: {
                color: "green",
              },
            });
          } else {
            this.volume.push({
              value: item.volume,
              itemStyle: {
                color: "red",
              },
            });
          }

          // 基础信息
          // this,baseInfo = {
          //     name: ,
          //     value: ,
          // }
        });
        this.originData();
      });
    },
    originData() {
      var chartDom = document.getElementById("echartDom");
      var chartDom1 = document.getElementById("echartDom1");
      var myChart = echarts.init(chartDom);
      var myChart1 = echarts.init(chartDom1);
      var option = {
        xAxis: [
          {
            type: "category",
            data: this.timeInfo,
          },
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
              position: 'left',
              axisLine: {
                show: true,
              } 
          },
          {
            type: "value",
            scale: true,
             position: 'right',
             axisLine: {
                show: true,
              }
          }
        ],
        series: [
          {
            data: this.current,
            type: "line",
            smooth: true,
            symbol: "none",
          },
          {
            data: this.avg_price,
            type: "line",
            smooth: true,
            symbol: "none",
            
          },
          {
            data: [0,1,2,3,4,5,6,7,8,9],
            type: "line",
            smooth: true,
            symbol: "none",
             yAxisIndex : 1,
          },
        ],
      };

      var option1 = {
        // xAxis: [
        //   {
        //     type: "category",
        //     data: this.timeInfo,
        //   },
        // ],
        // yAxis: [
        //   {
        //     type: "value",
        //   },
        // ],
        // series: [
        //   {
        //     data: this.volume,
        //     type: "bar",
        //   },
        // ],
      };

      option && myChart.setOption(option);
      option1 && myChart1.setOption(option1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrap {
  width: 100%;
  height: 600px;
}
#echartDom {
  width: 100%;
  height: 400px;
}
#echartDom1 {
  width: 100%;
  height: 200px;
}
.left {
  width: 50%;
}
.right {
  width: 50%;
}
</style>
