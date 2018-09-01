import { isArray, isObject } from '../src/utils'

describe('utils', () => {
  it('test isArray', () => {
    expect(isArray([])).toBe(true)
    expect(isArray({})).toBe(false)
    expect(isArray('')).toBe(false)
  })

  it('test isObject', () => {
    expect(isObject([])).toBe(false)
    expect(isObject({})).toBe(true)
    expect(isObject('')).toBe(false)
  })
})