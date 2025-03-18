
<template>
    <div ref="container"></div>
</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :com_unocss_test.vue
 * @Time         :2025/03/18 16:02:53
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2025 itild. All rights reserved.
 * @parent       :todo
 * @summary      :测试编译代码
 * @description  :测试编译代码
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
 import { ref, onMounted } from 'vue';
 import { createCompiler } from '@vue/compiler-dom'

const { compile, ssrCompile } = createCompiler({
  // options
})

const container = ref<HTMLElement | null>(null);

onMounted(() => {
    // Vue 3 代码字符串（包含 UnoCSS 样式）
    const template = `
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-xl font-bold text-blue-500">Hello, Vue 3 with UnoCSS!</h1>
        <p class="text-gray-700">This is a dynamically rendered template with UnoCSS styles.</p>
      </div>
    `;

    // 编译模板为渲染函数
    const render = compile(template);

    // 创建虚拟 DOM
    const vnode = render();

    // 渲染到容器中
    if (container.value) {
        // 清空容器
        container.value.innerHTML = '';
        // 将虚拟 DOM 渲染到容器中
        container.value.appendChild(vnode.el);
    }
});
</script>

<style scoped></style>

