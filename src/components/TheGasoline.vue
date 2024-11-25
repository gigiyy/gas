<script setup lang="ts">
import { useGasolineStore } from '@/stores/gasoline'
import { Gasoline } from '@/modules/gasoline'
import { ref } from 'vue'
import GasolineForm from './GasolineForm.vue'
import GasolineTable from './GasolineTable.vue'

const gasolineStore = useGasolineStore()
const editMode = ref(false)
const formData = ref({
  id: 0,
  date: '',
  distance: 0,
  value: 0,
})

const submitForm = async () => {
  const newGasoline = new Gasoline(
    editMode.value ? formData.value.id : 0,
    new Date(formData.value.date),
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
    date: gasoline.buy_date.toISOString().split('T')[0],
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
