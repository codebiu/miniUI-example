// nodejs
import fs from 'fs'
import path from 'path'
import { parse } from '@vue/compiler-sfc'

/**
 * 读取目录下的所有文件和子目录
 * @param {string} dirPath - 目录路径
 * @returns {Promise<Array>} - 包含文件和子目录信息的数组
 */
function readDirectory(dirPath) {
  return fs.promises.readdir(dirPath, { withFileTypes: true })
}

/**
 * 检查文件是否为 Vue 文件
 * @param {fs.Dirent} file - 文件信息对象
 * @returns {boolean} - 是否为 Vue 文件
 */
function isVueFile(file) {
  return file.isFile() && path.extname(file.name) === '.vue'
}

/**
 * 从代码中提取注释
 * @param {string} code - 文件内容
 * @returns {Array<string>} - 注释数组
 */
function extractComments(code) {
  const commentRegex = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g
  let comments = []
  let match
  while ((match = commentRegex.exec(code)) !== null) {
    comments.push(match[0])
  }
  return comments
}

/**
 * 解析多行注释，提取描述和作者信息
 * @param {string} comment - 多行注释字符串
 * @param {Array} toFinds - 需要查找的注释关键词
 * @returns {Object} - 包含描述和作者的对象
 */
function parseComment(comment, toFinds) {
  const lines = comment.split('\n').map((line) => line.trim())
  const result = {}
  lines.forEach((line) => {
    // 每行注释查找关键词
    for (const key in toFinds) {
      const value = toFinds[key]
      if (line.startsWith(value)) {
        result[key] = line.replace(value, '').trim()
      }
    }
  })
  return result
}

/**
 * 解析目录下的所有 Vue 3 文件，并提取文件名和注释
 * @param {string} dirPath - 目录路径
 * @param {Array} toFinds - 需要查找的注释关键词
 * @returns {Promise<Array>} - 包含文件名和注释的数组 [{"key0": "value0",}]
 */
async function parseVue3Files(dirPath, toFinds) {
  const files = await readDirectory(dirPath)
  const vueFiles = files.filter(isVueFile)
  const results = []
  for (const file of vueFiles) {
    const properties = await parseVue3FileSingle(path.join(dirPath, file.name), toFinds)
    results.push(properties)
  }
  return results
}

/**
 * 解析单个 Vue 3 文件，并提取文件名和注释
 * @param {string} filePath - 文件路径
 * @param {Array} toFinds - 需要查找的注释关键词
 * @returns {Promise<Object>} - 包含文件名和注释的对象 {"key0": "value0",}
 * */
async function parseVue3FileSingle(filePath, toFinds) {
  const fileContent = await fs.promises.readFile(filePath, 'utf-8')
  const parsed = parse(fileContent)
  // 文件名
  const fileName = path.basename(filePath)
  // 脚本内容
  const scriptContent = parsed.descriptor.scriptSetup ? parsed.descriptor.scriptSetup.content : ''
  // 注释
  const comments = extractComments(scriptContent)
  // 获取具体注释
  const commentResult = []
  for (const comment of comments) {
    commentResult.push(parseComment(comment, toFinds))
  }
  const properties = commentResult[0]
  properties.name = fileName.split('.')[0]
  return properties
}


export {
  parseVue3Files,
  parseVue3FileSingle
}
