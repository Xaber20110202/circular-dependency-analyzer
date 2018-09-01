import deleteExtAndIndex from '../src/deleteExtAndIndex'
import { ACCEPTED_EXTS } from '../src/constants'

describe('deleteExtAndIndex', () => {
  it('should return path without extname', () => {
    ACCEPTED_EXTS.forEach(extname => {
      const name = 'X/X'
      expect(deleteExtAndIndex(name + extname)).toBe(name)
    })
  })

  it('should return path without index and extname', () => {
    ACCEPTED_EXTS.forEach(extname => {
      const name = 'X/X/index'
      expect(deleteExtAndIndex(name + extname)).toBe('X/X')
    })
  })

  it('should return path with extname', () => {
    ACCEPTED_EXTS.forEach(extname => {
      const name = 'X/X.ruby'
      expect(deleteExtAndIndex(name)).toBe(name)
    })
  })

  it('should return path with index and extname', () => {
    ACCEPTED_EXTS.forEach(extname => {
      const name = 'X/X/index.ruby'
      expect(deleteExtAndIndex(name)).toBe(name)
    })
  })
})