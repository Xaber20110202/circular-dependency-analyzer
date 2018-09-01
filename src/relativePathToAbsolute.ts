import * as path from 'path'
import { isObject } from './utils'

/**
 * @file transfrom relative path (if it is)
 * @param {string} filePath - path of the file
 * @param {string[]} requiredPaths - relative path accoriding to the file
 * @return {string[]} path - filePaths accoriding to the entry()
 */
export default (from, to, alias?: object) => {
  let absolute = ''

  if (isObject(alias)) {
    Object.keys(alias).forEach(key => {
      if (to.startsWith(key)) {
        absolute = to.replace(key, `${process.cwd()}/${alias[key]}`)
      }
    })
    if (absolute) {
      return absolute
    }
  }

  if (to[0] === '.') {
    absolute = path.resolve(from, '..', to)
    return absolute
  } else {
    return to
  }
}
