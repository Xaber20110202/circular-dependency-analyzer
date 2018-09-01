import * as fs from 'fs'

// 当使用new RegExp("pattern")方法的时候不要忘记将\它自己进行转义，因为\在字符串里面也是一个转义字符。
const patt = /require\(['|"](.*?)['|"]\)/g
const es6Patt = /import\s.*?['|"](.*?)['|"]/g

/**
 * get required files of the input filePath
 * @param {string} filePath
 * @return {array} results
 */
const getRequireInfoSync = (filePath) => {
  let result = null
  const results = []
  const data = fs.readFileSync(filePath, 'utf-8')

  while ((result = patt.exec(data)) !== null) {
    results.push(result[1])
  }

  // es6 import
  while ((result = es6Patt.exec(data)) !== null) {
    results.push(result[1])
  }
  return results
};

export default getRequireInfoSync
