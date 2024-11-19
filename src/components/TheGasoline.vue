<script setup lang="ts">
import { useGasolineStore } from '@/stores/gasoline'
import { Gasoline } from '@/modules/gasoline'
import { ref } from 'vue'
import GasolineForm from './GasolineForm.vue'
import GasolineTable from './GasolineTable.vue'

const gasolineStore = useGasolineStore()
const editMode = ref(false)
const formData = ref({
  date: '',
  amount: 0,
  value: 0,
})

const submitForm = () => {
  const newGasoline = new Gasoline(
    0,
    new Date(formData.value.date),
    formData.value.amount,
    formData.value.value,
  )

  if (editMode.value) {
    gasolineStore.update(newGasoline)
  } else {
    gasolineStore.add(newGasoline)
  }

  resetForm()
}

const resetForm = () => {
  formData.value = {
    date: '',
    amount: 0,
    value: 0,
  }
  editMode.value = false
}

const editGasoline = (gasoline: Gasoline) => {
  formData.value = {
    date: gasoline.buy_date.toISOString().split('T')[0],
    amount: gasoline.amount,
    value: gasoline.value,
  }
  editMode.value = true
}

const removeGasoline = (id: number) => {
  gasolineStore.remove(id)
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
