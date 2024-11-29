<script setup lang="ts">
import { Gasoline } from './gasoline'

interface Props {
  gasolines: Gasoline[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  edit: [gasoline: Gasoline]
  remove: [id: number]
}>()
</script>

<template>
  <table class="gasoline-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Distance (Km)</th>
        <th>Value (¥)</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="gasoline in gasolines" :key="gasoline.id" class="gasoline-list-item">
        <td>{{ gasoline.id }}</td>
        <td>{{ gasoline.buy_date }}</td>
        <td>{{ gasoline.distance }}Km</td>
        <td>¥{{ gasoline.value }}</td>
        <td>
          <button @click="emit('edit', gasoline)">
            <i class="fas fa-edit"></i>
          </button>
          <button @click="emit('remove', gasoline.id)">
            <i class="fas fa-trash-can"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.gasoline-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  color: #fff;
}

th,
td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #333;
}

th {
  background-color: #2a2a2a;
  font-weight: 600;
  color: #fff;
}

tr:hover {
  background-color: #2a2a2a;
}

button {
  padding: 6px 12px;
  margin: 0 4px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #333;
}

.fa-edit {
  color: #4caf50;
}

.fa-trash-can {
  color: #f44336;
}

/* Make the table responsive */
@media (max-width: 768px) {
  .gasoline-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
