<template>
    <div relative>
        <div absolute w-full>
            <div text-10 p-2>总览</div>
            <!-- 组件列表 -->
            <div v-for="item, index in fileList" :key="index">
                <!-- 大类 -->
                <div bg-deep-1 p-2>{{ item.label }}</div>
                <!-- 小类 -->
                <div flex flex-wrap bg-deep-2 p-2>
                    <div btn-deep-3 m-2 p-2 w-60 h-20 v-for="item2, index2 in item.child" :key="index2">
                        <div>{{ item2.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :index.vue
 * @Time         :2024/11/13 08:52:48
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2024 itild. All rights reserved.
 * @parent       :todo
 * @summary      :简介
 * @description  :标准模板
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { fileList } from './index.ts'
////////////////////2_type_________////////////////////
////////////////////3_class________////////////////////
////////////////////4_obj__________////////////////////
////////////////////5_vue__________////////////////////
onMounted(() => {
    //console.log('onMounted_debugger')
})
////////////////////6_watch________////////////////////
////////////////////7_fuc__________////////////////////
////////////////////8_fetch________////////////////////
////////////////////9_code_block___////////////////////
////////////////////_______________////////////////////
</script>
<style scoped></style>