import * as path from 'path'
import { ACCEPTED_EXTS } from './constants'

export default (filePath) => {
  const potentialExt = path.extname(filePath)
  const isExt = ACCEPTED_EXTS.indexOf(potentialExt) !== -1
  let result = ''
  
  if (isExt) {
    result = filePath.replace(new RegExp('\\' + potentialExt + '$'), '')
  } else {
    result = filePath
  }

  if (result.endsWith('/index')) {
    return result.replace(/\/index$/, '')
  } else {
    return result
  }
}
