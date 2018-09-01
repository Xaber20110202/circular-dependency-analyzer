import * as fs from 'fs'
import * as path from 'path'
import { IGNORED_DIRS, ACCEPTED_EXTS } from './constants'
import { isArray } from './utils'

const getIgnoredDirs = (addIgnore) => {
  if (isArray(addIgnore)) {
    return addIgnore.concat(IGNORED_DIRS)
  } else {
    return IGNORED_DIRS
  }
}

/**
 * Get js/json file paths in the dir(expect files inside ignored dirs)；广度优先
 * @param {string} dir - initial dir
 * @param {array} addIgnore - add ignored dirs
 * @return fielList - paths without extension
 */
const getPathsSync = (dir, addIgnore?: string[]) => {
  const files = fs.readdirSync(dir)
  const ignoredDirs = getIgnoredDirs(addIgnore)
  let fileList = []

  files.forEach(file => {
    const currentPath = path.join(dir, file)
    const stats = fs.statSync(currentPath)
    const isFile = stats.isFile()
    const isDirectory = stats.isDirectory()

    if (isFile && ACCEPTED_EXTS.indexOf(path.extname(file)) !== -1) {
      fileList.push(currentPath)

    } else if (isDirectory && ignoredDirs.indexOf(file) === -1) {
      fileList = fileList.concat(getPathsSync(currentPath))
    }
  })

  return fileList
}

export default getPathsSync
