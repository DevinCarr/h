<template>
  <div class="card">
    <div class="health-header card-header">
      <input
        type="text"
        placeholder="Character Name"
        v-if="!health.nameSet"
        v-model="health.name"
        @keydown.enter="health.nameSet=health.name.trim().length>0"
      ></input>
      <span v-else @click="health.nameSet = false">{{ health.name }}</span>
      <span v-if="minimize" v-bind:class="{ 'text-danger': alive() }">{{ health.current }}</span>
      <div>
        <button @click="remove()" type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <button @click="minimize = !minimize" type="button" class="close" aria-label="Minimize">
          <span aria-hidden="true">&minus;</span>
        </button>
      </div>
    </div>
    <div v-if="!minimize">
      <div class="card-body" >
        <div v-bind:class="{ 'text-danger': alive() }">
          <span class="health-current">{{ health.current }} / </span>
          <input
            type="number"
            placeholder="Max"
            class="health-current"
            v-if="!health.maxSet"
            v-model="health.max"
            @keydown.enter="health.maxSet = true"
          ></input>
          <span class="health-current" v-else @click="health.maxSet = false">{{ health.max }}</span>
        </div>
        <div style="align-self:center">
          <input
            type="number"
            placeholder="12"
            class="health-current"
            v-if="!health.acSet"
            v-model="health.ac"
            @keydown.enter="health.acSet = true"
          ></input>
          <span class="card-subtitle mb-2 text-muted" v-else @click="health.acSet = false">AC{{ health.ac }}</span>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="change-health list-group-item">
          <button @click="increase()" type="button" class="change-value btn btn-success btn-lg btn-block">+</button>
          <input
            style="text-align:center"
            class="health-change-input"
            type="number"
            placeholder="3"
            v-model="changeValue"
          ></input>
          <button @click="decrease()" type="button" class="change-value btn btn-danger btn-lg btn-block">-</button>
        </li>
        <li class="list-group-item">
          <button @click="healFull()" type="button" class="btn btn-primary btn-sm">Heal</button>
          <button @click="kill()" type="button" class="btn btn-warning btn-sm">Kill</button>
        </li>
        <SpellSlot
          v-bind:spellslots="health.spellslots"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import SpellSlot from './SpellSlot'
export default {
  components: {
    SpellSlot
  },
  data: () => ({
    changeValue: 3,
    characterName: '',
    minimize: false
  }),
  props: ['health'],
  methods: {
    remove () {
      this.$emit('remove', this.health.id)
    },
    checkInput () {
      if (this.changeValue === undefined) {
        return false
      }
      return true
    },
    increase () {
      if (this.checkInput()) {
        this.health.current += Number(this.changeValue)
      }
    },
    decrease () {
      if (this.checkInput()) {
        this.health.current -= Number(this.changeValue)
      }
    },
    healFull () {
      this.health.current = Number(this.health.max)
    },
    kill () {
      this.health.current = 0
    },
    alive () {
      return this.health.current <= 0
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

.card-subtitle {
  font-size: 2em;
}

.card-body {
  display: flex;
  justify-content: space-between;
}

.health-current {
  font-size: 3em;
  width: 2em;
}

input.health-current {
  font-size: 3em;
}

.health-header {
  display: inline-flex;
  justify-content: space-between;
}

li.change-health {
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
</style>