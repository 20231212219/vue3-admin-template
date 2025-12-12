<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好呀{{ userStore.username }}</h3>
        <p class="subtitle">硅谷甄选运营平台</p>
      </div>
    </div>
  </el-card>
  <div class="data-row">
    <el-card class="data-card">
      <div class="data-content">
        <div class="data-title">访问量</div>
        <div class="data-number">12,345</div>
        <div class="data-desc">日同比 12% <span class="up">↑</span></div>
      </div>
    </el-card>
    <el-card class="data-card">
      <div class="data-content">
        <div class="data-title">销售额</div>
        <div class="data-number">¥88,888</div>
        <div class="data-desc">周同比 5% <span class="down">↓</span></div>
      </div>
    </el-card>
    <el-card class="data-card">
      <div class="data-content">
        <div class="data-title">订单数</div>
        <div class="data-number">1,234</div>
        <div class="data-desc">月同比 20% <span class="up">↑</span></div>
      </div>
    </el-card>
    <el-card class="data-card">
      <div class="data-content">
        <div class="data-title">用户数</div>
        <div class="data-number">5,678</div>
        <div class="data-desc">日新增 120</div>
      </div>
    </el-card>
  </div>
  <div class="dashboard-content">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
            </div>
          </template>
          <div ref="salesChart" style="height: 350px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="activity-card">
          <template #header>
            <div class="card-header">
              <span>最新动态</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item timestamp="2023/12/12" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2023/12/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/12/11" placement="top">
              <el-card>
                <h4>修复 首页 Bug</h4>
                <p>李小龙 提交于 2023/12/11 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2023/12/10" placement="top">
              <el-card>
                <h4>新增 数据大屏</h4>
                <p>张三 提交于 2023/12/10 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
import * as echarts from 'echarts'

const userStore = useUserStore()
const salesChart = ref()

onMounted(() => {
  const myChart = echarts.init(salesChart.value)
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '销售额',
        type: 'line',
        stack: 'Total',
        smooth: true,
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '访问量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}
.data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .data-card {
    width: 24%;
    .data-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .data-title {
        font-size: 16px;
        color: #999;
      }
      .data-number {
        font-size: 24px;
        font-weight: bold;
        margin: 10px 0;
      }
      .data-desc {
        font-size: 14px;
        color: #666;
        .up {
          color: red;
        }
        .down {
          color: green;
        }
      }
    }
  }
}
.dashboard-content {
  margin-top: 20px;
  .chart-card,
  .activity-card {
    margin-bottom: 20px;
  }
}
</style>
