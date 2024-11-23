import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Gasoline } from '@/modules/gasoline'

export const useGasolineStore = defineStore('gasoline', () => {
  const gasolines = ref<Gasoline[]>([])
  const lastId = ref(0)

  function add(gasoline: Gasoline) {
    gasolines.value.push(gasoline)
    lastId.value = gasoline.id
  }

  function getNextId() {
    return lastId.value + 1
  }

  function remove(id: number) {
    gasolines.value = gasolines.value.filter((g) => g.id !== id)
  }

  function update(updatedGasoline: Gasoline) {
    console.log(updatedGasoline)
    const index = gasolines.value.findIndex((g) => g.id === updatedGasoline.id)
    if (index !== -1) {
      gasolines.value[index] = updatedGasoline
    }
  }

  return { gasolines, add, remove, update, getNextId }
})
