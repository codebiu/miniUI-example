<template>
    <div>
        <h1 w-full>Markdown 编辑器</h1>
        <div flex flex-col>
            <div flex h-200>
                <LibMarked v-model:markdownInput="markdownText" class="w-1/2 " bg-deep-2 p-2/>
                <textarea v-model="markdownText" @input="handleInput" class="w-1/2"
                    placeholder="输入 Markdown 内容" bg-deep-3 p-2></textarea>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :markdown.vue
 * @Time         :2025/03/13 23:00:18
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :editer
 * @summary      :markdown简介
 * @description  :标准模板
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { ref, onMounted } from 'vue'
import { debounceBase } from '@/components/miniUI/miniExtension/utils/debounce'
////////////////////2_type_________////////////////////
////////////////////3_class________////////////////////
////////////////////4_obj__________////////////////////
// 定义 Markdown 输入内容
const markdownText = ref(`# Hello,World

### Hello,World

\`\`\`javascript
const highlight = "code";
\`\`\`
`)


////////////////////5_vue__________////////////////////
onMounted(() => {
    //console.log('onMounted_debugger')
})
////////////////////6_watch________////////////////////
////////////////////7_fuc__________////////////////////
// 防抖处理输入变化
const handleInput = debounceBase(() => {
    // 这里不需要额外逻辑，因为 `markdownText` 会通过 `v-model:markdownInput` 传递给 `LibMarked.vue`
}, 300)
////////////////////8_fetch________////////////////////
////////////////////9_code_block___////////////////////
////////////////////_______________////////////////////
</script>

<style scoped>

</style>