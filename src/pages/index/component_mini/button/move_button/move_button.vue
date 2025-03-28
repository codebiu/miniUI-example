<template>
  <div class="h-screen w-screen relative">
    <h1 class="text-2xl font-bold p-4">改进版可拖动边缘按钮</h1>


    <MoveButton v-model="buttonPosition" class="bg-blue-400 hover:bg-blue-500" :embed-ratio="0.3">
      拖动
    </MoveButton>

    <div class="p-4">
      <p>当前按钮位置: {{ buttonPosition }}</p>
      <div class="flex gap-2 mt-2">
        <button 
          v-for="edge in ['top', 'right', 'bottom', 'left']"
          :key="edge"
          @click="buttonPosition = edge"
          class="px-3 py-1 bg-gray-200 rounded"
        >
          置{{ {top: '顶', right: '右', bottom: '底', left: '左'}[edge] }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :move_button.vue
 * @Time         :2025/03/28 22:48:51
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :button
 * @summary      :MoveButton 演示
 * @description  :可拖动边缘按钮
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { ref } from 'vue';

const buttonPosition = ref('bottom');
</script>
<style scoped></style>