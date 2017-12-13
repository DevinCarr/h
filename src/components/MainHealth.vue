<template>
  <div>
    <input type="file" id="fileElem" accept="application/json" style="display:none" @change="handleFile()">
    <nav class="navbar navbar-expand-lg justify-content-between navbar-dark bg-dark">
      <a class="navbar-brand" href="#">D&amp;D Health</a>
      <div class="add-buttons">
        <button type="button" class="btn btn-secondary" @click="addItem()">Add New</button>
        <button type="button" class="btn btn-secondary" @click="triggerInput()">Import</button>
      </div>
    </nav>
    <div class="main">
      <div class="container">
        <div class="row health-list">
          <div class="health-list">
            <Character
              v-for="health in healthList"
              v-on:remove="removeItem"
              v-bind:health="health"
              v-bind:key="health.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store.js'
import Character from './character'

let id = 1
let supportFileReader = window.FileReader !== undefined

export default {
  components: {
    Character
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
    triggerInput () {
      let fileElem = document.getElementById('fileElem')
      if (fileElem) {
        fileElem.click()
      }
    },
    handleFile () {
      let files = document.getElementById('fileElem').files
      if (files.length && supportFileReader) {
        let reader = new FileReader()
        reader.onload = ((addItemFunc) => { return (e) => { addItemFunc(e.target.result) } })(this.addItem)
        reader.readAsBinaryString(files[0])
      }
      // No json selected
    },
    importCharacter (json) {
      let valid = json.hasOwnProperty('max') &&
                  json.hasOwnProperty('name') &&
                  json.hasOwnProperty('spellslots') &&
                  json.hasOwnProperty('ac')
      if (!valid) return undefined

      let character = {
        id: id++,
        current: json.max,
        max: json.max,
        maxSet: true,
        ac: json.ac,
        acSet: true,
        name: json.name,
        nameSet: true,
        spellslots: []
      }
      json.spellslots.forEach((spell, index) => {
        character.spellslots.push({available: spell, max: spell})
      })
      return character
    },
    addItem (input) {
      if (input !== undefined) {
        let inputCharacter = this.importCharacter(JSON.parse(input))
        if (inputCharacter !== undefined) {
          this.healthList.push(inputCharacter)
        }
      } else {
        this.healthList.push({
          id: id++,
          current: 0,
          max: 10,
          maxSet: false,
          ac: 13,
          acSet: false,
          name: '',
          nameSet: false,
          spellslots: [{ available: 2, max: 2 }, { available: 2, max: 2 }]
        })
      }
    },
    removeItem (healthId) {
      this.healthList = this.healthList.filter(item => item.id !== healthId)
    }
  }
}
</script>

<style>
.main {
  margin-bottom: 40px;
}

h1, h2 {
  font-weight: normal;
}

.health-list {
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;
}

header .add-buttons {
  padding-top: 8px;  
}
</style>
