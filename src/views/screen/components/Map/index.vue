<template>
  <div class="box4" ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'

const map = ref()

onMounted(async () => {
  const myChart = echarts.init(map.value)

  try {
    // Fetch China map data
    // Using a public CDN for China map JSON
    const response = await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
    const china = response.data

    echarts.registerMap('china', china)

    myChart.setOption({
      geo: {
        map: 'china',
        roam: true, // Allow zooming and panning
        top: 150,
        zoom: 1.2,
        label: {
          show: true,
          color: 'white',
          fontSize: 10,
        },
        itemStyle: {
          areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#004c8c', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#001836', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          borderColor: '#007afe',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10,
        },
        emphasis: {
          itemStyle: {
            areaColor: '#007afe',
            shadowBlur: 20,
            borderWidth: 0,
          },
          label: {
            color: '#fff',
          },
        },
      },
      series: [
        {
          type: 'lines',
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3,
          },
          lineStyle: {
            color: '#fff',
            width: 0,
            curveness: 0.2,
          },
          data: [
            {
              coords: [
                [116.405285, 39.904989], // Beijing
                [121.472644, 31.231706], // Shanghai
              ],
            },
            {
              coords: [
                [116.405285, 39.904989], // Beijing
                [113.280637, 23.125178], // Guangzhou
              ],
            },
            {
              coords: [
                [116.405285, 39.904989], // Beijing
                [104.065735, 30.659462], // Chengdu
              ],
            },
            {
              coords: [
                [116.405285, 39.904989], // Beijing
                [87.617733, 43.792818], // Urumqi
              ],
            },
          ],
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            brushType: 'stroke',
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            color: '#fff',
          },
          symbolSize: 10,
          itemStyle: {
            color: '#f4e925',
          },
          data: [
            { name: '北京', value: [116.405285, 39.904989] },
            { name: '上海', value: [121.472644, 31.231706] },
            { name: '广州', value: [113.280637, 23.125178] },
            { name: '成都', value: [104.065735, 30.659462] },
            { name: '乌鲁木齐', value: [87.617733, 43.792818] },
          ],
        },
      ],
    })
  } catch (error) {
    console.error('Failed to load map data:', error)
    myChart.setOption({
      title: {
        text: '地图数据加载失败',
        left: 'center',
        top: 'center',
        textStyle: { color: '#fff' },
      },
    })
  }
})
</script>

<style scoped lang="scss">
.box4 {
  width: 100%;
  height: 100%;
}
</style>
