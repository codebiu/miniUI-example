<template>
  <UiComponentDoc title="媒体按钮和按钮组" :component="component" :componentRaw="componentRaw" :documentation="documentation" />
</template>

<script setup lang="ts">
/**
* @version      :0.0
* @author       :itild
* @File         :UiComponentDocGeneric.vue
* @Time         :2025/03/19 23:14:51
* @Email        :geolifestudy@gmail.com
* @Copyright    :(C) 2025 itild. All rights reserved.
* @parent       :blog
* @summary      :自动化展示组件
* @description  :自动化展示组件、源码和文档
*/
import { ref, onMounted } from 'vue';
import UiComponentDoc from './UiComponentDoc.vue';
// 定义组件 props
const props = defineProps({
  componentPath: {
    type: String,
    required: true,
  },
});

// 定义响应式变量
const component = ref(null) as any; // 动态导入的组件
const componentRaw = ref(''); // 组件的源码
const documentation = ref(''); // 组件的文档

/**
 * 动态导入模块
 * @param path - 模块路径
 * @returns 返回导入的模块
 * @throws 如果导入失败，抛出错误
 */
 async function dynamicImport<T>(path: string): Promise<T> {
  try {
    const module = await import(/* @vite-ignore */ new URL(path, window.location.origin).href);
    return module.default;
  } catch (error) {
    console.error(`Failed to load module from path: ${path}`, error);
    throw error;
  }
}

// 组件挂载时执行
onMounted(async () => {
  try {
    // 动态导入组件
    component.value = await dynamicImport(`${props.componentPath}.vue`);
    // 动态导入组件源码
    componentRaw.value = await dynamicImport(`${props.componentPath}.vue?raw`);
    // 动态导入文档
    documentation.value = await dynamicImport(`${props.componentPath}.md?raw`);
  } catch (error) {
    console.error('Failed to load resources:', error);
  }
});
</script>