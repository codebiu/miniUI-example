<template>
    <div>
        <div h-full w-full bg-deep-5 flex>
            <el-tree h-full w-60 :data="dataTree" :props="defaultProps" @node-click="handleNodeClick" />
            <div grow bg-deep-3>

                <monacoEditor v-model="valueEditer" :language="language" :hight-change="hightChange" :read-only="false"
                    :theme="theme" w-full h-full @editor-mounted="handleEditorMounted" />
            </div>
        </div>
        <div h-full w-full bg-deep-4>
        </div>

    </div>
</template>
  
<script lang="ts" setup>
import { fileObj, fileType } from '@/components/libUI/editor/monaco/FileInfo';
import * as monaco from 'monaco-editor'
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

const dataTree = ref(
    //     [
    //     {
    //       label: 'Level one 1',
    //       children: [
    //         {
    //           label: 'Level two 1-1',
    //           children: [
    //             {
    //               label: 'Level three 1-1-1',
    //             },
    //           ],
    //         },
    //       ],
    //     }
    //   ]
)

const defaultProps = {
    children: 'children',
    label: 'label',
}

const getTree = async () => {
    const response = await fetch(`http://localhost:1777/utils/tree?dir=${projectName}`);
    const data = await response.json();
    console.log(data)
    dataTree.value = data
}


const handleNodeClick = async (data: Tree) => {
    console.log(data)
    const path = data.path

    const response = await fetch(`http://localhost:1777/utils/open_stream?file=${projectName}/${path}`);
    // 判断类型
    const contentType = response.headers.get('content-type');
    if (!contentType) return
    let fileObjThis
    for (let i in fileObj) {
        if (contentType.includes(i)) {
            fileObjThis = fileObj[i]
            break
        }
    }
    if (!fileObjThis) return
    switch (fileObjThis.type) {
        case fileType.TEXT:
            {
                if (!editor) return
                const text = await response.text();
                const model = editor.getModel();
                if (model) monaco.editor.setModelLanguage(model, fileObjThis.language);
                editor.setValue(text)

            }
            break;
        case fileType.IMAGE:

            break;

        default:
            break;
    }
}

//////////////////////////monacoEditor
const valueEditer = ref('')
const language = ref('javascript')
const theme = ref('vs-dark')
const hightChange = ref<any>(false)

let editor = null as null | monaco.editor.IStandaloneCodeEditor
const handleEditorMounted = (editorChild: any) => {
    editor = editorChild
    // hightChange.value = true
}
</script>

<style scoped></style>