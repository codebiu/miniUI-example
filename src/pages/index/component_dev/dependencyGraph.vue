<template>
  <!-- 依赖图 -->
   <!-- MATCH path = ()-[:DEPENDS_ON*]->() RETURN path -->
  <div w-full relative>
    <div ref="echartDom" w-full h-full absolute></div>
  </div>
</template>
<script setup lang="ts">
/**
 * @description: 知识图谱预览页面
 */
 import * as echarts from 'echarts';
import { api } from "@/assets/api";
const query_cypher = 'MATCH path = ()-[:DEPENDS_ON*]->() RETURN path LIMIT 100'
const echartDom = ref<HTMLElement>()
let myChart: echarts.ECharts
// 在onMounted阶段进行初始化
onMounted(async () => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(echartDom.value!);
  const graph: any = await getGraph()
  graph.links.forEach((link: any) => {
    link.label = {
      // show: true
    }
    link.id = link.name
    link.source = link.source.toString()
    link.target = link.target.toString()
    // link.lineStyle = {
    //         curveness: 0.05
    //       }
  })

  graph.nodes.forEach((node: any) => {
    node.name= node.properties.fileName.split('/').pop()
  })
  const option = {
    name: 'test',
    // 标题
    legend: [
      {
        data: graph.categories.map((a: { name: any; }) => {
          return a.name;
        })
      }
    ],
    tooltip: {
      show: true,
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          return `
          id：${params.data.id}<br/>
          文件名：${params.data.name}<br/>
          类型：${params.data.category}<br/>
          路径：${params.data.properties.fileName}`
        } else {
          return `
          关系：${params.data.name}<br/>
          ${params.data.source} -> ${params.data.target}`
        }
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: graph.nodes,
        categories: graph.categories,
        links: graph.links,
        // 节点标签
        label: {
          show: true,
          position: 'right'
        },
        // 节点大小
        symbolSize: 30,
        // 关系线设置
        force: {
          edgeLength: 150,// 长度
          repulsion: 500,// 斥力
          gravity: 0// 引力
        },
        lineStyle: {
          opacity: 0.9,
          width: 2,
          //  color: 'target',
          color: 'source',
          curveness: 0, //弯曲
        },
        // 可拖动节点
        draggable: true,
        // 缩放与拖拽
        roam: true,
        // 节点标签
        labelLayout: {
          // 标签压盖处理
          hideOverlap: true
        },
        // 关系线
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
      }
    ]
  };

  myChart.setOption(option);

})



// api.
const getGraph = async () => {
  const response = await fetch(`${api.graph}${query_cypher}`);
  const data = await response.json();
  console.log(data)
  return data
}

</script>
<style scoped></style>


