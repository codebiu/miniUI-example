<template>
    <Suspense>
        <!-- 主要内容 -->
        <monacoEditor v-model="valueEditer" :language="language" :hight-change="hightChange"
            :read-only="!true" :theme="theme" w-full h-full />
        <!-- 加载中状态 -->
        <template #fallback>
            <StateLoading />
        </template>
    </Suspense>
</template>
  
<script setup lang="ts">
// edit组件
const monacoEditor = defineAsyncComponent(() =>
    import('@/components/libUI/editor/monaco/monacoEditorJS.vue'))

const valueEditer = ref('const a = 0')
// const language = ref('sql')
// const language = ref('javascript')
const language = ref('javascript')
// const theme = ref('vs')
const theme = ref('vs-dark')
// const language = ref('javascript')
const hightChange = ref<any>(false)

</script>
  