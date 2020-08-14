const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-7el9z'
})
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async(event, context) => {
  let tablename = event.tablename
  let _openid = event.openid
  switch (tablename) {
    case 'like':
      // 先取出集合记录总数
      let countResult = await db.collection('like').count()
      let total = countResult.total
      // 计算需分几次取
      let batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      let tasks = []
      for (let i = 0; i < batchTimes; i++) {
        let promise = db.collection('like')
          .where({
            _openid: _openid, // 填入当前用户 openid
          })
          .skip(i * MAX_LIMIT)
          .limit(MAX_LIMIT)
          .orderBy('date', 'desc')
          .get()
        tasks.push(promise)
      }
      // 等待所有
      return (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
          errMsg: acc.errMsg,
        }
      })
      break;
  }

}



