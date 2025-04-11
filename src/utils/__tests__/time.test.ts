import { formatTime } from '../time'

describe('formatTime', () => {
  const mockDate = new Date('2023-01-01T12:00:00')
  const originalDate = global.Date

  beforeAll(() => {
    global.Date = class extends Date {
      constructor(date?: any) {
        if (date) {
          super(date)
        } else {
          super(mockDate)
        }
      }
    } as any
  })

  afterAll(() => {
    global.Date = originalDate
  })

  it('should format time for today', () => {
    const today = new Date(mockDate)
    expect(formatTime(today)).toBe('12:00')
  })

  it('should format time for yesterday', () => {
    const yesterday = new Date(mockDate)
    yesterday.setDate(yesterday.getDate() - 1)
    expect(formatTime(yesterday)).toBe('昨天 12:00')
  })

  it('should format time for this week', () => {
    const thisWeek = new Date(mockDate)
    thisWeek.setDate(thisWeek.getDate() - 3)
    expect(['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']).toContain(formatTime(thisWeek))
  })

  it('should format time for this year', () => {
    const thisYear = new Date('2023-02-01T12:00:00')
    expect(formatTime(thisYear)).toBe('2月1日')
  })

  it('should format time for previous year', () => {
    const previousYear = new Date('2022-01-01T12:00:00')
    expect(formatTime(previousYear)).toBe('2022年1月1日')
  })

  it('should throw error for invalid timestamp', () => {
    expect(() => formatTime('invalid')).toThrow('Invalid timestamp')
  })
}) 