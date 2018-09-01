import getRequiredInfoSync from '../src/getRequiredInfoSync'
const utils = require('../src/utils')

describe('getRequiredInfoSync', () => {
  it('should get reuired array from this file', () => {
    const arr = getRequiredInfoSync('./tests/getRequiredInfoSync.test.ts')

    expect(arr).toEqual([
      '../src/utils',
      '../src/getRequiredInfoSync',
    ])
  })
})