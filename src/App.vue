<script setup>
import { ref, provide, onMounted, computed } from "vue"
import { loadData } from "./services/api.js"
import Icon from "./components/Icon.vue"
import IconDetail from "./components/IconDetail.vue"
import HistoryItem from "./components/HistoryItem.vue"
import DayItem from "./components/DayItem.vue"
import { useDataFormatter } from "./composable/useDataFormatter.js"
import { VPie } from 'vuetify/labs/VPie'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const showDetails = ref(false)
const title = ref("")
const categories = ref([])
const color = ref("")
const selectedItem = ref(null)
const receivedData = ref([])
const savedData = ref([])
const selectedDate = ref(new Date())
const selectedHistorieDate = ref(null)
const range = ref(false)
const { dateFormat } = useDataFormatter()


const dataOld = [
  { id: 1, title: "Youtube", categories: ["Tagesschau", "Coding", "Motivation", "Dokumentation"], color: "lightcoral" },
  { id: 2, title: "Coding", categories: ["MyLife", "alte Website", "CodeWars"], color: "lightblue" },
  { id: 3, title: "Sport", categories: ["Joggen", "Calesthetics", "Fitnessstudio"], color: "lightgreen" },
  { id: 4, title: "Telefonieren", categories: ["Familie", "Freunde", "Arbeit"], color: "lightyellow" },
  { id: 5, title: "Freizeit", categories: ["Bar", "Cafe und Kuchen"], color: "lightpink" },
  { id: 6, title: "Notizen", categories: ["Tagebuch", "Ideen", "Todo"], color: "lightgray" },
  { id: 7, title: "Haare schneiden", categories: ["Tim", "Max", "Luis", "Lui", "Basti"], color: "lightseagreen" }
];

const data = [
  {
    id: 1, title: "Youtube", categories: [
      { title: "Tagesschau", color: "lightcoral" },
      { title: "Coding", color: "lightgreen" },
      { title: "Motivation", color: "lightblue" },
      { title: "Dokumentation", color: "lightyellow" }
    ], color: "lightcoral"
  },
  {
    id: 2, title: "Coding", categories: [
      { title: "MyLife", color: "lightblue" },
      { title: "alte Website", color: "lightgreen" },
      { title: "CodeWars", color: "lightyellow" }
    ], color: "lightblue"
  },
  {
    id: 3, title: "Sport", categories: [
      { title: "Joggen", color: "lightgreen" },
      { title: "Calesthetics", color: "lightblue" },
      { title: "Fitnessstudio", color: "lightcoral" }
    ], color: "lightgreen"
  },
  {
    id: 4, title: "Telefonieren", categories: [
      { title: "Familie", color: "lightyellow" },
      { title: "Freunde", color: "lightcoral" },
      { title: "Arbeit", color: "lightblue" }
    ], color: "lightyellow"
  },
  {
    id: 5, title: "Freizeit", categories: [
      { title: "Bar", color: "lightpink" },
      { title: "Cafe und Kuchen", color: "lightgreen" }
    ], color: "lightpink"
  },
  {
    id: 6, title: "Notizen", categories: [
      { title: "Tagebuch", color: "lightgray" },
      { title: "Ideen", color: "lightcoral" },
      { title: "Todo", color: "lightblue" }
    ], color: "lightgray"
  },
  {
    id: 7, title: "Haare schneiden", categories: [
      { title: "Tim", color: "lightseagreen" },
      { title: "Max", color: "lightpink" },
      { title: "Luis", color: "lightyellow" },
      { title: "Lui", color: "lightcoral" },
      { title: "Basti", color: "lightblue" }
    ], color: "lightseagreen"
  }
]

const showInfo = (obj) => {
  showDetails.value = true
  title.value = obj.title
  categories.value = obj.categories
  color.value = obj.color
  selectedItem.value = obj
}

onMounted(async () => {
  savedData.value = await loadData()
})

provide("sendToApp", handleChildData)

function handleChildData(data) {
  const newData = { ...data, date: dateFormat(selectedDate.value) }
  console.log(newData)
  receivedData.value.push(newData)
}

provide("reloadDayData", async (id) => {
  receivedData.value = receivedData.value.filter((item) => item.id !== id)
})

provide("reloadData", async () => {
  savedData.value = await loadData()
})

const dateSpecificData = computed(() => {
  if (!selectedHistorieDate.value) {
    return []
  }
  if (selectedHistorieDate.value instanceof Array) {
    const startDate = dateFormat(selectedHistorieDate.value[0])
    const endDate = dateFormat(selectedHistorieDate.value[1])
    const filteredData = savedData.value.filter(item => item.date >= startDate && item.date <= endDate)
    return filteredData
  } else {
    const filteredData = savedData.value.filter(item => item.date === dateFormat(selectedHistorieDate.value))
    return filteredData
  }
})
const withValueData = computed(() => {
  return calculateData(dateSpecificData.value)
})

