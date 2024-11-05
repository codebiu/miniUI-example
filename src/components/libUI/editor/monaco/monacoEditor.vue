<template>
  <div ref="codeEditBox" :class="props.hightChange"></div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
export type Theme = 'vs' | 'hc-black' | 'vs-dark'
export type FoldingStrategy = 'auto' | 'indentation'
export type RenderLineHighlight = 'all' | 'line' | 'none' | 'gutter'
export interface Options {
  automaticLayout: boolean // 自适应布局
  foldingStrategy: FoldingStrategy // 折叠方式  auto | indentation
  renderLineHighlight: RenderLineHighlight // 行亮
  selectOnLineNumbers: boolean // 显示行号
  placeholder: string
  minimap: {
    // 关闭小地图
    enabled: boolean
  }
  // readOnly: Boolean // 只读
  fontSize: number // 字体大小
  scrollBeyondLastLine: boolean // 取消代码后面一大段空白
  overviewRulerBorder: boolean // 不要滚动条的边框
}
type Props = {
  // 类型
  modelValue?: string
  hightChange: boolean
  width: string | number
  height: string | number
  language: string
  readOnly?: boolean
  theme?: string
  options?: Object
}
// withDefaults 快速绑定默认值
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  hightChange: false,
  width: '100%',
  height: '100%',
  language: 'javascript',
  readOnly: false,
  theme: 'vs',
  options: () => {
    return {
      automaticLayout: true,
      // foldingStrategy: 'indentation',
      foldingStrategy: 'indentation', // 折叠方式  auto | indentation
      enderLineHighlight: 'all',//'all' || 'line' || 'none' || 'gutter'
      // selectOnLineNumbers: true, // 显示行号
      minimap: {
        // 小地图
        enabled: true
      },
      placeholder: '',
      // readOnly: false, // 只读
      fontSize: 16, // 字体大小
      scrollBeyondLastLine: false, // 取消代码后面一大段空白
      overviewRulerBorder: false // 不要滚动条的边框
    }
  }
})

const emit = defineEmits(['editor-mounted'])

////////////////////////////////////////初始化编辑器
onMounted(() => {
  init()
})
onBeforeUnmount(() => {
  editor.dispose()
})


let editor: monaco.editor.IStandaloneCodeEditor
const codeEditBox = ref()
const init = () => {
  editor = monaco.editor.create(codeEditBox.value, props)
  // 初始化完成抛出
  emit('editor-mounted', editor)

}


// 外部更改editeor参数
watch(
  () => props.language,
  (newValue) => {
    monaco.editor.setModelLanguage(editor.getModel()!, newValue)
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (!editor) return
    const value = editor.getValue()
    if (newValue !== value) {
      editor.setValue(newValue)
    }
  }

)

watch(
  () => props.readOnly,
  () => {
    console.log('props.readOnly', props.readOnly)
    editor.updateOptions({ readOnly: props.readOnly })
  },
  { deep: true }
)

watch(
  () => props.options,
  (newValue) => {
    editor.updateOptions(newValue)
  },
  { deep: true }
)
watch(
  () => props.theme,
  (newValue) => {
    monaco.editor.setTheme(newValue)
  }
)


</script>
<style scoped></style>
