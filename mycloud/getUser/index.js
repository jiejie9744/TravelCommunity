// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-7el9z'
})
// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.database().collection('students_no').get();
}

