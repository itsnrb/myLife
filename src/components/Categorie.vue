<script setup>
import { ref, inject } from "vue"

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    }
})
const showInput = ref(false)
const minutes = ref()
const hours = ref()

const sendToApp = inject('sendToApp')

function sendData() {
  const newData = {
    topic: props.topic,
    categorie: props.title,
    hours: hours,
    minutes: minutes
  }

  sendToApp(newData)
}
</script>

<template>
    <div class="wrapper">
        <h3 @click="showInput = !showInput">{{ props.title }}</h3>
        <div v-if="showInput" >
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