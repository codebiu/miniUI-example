<template>
    <div>
        <div h-full w-full bg-deep-5 flex-center flex-col>
            <StateLoadingSvg :isloading="isloading" />
            <div m-5 btn-deep-0 bg-deep-3  @click="isloading=!isloading">{{isloading? 'isloading' : 'loaded'}}</div>
        </div>

        <StateLoading />
        
        <State404Base />


        <!-- <State404Base/> -->

    </div>
</template>

<script setup lang="ts">
const isloading = ref(true)
</script>

<style scoped></style>