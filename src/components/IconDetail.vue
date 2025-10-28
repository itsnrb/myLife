<script setup>
import { ref } from "vue"
import Categorie from "./Categorie.vue"

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    object: {
        type: Object,
        required: true
    }
})

</script>
<template>
    <div class="wrapper">
        <div class="heading">
            <h1>{{ props.title }}</h1>
        </div>
        <div class="content">
            <categorie v-for="item in props.categories" :key="item" :title="item.title" :topic="props.title"
                :color="props.color" :object="props.object" />
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    padding: 10px;
}
</style>