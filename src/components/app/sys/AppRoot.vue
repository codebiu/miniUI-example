<template>
   <!-- 设置框-总-包含背景 -->
   <SimplePopover fixed left-0 top-0 w-full h-full :show="sysSettingStore.isSysSettingShow" :bg="true" backdrop-blur-sm>
    <ShowHidden v-show="sysSettingStore.isSysSettingShow">
      <!-- 设置框-内 -->
      <MoveWindow ref="dragRef" :isCenter='true' >
        <div z-100 text-xl shadow-md bg-deep-1 w-120 h-10 flex rounded-sm >
          <!-- 设置关闭按钮 -->
          <div ml-4 h-full flex items-center><span>设置</span></div>
          <button absolute right-0 bg-deep-2 hover:text-deep-1 hover:bg-deep-3 w-11 h-9.8  rounded-lg
            @click="sysSettingStore.isSysSettingShow = false">
            X
          </button>
        </div>
        <template v-slot:content>
          <div w-120 h-90 bg-deep-0 shadow-xl>
            <SysSettingIndex />
          </div>
        </template>
      </MoveWindow>
    </ShowHidden>
  </SimplePopover>
</template>
<script setup lang="ts">
// 显隐控制
import { SysSettingStore } from '@/stores/sys'
const sysSettingStore = SysSettingStore()
</script>
<style scoped>
/* 坐标的数目变形前后必须一致。 */
.button-svg {
  border-radius: 0.1rem 0.5rem 0.1rem 4rem;
  clip-path: polygon(0% 0%,
      100% 0%,
      100% 100%,
      90% 90%,
      80% 80%,
      70% 70%,
      60% 60%,
      50% 50%,
      40% 40%,
      30% 30%,
      20% 20%,
      10% 10%);
  transition: clip-path 0.5s ease-in-out;
}

/* hover */
.button-svg:hover {
  clip-path: polygon(0% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      80% 60%,
      0% 70%,
      0% 60%,
      0% 50%,
      0% 40%,
      0% 30%,
      0% 20%,
      0% 10%);
}

</style>
