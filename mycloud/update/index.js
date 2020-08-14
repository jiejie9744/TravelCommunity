const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-7el9z'
})
const db = cloud.database()
exports.main = async (event, context) => {
  let tablename = event.tablename
  let topicid = event.topicid
  let topicopenid = event.topicopenid
  let doSomething = event.doSomething

  switch (tablename) {
    case "newreplay":
      return await db.collection('newreplay').where({
          topicid: topicid,
          topicopenid: topicopenid,
          hasread: false
        })
        .update({
          data: {
            hasread: true
          }
        })
      break;

    case "shuoshuo":
      let incrementNumber = 0
      if (doSomething == 'likeNumberAddOne') {
        incrementNumber = 1
      } else {
        incrementNumber = -1
      }
      const command = db.command
      return await db.collection('shuoshuo').doc(topicid)
        .update({
          data: {
            likeNumber: command.inc(incrementNumber) //点赞数自增1或者自减1
          }
        })
      break;
  }
}