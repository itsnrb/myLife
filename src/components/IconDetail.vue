<script setup>


</script>
<template>
    <div class="header">
        <slot name="title"></slot>
    </div>
    <div class="content">
        <slot name="desc"></slot>
    </div>
</template>

<style scoped>
.header {
    font-size: large;    
}
.content {
    font-size: small;
}
</style>