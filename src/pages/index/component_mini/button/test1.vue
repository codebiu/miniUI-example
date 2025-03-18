<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 py-12">
        <!-- Header -->
        <div class="mb-12 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Component Preview</h1>
          <p class="text-gray-600">Interactive preview with documentation and source code</p>
        </div>
  
        <!-- Preview Section -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-8 relative">
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Live Preview</h2>
            <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <slot></slot>
            </div>
          </div>
  
          <!-- Source Code Toggle -->
          <div class="absolute bottom-4 right-4">
            <button
              @click="showSourceCode = !showSourceCode"
              class="group flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <span class="opacity-0 group-hover:opacity-100 transition-opacity">
                {{ showSourceCode ? 'Hide' : 'View' }} Source
              </span>
            </button>
          </div>
        </div>
  
        <!-- Source Code -->
        <div v-show="showSourceCode" class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h2 class="text-xl font-bold text-gray-900">Source Code</h2>
            </div>
          </div>
          <pre class="rounded-lg bg-gray-900 p-4 overflow-x-auto">
            <code class="text-sm font-mono" v-html="highlightedSource"></code>
          </pre>
        </div>
  
        <!-- Documentation -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="flex items-center mb-6">
            <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 class="text-xl font-bold text-gray-900">Documentation</h2>
          </div>
          <div class="prose prose-slate max-w-none" v-html="renderedMarkdown"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import MarkdownIt from 'markdown-it'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism-tomorrow.css'
  import 'prismjs/components/prism-typescript'
  import 'prismjs/components/prism-markup'
  import 'prismjs/components/prism-javascript'
  
  const props = defineProps<{
    markdown: string
    sourceCode: string
  }>()
  
  const showSourceCode = ref(false)
  
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  })
  
  const renderedMarkdown = computed(() => {
    return md.render(props.markdown)
  })
  
  const highlightedSource = computed(() => {
    return Prism.highlight(
      props.sourceCode,
      Prism.languages.markup,
      'markup'
    )
  })
  </script>
  
  <style>
  .prose {
    @apply text-gray-900;
  }
  .prose h1 {
    @apply text-3xl font-bold mb-6 text-gray-900;
  }
  .prose h2 {
    @apply text-2xl font-semibold mb-4 text-gray-800 mt-8;
  }
  .prose h3 {
    @apply text-xl font-semibold mb-3 text-gray-800 mt-6;
  }
  .prose p {
    @apply mb-4 text-gray-600 leading-relaxed;
  }
  .prose table {
    @apply w-full border-collapse mb-6;
  }
  .prose th {
    @apply bg-gray-50 text-left py-3 px-4 font-semibold text-gray-700 border-b border-gray-200;
  }
  .prose td {
    @apply py-3 px-4 border-b border-gray-200 text-gray-600;
  }
  .prose code {
    @apply bg-gray-50 text-gray-800 px-2 py-0.5 rounded text-sm font-mono;
  }
  .prose pre {
    @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6;
  }
  .prose pre code {
    @apply bg-transparent text-inherit p-0;
  }
  .prose ul {
    @apply list-disc list-inside mb-4 text-gray-600;
  }
  .prose li {
    @apply mb-2;
  }
  .prose a {
    @apply text-blue-600 hover:text-blue-800 underline;
  }
  .prose blockquote {
    @apply border-l-4 border-gray-200 pl-4 italic text-gray-600 my-4;
  }
  </style>




<template>
    <ComponentViewer
      :markdown="buttonMarkdown"
      :source-code="buttonSource"
    >
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Button Variants</h3>
          <div class="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Button Sizes</h3>
          <div class="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Disabled State</h3>
          <div class="flex flex-wrap gap-4">
            <Button disabled variant="primary">Disabled Primary</Button>
            <Button disabled variant="secondary">Disabled Secondary</Button>
            <Button disabled variant="outline">Disabled Outline</Button>
          </div>
        </div>
      </div>
    </ComponentViewer>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import ComponentViewer from './components/ComponentViewer.vue'
  import Button from './components/Button.vue'
  import buttonMarkdown from './docs/Button.md?raw'
  import buttonSource from './components/Button.vue?raw'
  </script>