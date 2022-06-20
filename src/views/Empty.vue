<template>
  <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      myChart: {},
      seriesData: [[]],
      myChartStyle: { float: "left", width: "100%", height: "600px" } //图表样式
    };
  },
  mounted() {
    this.initDate(); //数据初始化
    this.initEcharts();
    this.timer = setInterval(this.getData, 3000);//定时器，每3秒执行一次
  },
  methods: {
    initDate() {
      for (let i = 0; i < 1000; i++) {
        this.seriesData[i] = [i, i * i];
      }
    },
    initEcharts() {
      const optionFree = {
        xAxis: {
            type: "time",
            splitNumber:15,
            axisLabel: {
                show: true,
                interval: 1,
                // formatter:'{HH}:{mm}:{ss}'

                }
            },
        yAxis: {},
        //Animation:true,
        //animationDuration:20000,//2秒渲染一次
        series: [
          {
            data: this.seriesData,
            type: "line",
            smooth: true,
            endLabel:{
                show:true
            }//折线最后展示数值
          }
        ],
        tooltip : {
            trigger: 'item',

        }
      };
      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(optionFree);
      
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  }
};
</script>