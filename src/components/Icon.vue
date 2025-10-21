<script setup>

</script>

<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
div {
    border: solid black 2px;
    border-radius: 20px;
    background-color: lightblue;
    height: 100px;
    width: 150px;
    margin: 10px;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
}
</style>