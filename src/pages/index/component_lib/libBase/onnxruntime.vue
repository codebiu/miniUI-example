<template>
    <div>todo</div>
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
import * as ort from 'onnxruntime-web';
// data/linear_regression_fixed.onnx
onMounted(async () => {
    const session = await ort.InferenceSession.create('data/linear_regression_fixed.onnx');
    const input = new ort.Tensor('float32', [5.0]);
    // 获取输入和输出的名称
    const input_name = session.inputNames[0];
    const output_name = session.outputNames[0];

    // 创建输入张量
    const input_tensor = new ort.Tensor('float32', input_data, [1, input_data.length]);

    // 进行预测
    const result = await session.run({ [input_name]: input_tensor });

    // 获取预测结果
    const output_data = result[output_name].data;

    console.log(output_data); // 输出预测结果
})

////////////////////2_type_________////////////////////
////////////////////3_class________////////////////////
////////////////////4_obj__________////////////////////
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