<template>
    <div relative>
        <div absolute w-full>
            <div text-10 p-2>总览</div>
            <!-- 组件列表 -->
            <div v-for="item, index in fileList" :key="index">
                <!-- 大类 -->
                <div bg-deep-1 p-2>{{ item.label }}</div>
                <!-- 大类下所有demo组 -->
                <div flex flex-wrap bg-deep-2 p-2>
                    <!-- 单个demo组 -->
                    <div btn-deep-3 m-2 p-2 w-60 h-20 v-for="item2, index2 in item.child" :key="index2"
                        @click="goto(item2.pathFromPagesVue)">
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
 * @Time         :2024/11/14 08:55:39
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
import { fileList } from './index'
////////////////////2_type_________////////////////////
////////////////////3_class________////////////////////
////////////////////4_obj__________////////////////////
const router = useRouter();
////////////////////5_vue__________////////////////////
onMounted(() => {
    //console.log('onMounted_debugger')
})
////////////////////6_watch________////////////////////
////////////////////7_fuc__________////////////////////
const goto = (path: string) => {
    router.push(path)
    // 考虑参数跳转
}
////////////////////8_fetch________////////////////////
////////////////////9_code_block___////////////////////
////////////////////_______________////////////////////
</script>
<style scoped></style>