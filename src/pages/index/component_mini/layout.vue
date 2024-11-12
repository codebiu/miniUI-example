<template>
    <div>
        <SimpleHeader >{{titleDemo}}</SimpleHeader>
        <DivResizable/>
    </div>
</template>

<script setup lang="ts">
import { i18n } from '@/i18n/language'


const titleDemo = computed(() => i18n.global.t('titleDemo'));
</script>

<style scoped>

</style>