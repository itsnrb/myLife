<script setup>
import { saveToDB } from "../services/api.js"
import { inject } from "vue"

const props = defineProps({
    object: {
        type: Object,
    }
})

const reloadDayData = inject('reloadDayData')
const reloadData = inject('reloadData')

async function deleteObject(id) {
    reloadDayData(id)
}
async function saveObject(id, obj) {
    await saveToDB(id, obj)
    reloadDayData(id)
    reloadData()
}

</script>
<template>
    <div class="wrapper">
        <h3>{{ object.topic }}</h3>
        <p>{{ object.categorie }}</p>
        <p>{{ object.hours }} Stunden, {{ object.minutes }} Minuten</p>
        <p>{{ object.date }}</p>
        <v-btn @click="deleteObject(object.id)">Löschen</v-btn>
        <v-btn @click="saveObject(object.id, object)">Sichern</v-btn>
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