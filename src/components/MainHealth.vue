<template>
  <div>
    <input type="file" id="fileElem" accept="application/json" style="display:none" @change="handleFile()">
    <nav class="navbar navbar-expand-lg justify-content-between navbar-dark bg-dark">
      <a class="navbar-brand" href="#">D&amp;D Health</a>
      <div class="add-buttons">
        <button type="button" class="btn btn-secondary" @click="addItem()">Add New</button>
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#presetModal">Presets</button>
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
    <!-- Modal -->
    <div class="modal fade" id="presetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="presetModalLabel">Character Presets</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <a data-dismiss="modal" @click="fetchFile('/static/endyn.json')" href="#"><h4>Endyn</h4></a>
            <h4>Beast Shapes</h4>
            <ul>
              <li><a data-dismiss="modal" @click="fetchFile('/static/ape.json')" href="#">Ape (19/12)</a></li>
              <li><a data-dismiss="modal" @click="fetchFile('/static/black_bear.json')" href="#">Black Bear (19/11)</a></li>
              <li><a data-dismiss="modal" @click="fetchFile('/static/reef_shark.json')" href="#">Reef Shark (22/12)</a></li>
            </ul>
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
    fetchFile (url) {
      let result = fetch(url)
      result.then(response => {
        console.log('response', response)
        console.log('header', response.headers.get('Content-Type'))
        return response.text()
      }).then(jsonText => {
        if (jsonText !== undefined) {
          this.addItem(jsonText)
        }
      }).catch(ex => {
        console.log('failed', ex)
      })
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

.modal-body {
  text-align: left;
}

header .add-buttons {
  padding-top: 8px;  
}
</style>
