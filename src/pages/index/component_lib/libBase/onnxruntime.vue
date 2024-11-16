<template>
    <div>
        <div flex>
            <div>结果：</div>
            <div>{{ output_data }}</div>
        </div>
        <div flex>
            <div>输入：</div>
            <input type="text" v-model="inputDataUser">
            <button btn-deep-3 @click="clickInference()">运行</button>
        </div>

        

    </div>

</template>
<script setup lang='ts'>
/**
 * @version      :0.0
 * @author       :itild
 * @File         :onnxruntime.vue
 * @Time         :2024/11/14 15:35:23
 * @Email        :geolifestudy@gmail.com
 * @Copyright    :(C) 2024 itild. All rights reserved.
 * @parent       :AI
 * @summary      :onnx web
 * @description  :网页端加载运行onnx模型示例 
 * 
 * 1 import 2 type 3 class 4 obj 5 vue
 * 6 watch 7 fuc 8 fetch 9 code_block
 */
////////////////////1_import_______////////////////////
// import * as ort from 'onnxruntime-web';
// webnn
import * as ort from 'onnxruntime-web/webgpu';
// import * as ort from 'onnxruntime-web/experimental';
// data/linear_regression_fixed.onnx
const inputDataUser = ref([100.0, 200.0, 300.0, 400.0])
let sessionUse: ort.InferenceSession | null
onMounted(async () => {
    sessionUse = await loadModel()
})

////////////////////2_type_________////////////////////
////////////////////3_class________////////////////////
////////////////////4_obj__________////////////////////
const output_data = ref([]) as any
////////////////////5_vue__________////////////////////
onMounted(() => {
    //console.log('onMounted_debugger')
})

const clickInference = async () => {
    if(!sessionUse) return
    const result = await inference(sessionUse)
    output_data.value = result
}
////////////////////6_watch________////////////////////
////////////////////7_fuc__________////////////////////

/**
 * 加载模型
 */
const loadModel = async () => {
    ort.env.wasm.wasmPaths = '/';
    const session = await ort.InferenceSession.create('/data/linear_regression_fixed.onnx',
        { executionProviders: ["webgpu"], }
    );
    return session
}
/**
 * 推理
 */
const inference = async (session: ort.InferenceSession) => {
    if (!session) return
    // 创建输入数据
    // const inputDataUser = new Float32Array([100.0]); // 一维数组
    // const inputDataUser = new Float32Array([100.0, 200.0, 300.0, 400.0]); // 一维数组
    // inputDataUser.value 字符串转数组
    const inputDataUserArray = isArray(inputDataUser.value);
    const inputData = new Float32Array(inputDataUserArray); // 一维数组
    const inputShape = [inputData.length, 1]; // 二维数组形状 m*n
    // 创建输入张量
    const inputTensor = new ort.Tensor('float32', inputData, inputShape);
    // 获取输入和输出的名称
    const input_name = session.inputNames[0];
    const output_name = session.outputNames[0];
    // 进行预测 
    // const result = await session.run({ 'float_input': inputTensor })
    const result = await session.run({ [input_name]: inputTensor })
    // 获取预测结果
    const result_data = result[output_name].data;
    return result_data
}

/**
 * 判断是数组还是字符串数组 转为数组
 */
const isArray = (data: any) => {
    if (Array.isArray(data)) {
        return data
    } else {
        return data.split(',').map(Number)
    }
}

////////////////////8_fetch________////////////////////
////////////////////9_code_block___////////////////////
////////////////////_______________////////////////////
</script>
<style scoped></style>