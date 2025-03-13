<template>
  <div>
    <textarea
      v-model="valueMarkdownInput"
      @input="changeMarkdown"
      class="w-full p-2 border rounded"
      placeholder="输入 Markdown 内容"
    ></textarea>
    <div
      v-html="markdownToHtml"
      class="markdown-body prose lg:prose-xl mt-4 p-4 border rounded bg-gray-50"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { ref, shallowRef, onMounted } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css' // 代码高亮主题
import { debounceBase } from '@/components/miniUI/miniExtension/utils/debounce'
import type { MarkedOptions } from 'marked'

// Markdown 输入内容
const valueMarkdownInput = ref(
  `# Hello,World

### Hello,World

\`\`\`javascript
const highlight = "code";
\`\`\`
`
)

// 渲染后的 HTML
const markdownToHtml = shallowRef('')

// 防抖处理 Markdown 输入
const changeMarkdown = debounceBase(
  () => (markdownToHtml.value = marked.parse(valueMarkdownInput.value) as string),
  1000
)

onMounted(() => {
  // 配置 marked
  marked.setOptions({
    renderer: new marked.Renderer(), // 渲染器
    gfm: true, // 启用 GitHub Flavored Markdown
    pedantic: false, // 不严格解析
    sanitize: false, // 允许 HTML 标签
    breaks: false, // 不将换行符转换为 <br>
    smartypants: false, // 不使用智能标点
    headerIds: false, // 不自动生成标题 ID
  } as MarkedOptions)

  // 配置代码高亮
  marked.use(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      },
    })
  )

  // 初始渲染
  markdownToHtml.value = marked.parse(valueMarkdownInput.value) as string
})
</script>

<style>
/* 自定义 Markdown 渲染样式 */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
}

.markdown-body pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.markdown-body code {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.markdown-body h1 {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
}

.markdown-body h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.75rem 0;
}
</style>