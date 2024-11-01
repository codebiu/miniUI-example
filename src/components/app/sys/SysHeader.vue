<template>
  <!-- 网站页首 -->
  <header v-show="sysStyle.headShow" >
    <div flex flex-wrap justify-between p-4>
      <router-link to="/" flex>
        <img src="@/assets/img/ion/sy_w.svg" h-8 mr-3 />
        <span self-center text-2xl font-semibold whitespace-nowrap>minUI</span>
      </router-link>
      <!-- 空标题 可以加装饰 -->
      <span left-0 right-0 m-auto></span>
      <ul flex w-200px>
        <!-- 循环buttonList -->
        <li v-for="(item, index) in  buttonList " :key="index" m-1>
          <button flex items-center w-full h-full bg-deep-0 rounded-sm hover:bg-deep-2 shadow-warmgray
            shadow-sm @click="handleClick(item)" :class="clickButton === item && 'bg-deep-3'">
            <span sm font-2 mx-2>{{ item.name }}</span>
          </button>
        </li>
      </ul>
      <!-- 用户图标 -->
      <UserLogin @click="sysStyle.isUserControlShow = !sysStyle.isUserControlShow" w-8 h-8/>
      <!-- 点击用户图标下拉 导航栏-->
      <MinPopover v-model="sysStyle.isUserControlShow">
        <ShowHidden v-show="sysStyle.isUserControlShow">
          <UserControl
            absolute
            z-10
            w-70
            right-2
            top-4
            rounded-lg
            bg-deep-0
            p-4
            text-xl
            shadow-xl
          />
        </ShowHidden>
      </MinPopover>
    </div>
  </header>
</template>

<script setup lang="ts">
// 样式控制
import { SysSettingStore } from '@/stores/sys'
const sysSettingStore = SysSettingStore()
const sysStyle = sysSettingStore.sysStyle
const router = useRouter()

// 两级父子对象
const buttonList = ref([
  {
    name: 'home',
    path: '/',
  },
  {
    name: '组件',
    path: '/component_dev',
  },
])

const clickButton = ref(buttonList.value[0])
const handleClick = (item: any) => {
  clickButton.value = item
  // 如果有url，则跳转url
  item.path&&router.push(item.path)
  item.clickFuc&&item.clickFuc(item)
}


</script>

<style scoped></style>
