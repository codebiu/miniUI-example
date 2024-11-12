<template>
    <div flex h-full>
        <ul border-4 border-blue w-20 h-full>
            <li v-for="(item, index) in dataAll" :key="item.id" m-2 flex items-center pointer-default
                @click="clickDataItem(item, index)">
                <span :class="item.id === dataSlice.active && 'bg-deep-4'">{{ item.name }}</span>
            </li>
        </ul>
        <main grow h-full border-4 border-black overflow-auto overscroll-contain ref="outBox">
            <section v-for="(item, index) in dataSlice.list" :key="index" :id="item.id" h-full
                :class="(indexStart + index) % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'" ref="dataRef">
                <div>{{ item.name }}</div>
                <!-- component -->
                <Suspense v-if="item.component">
                    <!-- 主要内容 -->
                    <component :is="item.component" />
                    <!-- 加载中状态 -->
                    <template #fallback>
                        <WaitAnimate></WaitAnimate>
                    </template>
                </Suspense>
            </section>
        </main>
    </div>
</template>
<script setup lang="ts">
import { SateSet } from '@/components/common/miniExtension/utils/state'
const monacoEditor = defineAsyncComponent(
    () => import('@/components/app/sys/blog/BlogEditor/monacoEditor.vue')
)
const miniIndex = defineAsyncComponent(
    () => import('@/components/common/miniExample/mini_index.vue')
)
const outBox = ref<Element>()
const sateSet = new SateSet()
const dataRef = ref<Array<Element>>([])

// 所有列表
const dataAll = [
    {
        id: 'one1',
        name: 'ide测试',
        component: monacoEditor
    },
    {
        id: 'two2',
        name: 'two'
    },
    {
        id: 'three3',
        name: 'three',
        component: miniIndex
    },
    {
        id: 'four4',
        name: 'four'
    },
    {
        id: 'five5',
        name: 'five'
    }
]

onMounted(() => { clickDataItem(dataAll[0], 0) })
// 添加ts类型
type DataSlice = {
    active: any,
    list: any[]
}
const dataSlice: Ref<DataSlice> = ref({ active: null, list: [] })

// 已渲染数组开始
let indexStart = ref(0)
let indexInDataAllOld = 0
/**
 * 更新数据
 * @param data 对象
 * @param index 数组索引
 */
const clickDataItem = async (data: { id: any }, indexInDataAll: any) => {
    await renderAll(data.id, indexInDataAll)
    // 滚动到指定位置  {behavior: "smooth"}顺滑
    dataRef.value[indexInDataAllOld - indexStart.value].scrollIntoView({ behavior: 'smooth' })
}

/**
 * 渲染新div
 * @param id
 * @param indexInDataAll
 */
const renderAll = async (id: string, indexInDataAll: number) => {
    // 左侧选中
    dataSlice.value.active = id
    // 更新div
    renderDiv(indexInDataAll)
    // 等待本次dom更新
    await nextTick()
    // 更新事件
    gotoDiv()
}

/**
 * 更新可视div
 * @param index 当前索引
 */
const renderDiv = (indexInDataAll: number) => {
    indexInDataAllOld = indexInDataAll
    // 往前加载1个 后1个
    const indexThis = indexInDataAllOld - 1
    const indexEnd = indexInDataAllOld + 2
    // 考虑首部0超限 实际位置
    indexStart.value = indexThis < 0 ? 0 : indexThis

    dataSlice.value.list = dataAll.slice(indexStart.value, indexEnd)
}

/**
 * 更新事件
 * 更新检测状态,滚动到指定位置
 */
const gotoDiv = async () => {
    // 更新检测状态
    const stateNew = sateSet.setNew(new Set(dataRef.value))
    stateNew.delete.forEach((section) => {
        console.log('remove', section)
        observer.unobserve(section)
    })
    stateNew.add.forEach((section) => {
        console.log('add', section)
        observer.observe(section)
    })
}

// 滚动监听  y缩减一半
const options = { rootMargin: '-50% 0px', threshold: 0 }
/**
 * 监听滚动
 */
const observer = new IntersectionObserver(async (entries) => {
    // 遍历
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        if (!entry.isIntersecting) continue
        const indexInDataAll = dataAll.findIndex((element) => element.id === entry.target.id)
        // 跳转游标
        const trans = indexInDataAll - indexInDataAllOld
        if (trans == 0) break
        let firstChangeDomHeight = null
        // 下滚动 下滚动开始只有两个对象 下拉结尾未卸载第一个dom
        if (trans == 1 && dataRef.value.length > 2)
            firstChangeDomHeight = dataRef.value[0]!.clientHeight
        // 深拷贝
        await renderAll(entry.target.id, indexInDataAll) // 渲染后
        // 上滚动
        if (trans == -1) firstChangeDomHeight = dataRef.value[0]!.clientHeight
        //dataRef.value.length>2 下拉结尾未添加尾部 上拉结尾未添加头部  不动
        if (dataRef.value.length > 2 && firstChangeDomHeight)
            outBox.value?.scrollTo({ top: outBox.value!.scrollTop - trans * firstChangeDomHeight }) // 滚动
        break
    }
}, options)
</script>
<style scoped>
main::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}
</style>
