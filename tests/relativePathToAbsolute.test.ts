import relativePathToAbsolute from '../src/relativePathToAbsolute'

describe('relativePathToAbsolute', () => {
  it('should return absolute path processed by alias', () => {
    expect(relativePathToAbsolute('aaa', 'fs', {
      fs: 'src'
    })).toBe(process.cwd() + '/src')
  })

  it('should return fs string', () => {
    expect(relativePathToAbsolute('aaa', 'fs')).toBe('fs')
  })

  it('should return absolute path', () => {
    expect(relativePathToAbsolute('src/utils/index.ts', '../aa.ts')).toBe(process.cwd() + '/src/aa.ts')
  })
})