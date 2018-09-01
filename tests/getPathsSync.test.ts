import getPathsSync from '../src/getPathsSync'

const srcFileList = [
  'src/constants.ts',
  'src/deleteExtAndIndex.ts',
  'src/getPathsSync.ts',
  'src/getRequiredInfoSync.ts',
  'src/index.ts',
  'src/relativePathToAbsolute.ts',
  'src/utils.ts',
]

describe('getPathsSync', () => {
  it('should get filelist from ./src', () => {
    const fileList = getPathsSync('./src')
    expect(fileList).toEqual(srcFileList)
  })

  it('should get filelist from ./ and except lib, tests dir', () => {
    const fileList = getPathsSync('./', ['lib', 'tests'])
    expect(fileList).toEqual([
      'package-lock.json',
      'package.json',
      ...srcFileList,
      'tsconfig.json',
    ])
  })
})