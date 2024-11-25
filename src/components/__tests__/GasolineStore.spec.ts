import { setActivePinia, createPinia } from 'pinia'
import { useGasolineStore } from '@/stores/gasoline'
import { pool } from '@/config/database'
import { beforeEach, describe, expect, it, afterAll } from 'vitest'

describe('Gasoline Store', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())

    try {
      // Clear test database before each test
      await pool.query('TRUNCATE TABLE gasolines RESTART IDENTITY CASCADE')
      console.log('Cleared test database')
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

    const testGasoline = {
      id: 1,
      buy_date: new Date('2024-03-20'),
      distance: 100,
      value: 50,
    }

    await store.add(testGasoline)
    await store.loadGasolines()

    expect(store.gasolines).toHaveLength(1)
    expect(store.gasolines[0]).toEqual({
      id: testGasoline.id,
      buy_date: testGasoline.buy_date.toISOString().split('T')[0],
      distance: testGasoline.distance,
      value: testGasoline.value,
    })
  })

  it('removes a gasoline record', async () => {
    const store = useGasolineStore()
    const testGasoline = {
      id: 1,
      buy_date: new Date('2024-03-20'),
      distance: 100,
      value: 50,
    }

    await store.add(testGasoline)
    await store.loadGasolines()
    expect(store.gasolines).toHaveLength(1)

    await store.remove(1)
    expect(store.gasolines).toHaveLength(0)
  })

  it('updates a gasoline record', async () => {
    const store = useGasolineStore()
    const testGasoline = {
      id: 1,
      buy_date: new Date('2024-03-20'),
      distance: 100,
      value: 50,
    }

    await store.add(testGasoline)

    const updatedGasoline = {
      ...testGasoline,
      distance: 200,
      value: 75,
    }

    await store.update(updatedGasoline)
    await store.loadGasolines()

    expect(store.gasolines[0].distance).toBe(200)
    expect(store.gasolines[0].value).toBe(75)
  })
})
