const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-7el9z'
})
const db = cloud.database()
exports.main = async (event, context) => {
  let tablename = event.tablename
  let topicid = event.topicid
  let _openid = event._openid
  switch (tablename) {
    case 'newreplay':
      //删除回复
      return await db.collection('newreplay').where({
        _openid: event._openid,
        _id: event._id
      }).remove()
      break;

    case "like":
      //删除点赞
      return await db.collection("like").where({
        _openid: _openid, //点赞表里的用户openid
        topicid: topicid //用户点赞的话题ID
      }).remove()
      break;

    case "shuoshuo":
      //删除自己的说说 同时需要删除作为外键关联的数据
      let task = []
      let promise1 = db.collection("shuoshuo").where({
        _id: event._id
      }).remove()
      task.push(promise1)
      let promise2 = db.collection("newreplay").where({
        topicid: event._id
      }).remove()
      task.push(promise2)
      let promise3 = db.collection("like").where({
        topicid: event._id
      }).remove()
      task.push(promise3)
      return (await Promise.all(task)).reduce((acc, cur) => {
        return {
          data: acc,
          errMsg: acc.errMsg,
        }
      })


      break;

  }
}