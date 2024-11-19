import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Gasoline } from '@/modules/gasoline'

export const useGasolineStore = defineStore('gasoline', () => {
  const gasolines = ref<Gasoline[]>([])

  function add(gasoline: Gasoline) {
    gasolines.value.push(gasoline)
  }

  function remove(id: number) {
    gasolines.value = gasolines.value.filter((g) => g.id !== id)
  }

  function update(updatedGasoline: Gasoline) {
    const index = gasolines.value.findIndex((g) => g.id === updatedGasoline.id)
    if (index !== -1) {
      gasolines.value[index] = updatedGasoline
    }
  }

  return { gasolines, add, remove, update }
})
