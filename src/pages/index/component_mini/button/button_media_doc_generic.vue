<template>
    <div h-full relative>
        <UiComponentDocGeneric :componentPath="componentPath" />
    </div>
</template>
<script setup lang="ts">
/**
 * @version      :0.0
 * @author       :itild
 * @File         :button_media_doc_generic.vue
 * @Time         :2025/03/19 23:19:57
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :button
 * @summary      :媒体按钮
 * @description  :语音识别按钮 支持多种状态 自动引入——后续自动生成
 */
 const componentPath = new URL('button_media', import.meta.url).href;
</script>