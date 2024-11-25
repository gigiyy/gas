import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Gasoline } from '@/modules/gasoline'
import { pool } from '@/config/database'

export const useGasolineStore = defineStore('gasoline', () => {
  const gasolines = ref<Gasoline[]>([])

  async function loadGasolines() {
    try {
      gasolines.value = []
      const result = await pool.query('SELECT * FROM gasolines ORDER BY buy_date DESC')
      gasolines.value = result.rows.map(
        (row) => new Gasoline(row.id, new Date(row.buy_date), row.distance, row.value),
      )
    } catch (error) {
      console.error('Error loading gasolines:', error)
    }
  }

  async function add(gasoline: Gasoline) {
    try {
      const result = await pool.query(
        'INSERT INTO gasolines (buy_date, distance, value) VALUES ($1, $2, $3) RETURNING *',
        [gasoline.buy_date, gasoline.distance, gasoline.value],
      )
      const newGasoline = new Gasoline(
        result.rows[0].id,
        new Date(result.rows[0].buy_date),
        result.rows[0].distance,
        result.rows[0].value,
      )
      gasolines.value.unshift(newGasoline)
    } catch (error) {
      console.error('Error adding gasoline:', error)
    }
  }

  async function remove(id: number) {
    try {
      await pool.query('DELETE FROM gasolines WHERE id = $1', [id])
      gasolines.value = gasolines.value.filter((g) => g.id !== id)
    } catch (error) {
      console.error('Error removing gasoline:', error)
    }
  }

  async function update(updatedGasoline: Gasoline) {
    try {
      await pool.query(
        'UPDATE gasolines SET buy_date = $1, distance = $2, value = $3 WHERE id = $4',
        [
          updatedGasoline.buy_date,
          updatedGasoline.distance,
          updatedGasoline.value,
          updatedGasoline.id,
        ],
      )
      const index = gasolines.value.findIndex((g) => g.id === updatedGasoline.id)
      if (index !== -1) {
        gasolines.value[index] = updatedGasoline
      }
    } catch (error) {
      console.error('Error updating gasoline:', error)
    }
  }

  async function getNextId() {
    try {
      const result = await pool.query('SELECT MAX(id) as max_id FROM gasolines')
      return (result.rows[0].max_id || 0) + 1
    } catch (error) {
      console.error('Error getting next ID:', error)
      return 1
    }
  }

  return { gasolines, add, remove, update, getNextId, loadGasolines }
})
