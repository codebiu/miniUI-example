<template>
    <div class="markdown-body prose lg:prose-xl rounded">
        <div v-for="(block, index) in markdownBlocks" :key="index">
            <div v-if="isCodeBlock(block)" class="code-block-wrapper">
                <button class="copy-button" @click="copyCode(block)">
                    Copy
                </button>
                <div v-html="block"></div>
            </div>
            <div v-else v-html="block"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { ref, watch, onMounted } from 'vue'
import hljs from 'highlight.js'
// import 'highlight.js/styles/foundation.css' // 使用黑白主题
// import 'highlight.js/styles/atom-one-dark.css' // 更换主题
import 'highlight.js/styles/stackoverflow-light.css' // 更换主题
import 'github-markdown-css/github-markdown-light.css';

// 使用 defineModel 接收外部传入的 Markdown 内容
const markdownInput = defineModel<string>('markdownInput', { required: true })
const markdownBlocks = ref<string[]>([])

// 配置 markdown-it 和代码高亮
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value
            } catch (__) { }
        }
        return '' // 使用默认的高亮处理
    }
})

// 将 Markdown 渲染后的 HTML 分割成多个部分
const splitMarkdownIntoBlocks = (html: string): string[] => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const blocks = Array.from(doc.body.children).map((el) => el.outerHTML)
    return blocks
}

// 判断是否是代码块
const isCodeBlock = (block: string): boolean => {
    return block.startsWith('<pre>')
}

// 复制代码
const copyCode = (block: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(block, 'text/html')
    const code = doc.querySelector('code')?.innerText || ''
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!')
    })
}

// 初始渲染
onMounted(() => {
    markdownBlocks.value = splitMarkdownIntoBlocks(md.render(markdownInput.value))
})

// 监听外部传入的 markdownInput 变化
watch(
    () => markdownInput.value,
    (newValue) => {
        markdownBlocks.value = splitMarkdownIntoBlocks(md.render(newValue))
    }
)
</script>

<style scoped>
.code-block-wrapper {
    position: relative;
}


.copy-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem 0.5rem;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.copy-button:hover {
    background-color: #555;
}


</style>