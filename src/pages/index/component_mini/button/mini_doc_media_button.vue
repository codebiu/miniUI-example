<template>
    <div flex>
        <div media-button-page min-200 p-10 font-sans>
             <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Component Preview</h1>
        <p class="text-gray-600">Interactive preview with documentation and source code</p>
      </div>
            <h1 text-2xl font-bold mb-20px>媒体按钮和按钮组</h1>
            <media_button></media_button>
            <h2 text-xl font-semibold mb-10px>源码</h2>
            <LibMarked :markdownInput="markdownText" w-full max-h-200 overflow-auto bg-deep-2 p-2 />
            <h2 text-xl font-semibold mb-10px>文档</h2>
            <LibMarked :markdownInput="media_button_markdown" w-full max-h-200 overflow-auto bg-deep-1 p-2 />
        </div>
        <div bg-deep-2 w-50>test</div>
    </div>
</template>

<script setup lang="ts">
/**
 * @version      :0.0
 * @author       :itild
 * @File         :mini_doc_media_button.vue
 * @Time         :2025/03/13 22:20:58
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :button
 * @summary      :简介
 * @description  :媒体按钮和按钮组mini_doc_media_button
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
import { ref } from 'vue';
import media_button from './media_button.vue'; // 确保路径正确
import media_button_vue from './media_button.vue?raw'; // 确保路径正确
import media_button_markdown from './media_button.md?raw';
const removeComments = (code: string) => {
    // 移除 /* */ 注释
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    // 移除 ///// //// 注释
    code = code.replace(/\/\/\/{4,}[\s\S]*?\/\/\/{4,}/g, '');
    return code;
}

const media_button_vue_simple = removeComments(media_button_vue);

const markdownText = `
\`\`\`ts
${media_button_vue_simple}
\`\`\`
`

// const markdownText = ref()

</script>
<style scoped></style>