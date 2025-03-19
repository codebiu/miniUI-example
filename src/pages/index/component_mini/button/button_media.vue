<template>
    <div media-button-page mx-auto p-10 font-sans>
        <div flex justify-center my-20px bg-deep-0>
            <ButtonMediaBase v-model:isPlaying="isPlaying" v-model:isvoice="isvoice" v-model:voiceIng="voiceIng" />
        </div>
        <div controls>
            <h2 text-xl font-semibold mb-10px>动态设置属性</h2>
            <div control-item my-10px>
                <label flex items-center>
                    <input type="checkbox" v-model="isPlaying" mr-10px />
                    播放状态 (isPlaying)
                </label>
            </div>
            <div control-item my-10px>
                <label flex items-center>
                    <input type="checkbox" v-model="isvoice" mr-10px />
                    语音识别开启 (isvoice)
                </label>
            </div>
            <div control-item my-10px>
                <label flex items-center>
                    <input type="checkbox" v-model="voiceIng" mr-10px />
                    语音输入中 (voiceIng)
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * @version      :0.0
 * @author       :itild
 * @File         :button_media.vue
 * @Time         :2025/03/13 22:20:58
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :button
 * @summary      :媒体按钮
 * @description  :语音识别按钮 支持多种状态
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { ref } from 'vue';
const isPlaying = ref(false);
const isvoice = ref(false);
const voiceIng = ref(false);
////////////////////5_vue__________////////////////////
onMounted(() => {
    console.log('页面加载完成');
});
////////////////////6_watch________////////////////////
watch([isPlaying, isvoice, voiceIng], ([newIsPlaying, newIsvoice, newVoiceIng]) => {
    console.log('状态变化：', {
        isPlaying: newIsPlaying,
        isvoice: newIsvoice,
        voiceIng: newVoiceIng,
    });
});
</script>

<style scoped>
.media-button-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.component-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.controls {
    margin-top: 30px;
}

.control-item {
    margin: 10px 0;
}

.control-item label {
    display: flex;
    align-items: center;
}

.control-item input {
    margin-right: 10px;
}

.code-container {
    margin-top: 30px;
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
}

pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
}

code {
    font-family: 'Courier New', Courier, monospace;
    color: #333;
}
</style>