<template>
    <div>
        <div ref="markdownContainer" v-html="markdownToHtml" class="markdown-body prose lg:prose-xl rounded"></div>
    </div>
</template>

<script setup lang="ts">
import { marked, type MarkedOptions } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { ref, watch, onMounted } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css' // 使用黑白主题

// 使用 defineModel 接收外部传入的 Markdown 内容
const markdownInput = defineModel<string>('markdownInput', { required: true })
const markdownToHtml = ref('')

// 获取容器引用
const markdownContainer = ref<HTMLElement | null>(null)

// 配置 marked 和代码高亮
const configureMarked = () => {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        breaks: false,
        smartypants: false,
        headerIds: false,
    } as MarkedOptions)

    marked.use(markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext'
            return hljs.highlight(code, { language }).value
        },
    }))
}

// 初始渲染
onMounted(() => {
    configureMarked()
    markdownToHtml.value = marked.parse(markdownInput.value) as string
    addCopyButtons()
})

// 监听外部传入的 markdownInput 变化
watch(
    () => markdownInput.value,
    (newValue) => {
        markdownToHtml.value = marked.parse(newValue) as string
        addCopyButtons()
    }
)

// 添加复制按钮
function addCopyButtons() {
    if (!markdownContainer.value) return;

    const codeBlocks = markdownContainer.value.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock) => {
        if (codeBlock.parentElement?.querySelector('.copy-button')) return;

        const button = document.createElement('button');
        button.className = 'copy-button absolute top-2 right-2 p-1 bg-gray-400 text-white rounded text-sm hover:bg-gray-600';
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
        button.addEventListener('click', () => copyToClipboard(codeBlock.textContent || ''));

        const preElement = codeBlock.parentElement;
        if (preElement) {
            preElement.style.position = 'relative';
            preElement.appendChild(button);
        }
    });
}

// 复制代码到剪贴板
function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
}
</script>

<style scoped>
pre {
    position: relative;
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
}

.copy-button {
    transition: background-color 0.2s ease;
}
</style>