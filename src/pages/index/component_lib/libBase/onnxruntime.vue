<template>
    <div>{{ output_data }}</div>
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

onMounted(async () => {
    ort.env.wasm.wasmPaths = '/';
    const session = await ort.InferenceSession.create('/data/linear_regression_fixed.onnx',
        { executionProviders: ["webgpu"], }
    );

    // 创建输入数据
    // const inputData = new Float32Array([100.0]); // 一维数组
    const inputData = new Float32Array([100.0, 200.0, 300.0, 400.0]); // 一维数组
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
    output_data.value = result_data;
    console.log(result_data); // 输出预测结果
})

////////////////////2_type_________////////////////////
////////////////////3_class________////////////////////
////////////////////4_obj__________////////////////////
const output_data = ref('onnx') as any;
////////////////////5_vue__________////////////////////
onMounted(() => {
    //console.log('onMounted_debugger')
})
////////////////////6_watch________////////////////////
////////////////////7_fuc__________////////////////////
////////////////////8_fetch________////////////////////
////////////////////9_code_block___////////////////////
////////////////////_______________////////////////////
</script>
<style scoped></style>