function calculateData(data) {
  const uniqueData = data.reduce((acc, item) => {
    const existingItem = acc.find(i => i.title === item.title)
    if (existingItem) {
      existingItem.hours = Number(existingItem.hours) + Number(item.hours)
      existingItem.minutes = Number(existingItem.minutes) + Number(item.minutes)
    } else {
      acc.push({ ...item })
    }
    return acc
  }, [])
  const minutes = uniqueData.reduce((acc, item) => {
    acc += Number(item.hours * 60) + Number(item.minutes)
    return acc
  }, 0)
  console.log('Total minutes:', minutes)
  const result = uniqueData.map(item => {
    return {
      ...item,
      value: Math.round(((Number(item.hours * 60) + Number(item.minutes)) / minutes) * 100)
    }
  })
  return result
}

const computedTimeRange = computed(() => {
  if (selectedHistorieDate.value instanceof Array) {
    const start = dateFormat(selectedHistorieDate.value[0])
    const end = dateFormat(selectedHistorieDate.value[1])
    return `${start} bis ${end}`
  } else {
    return dateFormat(selectedHistorieDate.value)
  }
})

const doubleTitle = computed(() => {
  const titleCount = {}
  dateSpecificData.value.forEach(item => {
    if (titleCount[item.title]) {
      titleCount[item.title] += 1
    } else {
      titleCount[item.title] = 1
    }
  })

  // Nur Titel, die mehrfach vorkommen
  const titlesSet = new Set()
  Object.keys(titleCount).filter(key => titleCount[key] > 1).forEach(title => titlesSet.add(title))

  console.log('Duplicate Titles:', titlesSet)
  return titlesSet
})

const doubleTitleData = computed(() => {
  const titles = Array.from(doubleTitle.value)
  const result = titles.map(title => {
    // Finde alle Items mit diesem Titel
    const items = dateSpecificData.value.filter(item => item.title === title)
    console.log('Items for title', title, items)
    // Flache Liste aller Kategorien dieser Items
    const categorieTitles = items.flatMap(item =>
      (item.categories || []).map(cat => cat.title)
    )

    const categorieColors = items.flatMap(item =>
      (item.categories || []).map(cat => cat.color)
    )
    return {
      categorieTitles,
      categorieColors
    }
  })
  console.log('Double Title Data:', result)
  return result
})

</script>
<template>
  <v-app>
    <v-main>
      <div class="top">
        <v-date-picker show-adjacent-months v-model="selectedDate"></v-date-picker>
        <div class="container">
          <div class="topics">
            <icon v-for="d in data" :key="d.id" @click="showInfo(d)">
              <h3>{{ d.title }}</h3>
            </icon>
          </div>
          <div class="details">
            <icon-detail v-if="showDetails" :title="title" :categories="categories" :color="color"
              :object="selectedItem">
            </icon-detail>
          </div>
        </div>
      </div>
      <h1>{{ dateFormat(selectedDate) }}</h1>
      <div class="heuteContent">
        <day-item v-for="d in receivedData" :key="d.id" :object="d"></day-item>
      </div>
      <hr>
      </hr>
      <h1>Historie</h1>
      <div class="history">
        <div class="calendar">
          <v-switch label="Zeitraum" v-model="range"></v-switch>
          <VueDatePicker v-model="selectedHistorieDate" :range="range" inline />
        </div>
        <div class="historyDetails" v-if="selectedHistorieDate">
          <div class="heading">
            <h3>festgelegter Zeitraum: {{ computedTimeRange }}</h3>
          </div>
          <div class="historyItems">
            <history-item v-for="d in dateSpecificData" :key="d.id" :object="d">
            </history-item>
          </div>
          <div class="pie">
            <v-pie title="Aktivitäten" animation :palette="withValueData.color" :items="withValueData" tooltip></v-pie>

            <p v-for="d in doubleTitleData" :key="d.title">{{ d }}</p>
            <v-pie :title="`Kategorie: ${doubleTitleData}`" :items="doubleTitleData" tooltip></v-pie>

          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  margin: 30px;
}

.top {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.topics {
  display: flex;
}

.details {
  display: flex;
}

.pie {
  display: flex;

}

.heuteContent {
  display: flex;
  gap: 10px;
  padding: 10px;
  margin: 10px;
}

.history {
  display: flex;
}

.historyDetails {
  display: flex;
  flex-direction: column;
  gap: 30px;
  border: 3px solid black;
  border-radius: 20px;
  margin: 20px;
  padding: 10px;
}

.historyItems {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
