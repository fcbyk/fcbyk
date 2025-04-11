import { defineQA, sleep, createMenuItem, getRandomElement } from '../mini'
import { QA } from '@/types'

describe('mini utils', () => {
  describe('defineQA', () => {
    it('should return the same QA object', () => {
      const qa: QA = {
        question: { type: 'text', content: 'test', loadingTime: 0 },
        answer: [{ type: 'text', content: 'answer', loadingTime: 0 }]
      }
      expect(defineQA(qa)).toBe(qa)
    })
  })

  describe('sleep', () => {
    it('should resolve after specified time', async () => {
      const start = Date.now()
      await sleep(100)
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(100)
    })
  })

  describe('createMenuItem', () => {
    it('should create menu item with default action', () => {
      const item = createMenuItem('Test')
      expect(item).toEqual({
        label: 'Test',
        action: expect.objectContaining({
          question: expect.objectContaining({
            type: 'text',
            content: 'Test'
          })
        })
      })
    })

    it('should create menu item with custom action', () => {
      const customQA: QA = {
        question: { type: 'text', content: 'custom', loadingTime: 0 },
        answer: [{ type: 'text', content: 'custom answer', loadingTime: 0 }]
      }
      const item = createMenuItem('Test', customQA)
      expect(item).toEqual({
        label: 'Test',
        action: customQA
      })
    })
  })

  describe('getRandomElement', () => {
    it('should return a random element from array', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = getRandomElement(arr)
      expect(arr).toContain(result)
    })

    it('should throw error for empty array', () => {
      expect(() => getRandomElement([])).toThrow('Input must be a non-empty array')
    })

    it('should throw error for non-array input', () => {
      expect(() => getRandomElement(null as any)).toThrow('Input must be a non-empty array')
    })
  })
}) 