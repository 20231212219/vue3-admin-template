<template>
  <div class="box6">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const charts = ref()

onMounted(() => {
  const myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {
      show: true,
      text: '景区排行',
      left: '40%',
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20,
      },
      subtext: '各大景区排行',
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 16,
      },
    },
    xAxis: {
      type: 'category',
      data: ['北京', '上海', '广州', '深圳', '杭州', '南京', '武汉'],
      axisLabel: {
        color: 'white',
      },
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        label: {
          show: true,
          position: 'insideTop',
          color: 'yellowgreen',
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: function (params: any) {
            const arr = ['red', 'orange', 'yellow', 'green', 'purple', 'hotpink', 'skyblue']
            return arr[params.dataIndex]
          },
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 70],
        smooth: true,
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
  })
})
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
