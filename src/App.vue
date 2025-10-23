<script setup>
import { ref, provide, computed } from "vue"
import Icon from "./components/Icon.vue"
import IconDetails from "./components/IconDetail.vue"
import HistoryItem from "./components/HistoryItem.vue"

const showDetails = ref(false)
const title = ref("")
const categories = ref([])

const data = [
  { id: 1, title: "Youtube", categories: ["Tagesschau", "Coding", "Motivation", "Dokumentation"] },
  { id: 2, title: "Coding", categories: ["MyLife", "alte Website", "CodeWars"] },
  { id: 3, title: "Sport", categories: ["Joggen", "Calesthetics", "Sex"] },
];

const showInfo = (obj) => {
  showDetails.value = true
  title.value = obj.title
  categories.value = obj.categories
}

const receivedData = ref([])
function handleChildData(data) {
  receivedData.value.push(data)
}

provide("sendToApp", handleChildData)
</script>

<template>
  <v-app>
    <v-main>
      <h1>Themen</h1>
      <div class="topics">
        <icon v-for="d in data" :key="d.id" @click="showInfo(d)">
          <h3>{{ d.title }}</h3>
        </icon>
      </div>
      <div class="middle">
        <icon-details v-if="showDetails" :title="title" :categories="categories">
        </icon-details>
      </div>
      <div class="right">
        <h1>Historie</h1>
      </div>
      <div class="historyContent">
        <history-item v-for="d in receivedData" :key="d" :object="d"></history-item>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  margin: 30px;
}

.topics {
  display: flex;
  flex: 1;
}

.middle {
  display: flex;
  
  flex: 1;
  border: solid black 3px;
  border-radius: 20px;
  align-items: center;
}
.historyContent {
  display: flex;
  gap: 10px;
  padding: 10px;
  margin: 10px;
} 
</style>
