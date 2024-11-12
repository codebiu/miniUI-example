<template>
  <div w-full h-full>
    <!-- threejs 场景-->
    <canvas w-full h-full id="glDom" class="glDom"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
// vues
onMounted(() => {
  initMap()
})
onBeforeUnmount(() => {
  scene.clear()
  renderer.dispose()
})

const initMap = () => {
  const canvas = document.getElementById('glDom') as HTMLCanvasElement // 得到canvas对象的引用
  scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  })
  // 设置renderer的样式
  // renderer.setSize(canvas.width, canvas.height)
  // 添加mesh和纹理
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const cube = new THREE.Mesh(geometry, material)
  // scene.add(cube)
  camera.position.z = 5
  cube.rotation.x += 0.5
  cube.rotation.y += 0.5
  renderer.render(scene, camera)
}

// runDemo();
</script>

<style scoped>
</style>
