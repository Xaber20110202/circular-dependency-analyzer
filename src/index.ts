import getPathsSync from './getPathsSync'
import getRequiredInfoSync from './getRequiredInfoSync'
import relativePathToAbsolute from './relativePathToAbsolute'
import deleteExtAndIndex from './deleteExtAndIndex'

export const getFileRequiresStack = (dir: string, alias?: object) => {
  const filelist = getPathsSync(dir)
  const stack = {}
  filelist.forEach(file => {
    const requires = getRequiredInfoSync(file)
    const absoluteFile = process.cwd() + '/' + file
    stack[deleteExtAndIndex(absoluteFile)] = requires.map(req => {
      const absolutePath = relativePathToAbsolute(file, req, alias)
      return deleteExtAndIndex(absolutePath)
    })
  })
  return stack
}

// inspired from https://github.com/aackerman/circular-dependency-plugin/blob/master/index.js#L68
const isCircularReference = function (reqsStack, file, seenModules) {
  seenModules[file] = true
  if (!reqsStack[file]) {
    return false
  }

  for (let dep of reqsStack[file]) {
    if (dep in seenModules) {
      return [
        file,
        dep,
      ]
    }

    let maybeCyclicalPathsList = isCircularReference(reqsStack, dep, { ...seenModules })
    if (maybeCyclicalPathsList) {
      return maybeCyclicalPathsList
    }
  }
}

export const getCircularReferences = (dir: string, alias?: object) => {
  const reqsStack = getFileRequiresStack(dir, alias)
  const filelist = Object.keys(reqsStack)
  const circles = []
  filelist.forEach(file => {
    const arr = isCircularReference(reqsStack, file, {})
    if (arr && circles.every(item => {
      const a0 = arr[0]
      const a1 = arr[1]
      const i0 = item[0]
      const i1 = item[1]
      return a0 + a1 !== i0 + i1 &&
        a0 + a1 !== i1 + i0
    })) {
      circles.push(arr)
    }
  })
  return circles
}
