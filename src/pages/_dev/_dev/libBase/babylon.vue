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
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  PointLight,
  MeshBuilder,
  Color3,
  Color4,
  StandardMaterial,
  Texture,
  ArcRotateCamera
} from 'babylonjs'
// img
import earth_0 from '@/assets/img/earth_0.png'
import { BaseScene } from '@/views/_dev/libBase/babylon-start-page/BaseScene'
let scene: Scene
let engine: Engine
// let camera: FreeCamera
let camera: ArcRotateCamera
let word: BaseScene
// vue
onMounted(() => {
  initMap()
  // window.$ObjLargeTemp.set('scene', scene)
})
onBeforeUnmount(() => {
  scene && scene.dispose()
  // window.$ObjLargeTemp.delete('scene')
})
const initMap = () => {
  word = new BaseScene('glDom')
  word.observeInit('canvasP')
}
</script>

<style scoped></style>
