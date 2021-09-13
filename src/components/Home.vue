<template>
  <div id="echartDom">
  </div>
</template>

<script>

import axios from 'axios'
import * as echarts from 'echarts';

export default {
  name: 'Home',
  mounted() {
    axios.get('http://d.10jqka.com.cn/v6/time/hs_002202/defer/last.js').then(res => {
      console.log(res)
    })
    this.originData()
  },
  methods: {
    originData() {
      var chartDom = document.getElementById('echartDom');
      var myChart = echarts.init(chartDom);
      var option;

      function getVirtulData(year) {
          year = year || '2017';
          var date = +echarts.number.parseDate(year + '-01-01');
          var end = +echarts.number.parseDate((+year + 1) + '-01-01');
          var dayTime = 3600 * 24 * 1000;
          var data = [];
          for (var time = date; time < end; time += dayTime) {
              data.push([
                  echarts.format.formatTime('yyyy-MM-dd', time),
                  Math.floor(Math.random() * 10000)
              ]);
          }
          return data;
      }

      option = {
          title: {
              top: 30,
              left: 'center',
              text: '2016年某人每天的步数'
          },
          tooltip: {},
          visualMap: {
              min: 0,
              max: 10000,
              type: 'piecewise',
              orient: 'horizontal',
              left: 'center',
              top: 65
          },
          calendar: {
              top: 120,
              left: 30,
              right: 30,
              cellSize: ['auto', 13],
              range: '2016',
              itemStyle: {
                  borderWidth: 0.5
              },
              yearLabel: {show: false}
          },
          series: {
              type: 'heatmap',
              coordinateSystem: 'calendar',
              data: getVirtulData(2016)
          }
      };

      option && myChart.setOption(option);

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#echartDom {
  width: 100%;
  height: 400px;
}
</style>
