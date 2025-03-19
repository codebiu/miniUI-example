<template>
    <div h-full relative>
        <UiComponentDoc title="媒体按钮和按钮组" :component="button_media" :componentRaw="button_media_vue"
            :documentation="button_media_markdown" />
    </div>
</template>

<script setup lang="ts">
/**
 * @version      :0.0
 * @author       :itild
 * @File         :button_media_doc.vue
 * @Time         :2025/03/13 22:20:58
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :button
 * @summary      :简介
 * @description  :媒体按钮和按钮组button_media_doc
 */
import button_media from './button_media.vue'; // 确保路径正确
import button_media_vue from './button_media.vue?raw'; // 确保路径正确
import button_media_markdown from './button_media.md?raw';
</script>