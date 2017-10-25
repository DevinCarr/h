<template>
  <div class="container">
    <div class="row">
      <div class="col col-12 add-health">
        <button type="button" class="btn btn-outline-secondary btn-block" @click="addItem">Add</button>
      </div>
    </div>
    <div class="row health-list">
      <div class="health-list">
        <HealthItem
          v-for="health in healthList"
          v-on:remove="removeItem"
          v-bind:health="health"
          v-bind:key="health.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store.js'
import HealthItem from './HealthItem'

let id = 1

export default {
  components: {
    HealthItem
  },
  data: () => ({
    healthList: store.fetch()
  }),
  watch: {
    healthList: {
      deep: true,
      handler: store.save
    }
  },
  methods: {
    addItem () {
      this.healthList.push({
        id: id++,
        current: 0,
        max: 10,
        maxSet: false,
        name: '',
        nameSet: false
      })
    },
    removeItem (healthId) {
      this.healthList = this.healthList.filter(item => item.id !== healthId)
    }
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

.health-list {
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;
}

.add-health {
  justify-content: center;
  margin-bottom: 1em;
}
</style>
