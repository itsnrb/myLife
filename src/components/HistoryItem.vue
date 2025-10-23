<script setup>
const props = defineProps({
    object: {
        type: Object,
    }
})

</script>
<template>
    <div class="wrapper">
        <h3>{{ object.topic }}</h3>
        <p>{{ object.categorie }}</p>
        <p>{{ object.hours }} Stunden, {{ object.minutes }} Minuten</p>
    </div>
</template>
<style scoped>
.wrapper {
    border: 2px solid black;
    border-radius: 20px;
    background-color: lightcoral;
    padding: 10px;
}
</style>