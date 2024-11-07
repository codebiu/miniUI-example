<template>
    <div h-full relative>
        <div full-flex>
            <ul flex flex-col w-200px  bg-deep-3 overflow-auto>
                <!-- 循环buttonList -->
                <li v-for="(item, index) in buttonList" :key="index" m-1>
                    <button flex items-center w-full h-16 bg-deep-0 rounded-sm hover:bg-deep-2 shadow-warmgray shadow-sm
                        @click="handleClick(item)" :class="clickButton === item && 'bg-deep-3'">
                        <component :is="item.icon" v-if="item.icon" w-5 mx-1 />
                        <span sm font-2 mx-2>{{ item.name }}</span>
                    </button>
                </li>
            </ul>
            <!-- flex剩余 -->
            <router-view grow bg-deep-2 overflow-auto></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SysSettingStore } from '@/stores/sys'
const router = useRouter()
const { sysStyle } = storeToRefs(SysSettingStore())
sysStyle.value.headShow = true
const baseRoute = '/component_dev'
// 两级父子对象
const buttonList = ref([
    {
        name: 'component_dev',
        path: '/'
    },
    {
        name: '文件树',
        path: '/file_tree'
    },
    {
        name: '固定满屏',
        path: '/screen_full'
    },
    {
        name: '动态高度',
        path: '/screen_auto'
    },
    {
        name: 'button',
        path: '/button'
    },
    {
        name: 'editor',
        path: '/editor'
    },
    {
        name: 'state',
        path: '/state'
    },
    {
        name: 'echart_graph',
        path: '/echart_graph'
    },
    {
        name: 'todo',
        path: '/todo'
    },
    {
        name: 'todo',
        path: '/todo'
    },
    {
        name: 'todo',
        path: '/todo'
    },
    {
        name: 'todo',
        path: '/todo'
    }
])

const clickButton = ref(buttonList.value[0])
const handleClick = (item: any) => {
    clickButton.value = item
    // 如果有url，则跳转url
    item.path && router.push(baseRoute + item.path)
    item.clickFuc && item.clickFuc(item)
}

onMounted(() => {
    // 获取当前路由
    const currentRoute = router.currentRoute.value
    // 去除前面的baseRoute
    const currentPath = currentRoute.path.replace(baseRoute, '')
    const currentButton = buttonList.value.find((item: any) => item.path === currentPath)
    currentButton && (clickButton.value = currentButton)
})
</script>

<style scoped></style>
