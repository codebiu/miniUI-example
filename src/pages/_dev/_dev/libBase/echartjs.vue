<template>
  <div ref="echartDom" w-200px h-100px></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';

const echartDom = ref<HTMLElement>()
let myChart: echarts.ECharts
// 在onMounted阶段进行初始化
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(echartDom.value!);

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };

  // 绘制图表
  option && myChart.setOption(option)
})
</script>
