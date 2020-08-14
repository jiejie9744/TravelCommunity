const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-7el9z'
})
const db = cloud.database()
exports.main = async (event, context) => {
  
  let tablename = event.tablename
  let topicid = event.topicid
  let date = event.date
  let _openid = event._openid
  let content = event.content
  switch (tablename) {
    case 'like':
      try {
        return await db.collection('like').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            topicid: topicid,
            date: date,
            content:content,
            _openid: _openid
          }
        })
      } catch (e) {
        console.error(e)
      }
      break;
    case "newreplay":
      try {
        return await db.collection('newreplay').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              topicid: event.topicid,
              topicopenid: event.topicopenid,
              _openid: event._openid,
              comment: event.comment,
              date: event.date,
              time: event.time,
              nicheng: event.nicheng,
              touxiang: event.touxiang,
              hasread: event.hasread
            }
          })
        
      } catch (e) {
        console.error(e)
      }
      break;
  }
}