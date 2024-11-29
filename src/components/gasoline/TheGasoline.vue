<script setup lang="ts">
import { useGasolineStore } from '@/components/gasoline/gasolineStore'
import { Gasoline } from '@/components/gasoline/gasoline'
import { ref, onMounted } from 'vue'
import GasolineForm from './GasolineForm.vue'
import GasolineTable from './GasolineTable.vue'

const gasolineStore = useGasolineStore()
const editMode = ref(false)
const formData = ref({
  id: 0,
  date: new Date().toISOString().split('T')[0],
  distance: 0,
  value: 0,
})

console.log('TheGasoline')

onMounted(async () => {
  try {
    await gasolineStore.loadGasolines()
    console.log('gasolineStore', gasolineStore.gasolines)
  } catch (error) {
    console.error('Error loading gasolines:', error)
  }
})

const submitForm = async () => {
  const newGasoline = new Gasoline(
    editMode.value ? formData.value.id : 0,
    formData.value.date,
    formData.value.distance,
    formData.value.value,
  )

  if (editMode.value) {
    await gasolineStore.update(newGasoline)
  } else {
    await gasolineStore.add(newGasoline)
  }

  resetForm()
}

const resetForm = () => {
  formData.value = {
    id: 0,
    date: new Date().toISOString().split('T')[0],
    distance: 0,
    value: 0,
  }
  editMode.value = false
}

const editGasoline = (gasoline: Gasoline) => {
  formData.value = {
    id: gasoline.id,
    date: gasoline.buy_date,
    distance: gasoline.distance,
    value: gasoline.value,
  }
  editMode.value = true
}

const removeGasoline = async (id: number) => {
  await gasolineStore.remove(id)
}
</script>

<template>
  <div>
    <GasolineForm
      :edit-mode="editMode"
      :form-data="formData"
      @submit="submitForm"
      @reset="resetForm"
    />
    <GasolineTable
      :gasolines="gasolineStore.gasolines"
      @edit="editGasoline"
      @remove="removeGasoline"
    />
  </div>
</template>
