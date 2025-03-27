<template>
  <div>
    <div flex h-full w-full bg-deep-5>
        <div class="w-250px bg-gray-100 border-r border-gray-200 overflow-y-auto">
          <div class="p-4 text-lg font-bold border-b border-gray-200">导航菜单</div>
          <div class="py-2">
            <div v-for="item in navItems" :key="item.id"
              class="flex items-center px-4 py-2 cursor-pointer transition-all duration-300" :class="{
                'hover:bg-gray-200': activeNav !== item.id,
                'bg-blue-50': activeNav === item.id
              }" @click="selectNav(item)">
              <el-checkbox v-model="item.checked" @click.stop @change="toggleCache(item)" />
              <span class="ml-2">{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="flex-1 relative">
          <template v-for="item in navItems" :key="item.id">
            <div v-show="activeNav === item.id" class="absolute inset-0 flex">
              <iframe z-11 v-if="item.checked || activeNav === item.id" :src="item.url" frameborder="0"
                class="w-full h-full bg-white" :ref="el => setIframeRef(el, item.id)" />
            </div>
          </template>
        </div>
      </div>
  </div>
</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :nav_all.vue
 * @Time         :2025/03/27 22:12:40
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :nav
 * @summary      :导航页
 * @description  :导航页实现，左侧是可勾选的导航菜单，右侧是iframe嵌入的网页，并实现了页面缓存功能：
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
import { ref, onMounted, nextTick } from 'vue'
import { ElCheckbox } from 'element-plus'
////////////////////2_type_________////////////////////
interface NavItem {
  id: string
  title: string
  url: string
  checked: boolean
}
////////////////////3_class________////////////////////
////////////////////4_obj__________////////////////////
const navItems = ref<NavItem[]>([
  { id: '0', title: 'tengxun_yuanbao', url: 'https://yuanbao.tencent.com/', checked: true },
  { id: 'qwen', title: 'ai_qwen', url: 'https://chat.qwen.ai/', checked: true },
  { id: 'doubao', title: 'doubao', url: 'https://www.doubao.com/chat/', checked: true },
  { id: 'element', title: 'Element Plus', url: 'https://element-plus.org', checked: true },
])

const activeNav = ref<string>('0')
const iframeRefs = ref<Record<string, HTMLIFrameElement | null>>({})
////////////////////5_vue__________////////////////////
onMounted(() => {
  // 默认选中第一个导航项
  if (navItems.value.length > 0) {
    selectNav(navItems.value[0])
  }
})
////////////////////6_watch________////////////////////
////////////////////7_fuc__________////////////////////
const selectNav = (item: NavItem) => {
  activeNav.value = item.id
  // 确保iframe加载
  nextTick(() => {
    const iframe = iframeRefs.value[item.id]
    if (iframe && !iframe.src) {
      iframe.src = item.url
    }
  })
}

const toggleCache = (item: NavItem) => {
  // 如果取消勾选且当前正在显示，需要重新加载iframe
  if (!item.checked && activeNav.value === item.id) {
    const iframe = iframeRefs.value[item.id]
    if (iframe) {
      iframe.src = item.url
    }
  }
}

const setIframeRef = (el: any, id: string) => {
  iframeRefs.value[id] = el
}
////////////////////8_fetch________////////////////////
////////////////////9_code_block___////////////////////
////////////////////_______________////////////////////
</script>

<style scoped></style>