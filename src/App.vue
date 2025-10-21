<script setup>
import { ref } from "vue"
import Icon from "./components/Icon.vue"
import IconDetails from "./components/IconDetail.vue"

const showDetails = ref(false)
const title = ref("")
const desc = ref("")

const obj = [
  { id: 1, title: "Apfel", desc: "Das ist ein Apfel" },
  { id: 2, title: "Birne", desc: "Das ist eine Birne" },
  { id: 3, title: "Banane", desc: "Das ist eine Banane" },
];

const showInfo = (obj) => {
  showDetails.value = true
  title.value = obj.title
  desc.value = obj.desc
}
</script>

<template>
  <v-app>
    <v-main>
      <div class="left">
        <icon v-for="o in obj" :key="o.id" @click="showInfo(o)">
          <h1>{{ o.title }}</h1>
        </icon>
      </div>
      <div class="middle">
        <icon-details 
          v-if="showDetails"
          v-slot:title>
          {{ title }}
        </icon-details>
        <icon-details 
          v-if="showDetails"
          v-slot:desc>
          {{ desc }}
        </icon-details>
      </div>
      <div class="right">2</div>
    </v-main>
  </v-app>
</template>

<style scoped>

.v-main {
  display: flex;
}
.left {
  display: flex;
  flex: 1;
}
.middle {
  flex: 1;
  border: solid black 3px;
}
.right {
  display: flex;
  flex: 1;
}
</style>

