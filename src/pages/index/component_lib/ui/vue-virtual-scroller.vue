<template>
    <div>
      <!-- 输入框和跳转按钮 -->
      <div class="controls">
        <input v-model="jumpIndex" type="number" min="0" max="999" placeholder="输入索引 (0-999)" />
        <button @click="jumpToItem">跳转</button>
      </div>
  
      <!-- 虚拟列表 -->
      <RecycleScroller
        class="scroller"
        :items="items"
        :item-size="50"
        key-field="id"
        :buffer="5"
        ref="scroller"
        v-slot="{ item }"
      >
        <div class="item">
          {{ item.id }}: {{ item.name }}
        </div>
      </RecycleScroller>
    </div>
  </template>
 <script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :vue-virtual-scroller.vue
 * @Time         :2025/03/16 23:16:36
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :ui
 * @summary      :简介
 * @description  :虚拟列表
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { ref, computed } from 'vue'
// 虚拟列表
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
////////////////////2_type_________////////////////////
////////////////////3_class________////////////////////
////////////////////4_obj__________////////////////////
// 生成 1000 条数据
const items = computed(() => {
  return Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`
  }))
})

// 输入框的值
const jumpIndex = ref('')

// 获取 RecycleScroller 实例
const scroller = ref(null)
////////////////////5_vue__________////////////////////
onMounted(() => {
  //console.log('onMounted_debugger')
 })
////////////////////6_watch________////////////////////
////////////////////7_fuc__________////////////////////

// 跳转到指定项
const jumpToItem = () => {
  const index = parseInt(jumpIndex.value, 10)
  if (!isNaN(index) && index >= 0 && index < items.value.length) {
    scroller.value.scrollToItem(index)
  } else {
    alert('请输入有效的索引 (0-999)')
  }
}
////////////////////8_fetch________////////////////////
////////////////////9_code_block___////////////////////
////////////////////_______________////////////////////
</script>
<style scoped>
.controls {
  margin-bottom: 20px;
}

.controls input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.controls button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background-color: #0056b3;
}

.scroller {
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: auto;
}

.item {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
}

.item:hover {
  background-color: #f9f9f9;
}
</style>