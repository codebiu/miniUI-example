<template>
  <!-- 场景-->
  <div w-200 h-200 overflow-hidden relative bg-blue>
    <div id="canvasP" w-full h-full absolute>
      <canvas id="glDom1" w-full h-full></canvas>
    </div>
  </div>
</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :bb_chart_graph.vue
 * @Time         :2025/03/26 23:33:47
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :charts
 * @summary      :charts graph
 * @description  :graph 图表
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { onMounted, onBeforeUnmount } from 'vue'
import {
  Scene,
} from 'babylonjs'
import { StatsManager } from "@/components/libUI/utils/gl/StatsManager.ts"
import { GraphScene } from './GraphScene'
let scene: Scene
let word: GraphScene
let statsScene: any
const statsManager = new StatsManager();
// vue
onMounted(() => {
  initMap()
  setStats()
})
onBeforeUnmount(() => {
  scene && scene.dispose()
})
const initMap = async () => {
  word = new GraphScene('glDom')
  word.observeInit('canvasP')
}

/**
  * 设置stats监测帧率
  */
const setStats = () => {
  statsScene = statsManager.add('glDom');
  statsScene.dom.style.top = '50px';

};

</script>
<style scoped></style>