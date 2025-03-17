<template>
  <div>
    <h1 text-2xl font-bold mb-20px>折叠面板</h1>
    <!-- 遍历数组生成折叠面板 -->
    <CollapseBase :buttonList="buttonList">
      <li my-1 mb-3>
        <div mini-text-center-between h-12>
          <!-- 名字 邮箱 -->
          <div flex items-center h-full>
            <UserLogin m-2 w-12 h-full />
            <div text-deep-1>
              <div text-lg font-600>Name User</div>
              <div text-sm font-100 text-deep-5>**@***.com</div>
            </div>
          </div>
          <!-- 关闭 -->
          <button w-14 h-full rounded-full bg-deep-2 hover:bg-deep-3>×</button>
        </div>
      </li>

    </CollapseBase>

    <div code-container bg-gray-100 rounded-5px>
      <h2 text-xl font-semibold mb-10px>使用源码</h2>
      <LibMarked v-model:markdownInput="markdownText" w-full max-h-200 overflow-auto bg-deep-2 p-2 />
    </div>
  </div>
</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :collapse.vue
 * @Time         :2025/02/26 20:27:56
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :layouts
 * @summary      :简介
 * @description  :折叠面板
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */


////////////////////1_import_______////////////////////
import { onMounted, ref } from 'vue';
import SettingSVG from '@/components/miniUI/miniSvg/SettingSVG.vue'
////////////////////2_type_________////////////////////
interface Panel {
  title: string;
  buttons: Button[];
}

interface Button {
  label: string;
  action: () => void;
}

////////////////////3_class________////////////////////

////////////////////4_obj__________////////////////////

// 两级父子对象
const buttonList = ref([{
  name: '项目列表1',
  icon: SettingSVG,
  clickFuc: (item: any) => { item.isShow = !item.isShow },
  isShow: false,
  child: [
    { name: '项目列表1-1', icon: null, url: '/' },
    {
      name: '项目列表1-2', icon: null, url: '/'
    }
  ]
},
{
  name: '后台管理',
  icon: SettingSVG,
  url: '/_server',
  clickFuc: () => {

  }
}
])


const markdownText = ref(`
\`\`\`ts
<CollapseBase :buttonList="buttonList" >
      <li my-1 mb-3>
        <div mini-text-center-between h-12>
          <!-- 名字 邮箱 -->
          <div flex items-center h-full>
            <UserLogin m-2 w-12 h-full />
            <div text-deep-1>
              <div text-lg font-600>Name User</div>
              <div text-sm font-100 text-deep-5>**@***.com</div>
            </div>
          </div>
          <!-- 关闭 -->
          <button w-14 h-full rounded-full bg-deep-2 hover:bg-deep-3>×</button>
        </div>
      </li>
</CollapseBase>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonMediaBase from './ButtonMediaBase.vue'

const isPlaying = ref(false)
const isvoice = ref(false)
const voiceIng = ref(false)
<\/script>
\`\`\`
`)

////////////////////5_vue__________////////////////////


onMounted(() => {
  //console.log('onMounted_debugger')
});
////////////////////6_watch________////////////////////

////////////////////7_fuc__________////////////////////

////////////////////8_fetch________////////////////////

////////////////////9_code_block___////////////////////

////////////////////_______________////////////////////
</script>

<style scoped>
.collapse-panel {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.collapse-header {
  padding: 10px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.collapse-content {
  padding: 10px;
  background-color: #fff;
}

button {
  display: block;
  margin: 5px 0;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>