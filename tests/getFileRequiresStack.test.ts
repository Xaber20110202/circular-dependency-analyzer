import getRequiredInfoSync from '../src/getRequiredInfoSync'
import { getFileRequiresStack } from '../src/index'
import relativePathToAbsolute from '../src/relativePathToAbsolute'
import { ACCEPTED_EXTS } from '../src/constants'

const getFileAndRequiredSyncHelper = (fileKey) => {
  let result = null
  ACCEPTED_EXTS
  .concat(ACCEPTED_EXTS.map(ext => `/index${ext}`))
  .some(ext => {
    try {
      if (!result) {
        const file = fileKey + ext
        result = {
          file,
          reqs: getRequiredInfoSync(file),
        }
        return true
      }
    } catch (e) {
      return false
    }
  })
  return result
}

describe('getFileRequiresStack', () => {
  const alias = {
    fs: 'fs',
  };

  [alias, undefined].forEach(ali => {
    it(`should getFileRequiresStack ${alias ? '(has alias)' : ''}`, () => {
      const stack = getFileRequiresStack('src', ali)
      Object.keys(stack).forEach(fileKey => {
        const { file, reqs } = getFileAndRequiredSyncHelper(fileKey)
        reqs.forEach((req, index) => {
          expect(stack[fileKey][index]).toBe(relativePathToAbsolute(file, req, ali))
        })
      })
    })
  })
})