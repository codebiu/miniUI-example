<template>
    <div>
        <div ref="echartDom" w-full h-full></div>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 知识图谱预览页面
 */
import * as echarts from 'echarts';
import { api } from "@/assets/api";
const echartDom = ref<HTMLElement>()
let myChart: echarts.ECharts
// 在onMounted阶段进行初始化
onMounted(async () => {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(echartDom.value!);
    // const graph: any = await getGraph()

    const graph = {
        "categories": [
            {
                "name": "File,Directory"
            },
            {
                "name": "File"
            }
        ],
        "nodes": [
            {
                "id": 305,
                "category": "File,Directory",
                "name": "java_test3",
                "properties": {
                    "fileName": "D:/project/dhc2024/llm_ai4se_repo2kg_java_backend/temp/java_test3"
                }
            },
            {
                "id": 363,
                "category": "File",
                "name": "Neo4jWriteDbHandler4SetMethod.java",
                "properties": {
                    "fileName": "/java_test3/src/jacg/neo4j/writedb/Neo4jWriteDbHandler4SetMethod.java"
                }
            }
        ],
        "links": [
            {
                "id": 595,
                "name": "CONTAINS",
                "source": "305",
                "target": "363"
            }
        ]
    }


    graph.links.forEach((link: any) => {
        link.label = {
            show: true
        }
        link.id = link.name
        link.source = link.source.toString()
        link.target = link.target.toString()
    })

    // graph.nodes.forEach((node: any) => {
    //   node.value= node.properties.fileName
    // })
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
                    edgeLength: 200,// 长度
                    repulsion: 10,// 斥力
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
            }
        ]
    };

    myChart.setOption(option);

})



// api.
const getGraph = async () => {
    const response = await fetch(`${api.graph}MATCH p=()-[r:CONTAINS]->() RETURN p LIMIT 20`);
    const data = await response.json();
    console.log(data)
    return data
}

</script>
<style scoped></style>
  
  