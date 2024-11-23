<script setup lang="ts">
import { Gasoline } from '@/modules/gasoline'

interface Props {
  editMode: boolean
  formData: {
    id: number
    date: string
    distance: number
    value: number
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  submit: []
  reset: []
}>()
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <div>
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="formData.date" required />
    </div>
    <div>
      <label for="distance">Distance (Km):</label>
      <input type="number" id="distance" v-model="formData.distance" step="1" min="0" required />
    </div>
    <div>
      <label for="value">Value (¥):</label>
      <input type="number" id="value" v-model="formData.value" step="1" min="0" required />
    </div>
    <div class="form-buttons">
      <button type="submit" class="btn btn-primary">
        {{ editMode ? 'Update' : 'Add' }}
      </button>
      <button type="button" class="btn btn-secondary" @click="emit('reset')">Cancel</button>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  margin: 1rem 0;
  color: #fff;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #fff;
}

input[type='text'],
input[type='number'],
input[type='date'] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: #2a2a2a;
  color: #fff;
}

input[type='text']:focus,
input[type='number']:focus,
input[type='date']:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.form-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background-color: #f8f9fa;
  color: #444;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e9ecef;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Error styles */
.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.input-error {
  border-color: #f44336;
}

/* Responsive styles */
@media (max-width: 768px) {
  form {
    padding: 1rem;
  }

  .form-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
