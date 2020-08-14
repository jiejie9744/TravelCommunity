var that
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    
    content: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我赞过的'
    })
    that = this
  },

  toDetail(event) {
    var tempid = event.currentTarget.dataset.topticid;
    var openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '../page3/detail?' + 'tempid=' + tempid + '&openid=' + openid,
    })
  },

  getData() {
    wx.cloud.callFunction({
      name: "query",
      data: {
        tablename:'like',
        openid:app.globalData.openid
      },
      success: res => {
          console.log('云函数请求后',res.result.data)
            let list=res.result.data
            let content=[]
            for(var i=0;i<list.length;i++){
              content.push(list[i].content)
            }
            that.setData({
              content:content
            })
      }
    })
    
  },


  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    that.getData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    that.getData()
  },
  onReachBottom: function() {
    if (that.data.collects.length < that.data.totalCount) {
      try {
        db.collection('collect')
          .where({
            _openid: app.globalData.openid, // 填入当前用户 openid
          })
          .skip(that.data.collects.length)
          .orderBy('date', 'desc')
          .get({
            success: function(res) {
              that.data.collects = that.data.collects.concat(res.data)
              that.getTopicFromCollects(that.data.content, that.data.content.length - 1)
            },
          })
      } catch (e) {
        console.error(e);
      }
    } else {
      wx.showToast({
        title: '没有更多数据了',
      })
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})