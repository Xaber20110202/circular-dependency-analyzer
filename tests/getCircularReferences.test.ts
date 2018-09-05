import { getCircularReferences } from '../src/index'
import testCircular2 from './getCircularReferencesHelper'

export const testCircular = 'test'
console.log(testCircular2)

describe('getCircularReferences', () => {
  it('should get empty array', () => {
    const circules = getCircularReferences('src')
    expect(circules).toEqual([])
  })

  it('should get an array with one item', () => {
    const aliasFileKey = 'src/getPathsSync'
    const circules = getCircularReferences('src', {
      fs: aliasFileKey
    })
    const circuleFileKey = `${process.cwd()}/${aliasFileKey}`
    expect(circules).toEqual([
      [
        circuleFileKey,
        circuleFileKey,
      ]
    ])
  })

  it('should get an array with one item from test dir', () => {
    const circules = getCircularReferences('tests')
    expect(circules.length).toBe(2)

    const expected = [
      'getCircularReferences.test', 'getCircularReferencesHelper',
    ].map(x => `${process.cwd()}/tests/${x}`)
    
    expect(circules[0][0]).toBe(circules[1][1])
    expect(circules[0][1]).toBe(circules[1][0])

    expect(expected.sort()).toEqual(circules[0].sort())
  })
})