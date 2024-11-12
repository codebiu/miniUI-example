import fs from 'fs'
import { parseVue3Files } from './parseVueFiles.js'

/**
 * 主函数，读取目录并解析 Vue 3 文件
 * @returns {Promise<void>}
 */
async function main() {
  //   const dirPath = './path/to/your/vue3/files' // 替换为你的 Vue 3 文件目录

  const toFinds = {
    parent: '* @parent       :',
    summary: '* @summary      :',
    description: '* @description  :'
  }
  // 读取读取目录测试
  const dirPath = './src/pages/index/component_mini' // 替换为你的 Vue 3 文件目录
  const results = await parseVue3Files(dirPath, toFinds)
  const resultsStr = JSON.stringify(results, null, 2)
  const result = `const fileList = ${resultsStr}
  
  export{fileList}
  `
  // 新建或覆盖文件并写入内容
  await fs.promises.writeFile(dirPath + '/index.ts', result, 'utf-8')
  //   console.log('读取读取目录测试', JSON.stringify(results, null, 2))
}

main()
