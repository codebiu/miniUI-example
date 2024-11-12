<template>
    <div>
      <div h-full w-full bg-deep-5 flex>
        <el-tree h-full w-60 bg-deep-2 :data="dataTree" :props="defaultProps" @node-click="handleNodeClick" />
        <div grow bg-deep-3>
          <monacoEditor v-model="valueEditer" :language="language" :hight-change="hightChange" :read-only="false"
            :theme="theme" w-full h-full @editor-mounted="handleEditorMounted" />
        </div>
      </div>
    </div>
  </template>
    
  <script lang="ts" setup>
  import { fileObj, fileType } from '@/components/libUI/editor/monaco/FileInfo';
  import * as monaco from 'monaco-editor'
  import { api } from "@/assets/api";
  
  import { SysSettingStore } from '@/stores/sys'
  const sysSettingStore = SysSettingStore()
  
  // 项目名
  const projectName = 'controller'
  onMounted(() => {
    getTree()
  })
  
  //////////////////文件树
  interface Tree {
    label: string
    path?: string
    children?: Tree[]
  }
  
  const dataTree = ref()
  
  const defaultProps = {
    children: 'children',
    label: 'label',
  }
  // api.
  const getTree = async () => {
    const response = await fetch(`${api.tree}${projectName}`);
    const data = await response.json();
    console.log(data)
    dataTree.value = data
  }
  
  
  const handleNodeClick = async (data: Tree) => {
    console.log(data)
    const path = data.path
    const response = await fetch(`${api.open_stream}${projectName}/${path}`);
    // 判断类型
    const contentType = response.headers.get('content-type');
    if (!contentType || !editor) return
    // 查找支持的类型
    let fileObjThis
    for (let i in fileObj) {
      if (contentType.includes(i)) {
        fileObjThis = fileObj[i]
        break
      }
    }
    // 没有支持的类型
    if (!fileObjThis) {
      valueEditer.value = `${path} 当前文件不支持解析`
      language.value = 'javascript'
      return
    }
    switch (fileObjThis.type) {
      case fileType.TEXT:
        {
          const text = await response.text();
          language.value = fileObjThis.language
          valueEditer.value = text
        }
        break;
      case fileType.IMAGE:
  
        break;
    }
  }
  
  //////////////////////////monacoEditor
  const valueEditer = ref('')
  const language = ref('javascript')
  // const theme = ref('vs-dark')
  const theme = ref('vs')
  const hightChange = ref<any>(false)
  
  let editor = null as null | monaco.editor.IStandaloneCodeEditor
  const handleEditorMounted = (editorChild: any) => {
    editor = editorChild
    // hightChange.value = true
  }
  
  const subscribeAction = sysSettingStore.$onAction(
    ({ name, args, after }) => {
      after(() => {
        switch (name) {
          case 'changeThemeValue':
            theme.value = sysSettingStore.sysStyle.theme.isDark ? 'vs-dark' : 'vs'
            break;
          default:
            break;
        }
      })
    }
  )
  </script>
  
  <style scoped></style>