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
    height: 50px;
    width: auto;
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
}
</style>