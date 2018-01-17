<template>
  <div class="list-group list-group-flush">
    <li v-for="(slot,index) in spellslots" class="list-group-item spellslots">
        <span @click="updateMax(index)">{{ index + 1}} :</span>
        <div class="progress">
          <div class="progress-bar" role="progressbar" :style="'width:' + slot.available / slot.max * 100.0 + '%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{ slot.available + '/' + slot.max }}</div>
          </div>
        <div>
        <button @click="gain(index)" type="button" class="btn btn-success btn-sm">Gain</button>
        <button @click="use(index)" type="button" class="btn btn-primary btn-sm">Use</button>
      </div>
    </li>
  </div>

</template>

<script>
export default {
  data: () => ({
    current: 0,
    max: 2
  }),
  props: ['spellslots'],
  methods: {
    updateMax (index) {
      let newMax = prompt('New spell slot max for level ' + (index + 1))
      newMax = parseInt(newMax, 10)
      if (newMax === null || newMax === '' || isNaN(newMax)) {
        return null
      }
      if (newMax > 4 || newMax < 0) {
        return null
      }
      let updated = this.spellslots[index]
      if (newMax < updated.available) {
        updated.available = newMax
      }
      updated.max = newMax
      this.spellslots.splice(index, 1, updated)
    },
    use (index) {
      let updated = this.spellslots[index]
      if (updated.available > 0) {
        updated.available -= 1
        this.spellslots.splice(index, 1, updated)
      }
    },
    gain (index) {
      let updated = this.spellslots[index]
      if (updated.available < updated.max) {
        updated.available += 1
        this.spellslots.splice(index, 1, updated)
      }
    }
  }
}
</script>

<style>
.card {
  margin: 1em;
  width: 20em;
}

.name-input {
  font-size: 1em;
}

.card-title {
  font-size: 3em;
}

.health-header {
  display: inline-flex;
  justify-content: space-between;
}

.max-health-input {
  width: 2em;
}

li.spellslots {
  justify-content: space-between;
  display: inline-flex;
}

button.change-value {
  font-size: 2em;
}

button.close {
  margin-left: 0.5em;
}

.health-change-input {
  font-size: 2em;
  width: 3em;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.progress {
  display: inline-flex;
  width: 50%;
  height: 2.5em;
}
</style>