<template>
  <!-- 场景-->
  <div w-200 h-200 overflow-hidden relative bg-blue>
    <div id="canvasP" w-full h-full absolute>
      <canvas id="glDom" w-full h-full></canvas>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import {
  Scene,
} from 'babylonjs'
// img
import earth_0 from '@/assets/img/earth_0.png'
import { BaseScene } from './babylon-start-page/BaseScene'
let scene: Scene
let word: BaseScene
// vue
onMounted(() => {
  initMap()
})
onBeforeUnmount(() => {
  scene && scene.dispose()
})
const initMap = () => {
  word = new BaseScene('glDom')
  word.observeInit('canvasP')
}
</script>

<style scoped></style>
