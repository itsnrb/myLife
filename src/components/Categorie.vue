<script setup>
import { ref, inject } from "vue"
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    topic: {
        type: String,
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
const showInput = ref(false)
const minutes = ref()
const hours = ref()

const sendToApp = inject('sendToApp')

function sendData() {
    const newData = {
        id: uuidv4(),
        title: props.object.title,
        color: props.object.color,
        categorie: props.object.categories.find(cat => cat.title === props.title),
        hours: hours.value,
        minutes: minutes.value
    }
    sendToApp(newData)
    minutes.value = ''
    hours.value = ''
    showInput.value = false
}
</script>

<template>
    <div class="wrapper">
        <h3 @click="showInput = !showInput">{{ props.title }}</h3>
        <div v-if="showInput">
            <input v-model="hours" type="text" placeholder="Stunden"></input>
            <input v-model="minutes" type="text" placeholder="Minuten"></input>
            <v-btn @click="sendData">Sichern</v-btn>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    margin: 10px;
}
</style>