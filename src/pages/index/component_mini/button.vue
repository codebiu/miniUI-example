<template>
    <div flex flex-col>
        <ButtonSwitch v-model="mapEditObj.isWmsShow" @change = "console.log('change')"/>
        <button w-20 h-20 bg-deep-09 class="button-svg"></button>
    </div>
</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :button.vue
 * @Time         :2024/11/12 17:20:56
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2024 itild. All rights reserved.
 * @parent       :button
 * @summary      :button list
 * @description  :按钮(切换/动画/头像)  
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
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