<template>
  <div grid-head-center-foot>
    <SysHeader h-14 bg-deep-1 z-11 shadow />
    <!-- :style="'clip-path: polygon(0 0, 100% 0, 100% 100%, 0 '+clipPath[0]+'%)'"  -->
    <main bg-deep-1 px-1 py-2 >
      <router-view ></router-view>
    </main>
    <SysFooter mx-auto w-full p-2 lg:py-2 bg-deep-0 z-11 />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { SysSettingStore } from '@/stores/sys'
import router from '@/router';
const { sysStyle } = storeToRefs(SysSettingStore())
sysStyle.value.headShow = true
const dragRef = ref();
const addPage = () => {
  // 拖拽中，不执行后续操作
  if (dragRef.value.$el.isMoving) return
  // 导航到 /blog/blog-new
  router.push('/blog/blog-new')
}
</script>
<style scoped></style>
