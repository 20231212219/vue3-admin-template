<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>99999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const people = ref('216908')
const charts = ref()

onMounted(() => {
  // Initialize echarts (liquid fill if available, or just a pie/gauge)
  // Since I didn't install echarts-liquidfill, I'll use a basic gauge or just text for now.
  // But wait, I can try to use a bar chart to simulate water ball or just skip liquidfill.
  // I'll use a simple bar chart for now to represent "fullness".

  const myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {
      text: '预约量',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 20,
      },
    },
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4,
          },
        },
        axisLabel: {
          color: 'auto',
          distance: 40,
          fontSize: 20,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} %',
          color: 'auto',
        },
        data: [
          {
            value: 70,
          },
        ],
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 30px;
    }
  }

  .charts {
    width: 100%;
    height: 270px;
  }
}
</style>
