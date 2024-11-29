import { setActivePinia, createPinia } from 'pinia'
import { useGasolineStore } from '@/components/gasoline/gasolineStore'
import { pool } from '@/config/database'
import { beforeEach, describe, expect, it, afterAll } from 'vitest'
import { Gasoline } from '@/components/gasoline/gasoline'

describe('Gasoline Store', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())

    try {
      // Clear test database before each test
      await pool.query('TRUNCATE TABLE gasolines RESTART IDENTITY CASCADE')
    } catch (error) {
      console.error('Error clearing test database:', error)
      throw error
    }
  })

  afterAll(async () => {
    await pool.end()
  })

  it('adds a gasoline record', async () => {
    const store = useGasolineStore()

    const testGasoline = new Gasoline(1, '2024-03-20', 100, 50)

    await store.add(testGasoline)
    await store.loadGasolines()

    expect(store.gasolines).toHaveLength(1)
    expect(store.gasolines[0]).toEqual(testGasoline)
  })

  it('removes a gasoline record', async () => {
    const store = useGasolineStore()
    const testGasoline = new Gasoline(1, '2024-03-20', 100, 50)
    await store.add(testGasoline)
    await store.loadGasolines()
    expect(store.gasolines).toHaveLength(1)

    await store.remove(1)
    expect(store.gasolines).toHaveLength(0)
  })

  it('updates a gasoline record', async () => {
    const store = useGasolineStore()
    const testGasoline = new Gasoline(1, '2024-03-20', 100, 50)
    await store.add(testGasoline)

    const updatedGasoline = new Gasoline(1, '2024-03-20', 200, 75)
    await store.update(updatedGasoline)
    await store.loadGasolines()

    expect(store.gasolines[0].distance).toBe(200)
    expect(store.gasolines[0].value).toBe(75)
  })
})
