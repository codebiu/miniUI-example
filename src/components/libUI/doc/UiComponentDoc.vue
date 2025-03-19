<template>
  <div flex>
    <div media-button-page min-200 p-10 font-sans>
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ summary }}</h1>
        <p class="text-gray-600">{{ description }}</p>
      </div>
      <h1 text-2xl font-bold mb-20px>演示</h1>
      <!-- 动态加载组件 -->
      <component :is="component"></component>
      <h2 text-xl font-semibold mb-10px>源码</h2>
      <!-- 显示组件源码 -->
      <LibMarked :markdownInput="markdownText" w-full max-h-200 overflow-auto bg-deep-2 p-2 />
      <h2 text-xl font-semibold mb-10px>文档</h2>
      <!-- 显示组件文档 -->
      <LibMarked :markdownInput="documentation" w-full max-h-200 overflow-auto bg-deep-1 p-2 />
    </div>
  </div>
  <!-- todo 关联网址 查看git源码  查看关联博客-->
  <!-- <div>UiComponentDoc 关联网址？？ 还是放在系统多个关联</div> -->
</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :UiComponentDoc.vue
 * @Time         :2025/03/18 22:02:05
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :blog
 * @summary      :组件展示组件
 * @description  :展示组件、源码和文档
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { computed } from 'vue';
////////////////////4_obj__________////////////////////
// 定义组件 props
const props = defineProps({
  component: {
    type: Object,
    required: true
  },
  componentRaw: {
    type: String,
    required: true
  },
  documentation: {
    type: String,
    required: true
  }
});
////////////////////7_fuc__________////////////////////
// 计算属性：移除注释后的组件源码
const markdownText = computed(() => {
  let simplifiedCode = props.componentRaw
    .replace(/\/\*[\s\S]*?\*\//g, '') // 移除 /* */ 注释
    .replace(/\/\/\/{4,}[\s\S]*?\/\/\/{4,}/g, ''); // 移除 ///// //// 注释
  return `\`\`\`ts ${simplifiedCode} \`\`\``;
});

// 通用方法：提取指定标签后的内容
const extractTagContent = (content: string, tag: string): string => {
  const regex = new RegExp(`@${tag}\\s*:(.*)`); // 动态构建正则表达式
  const match = content.match(regex);
  return match ? match[1].trim() : '';
};

// 计算属性：提取 @description 后面的内容
const description = computed(() => extractTagContent(props.componentRaw, 'description'));

// 计算属性：提取 @summary 后面的内容
const summary = computed(() => extractTagContent(props.componentRaw, 'summary'));

</script>
<style scoped></style>