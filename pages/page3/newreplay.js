const app = getApp()
var that
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newreplay: {},
    newreplaynum: 0,

  },

  toNewreplayDetail(event) {
    var topicid = event.currentTarget.dataset.topicid;
    var openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '../page3/detail?' + 'topicid=' + topicid + '&openid=' + openid,
    })
  },

  //获取新回复
  getNewreplay() {
    db.collection('newreplay')
      .where({
        topicopenid: app.globalData.openid,
        hasread: false
      })
      .count({
        success: res => {
          // console.log('新回复数量', res)
          that.data.newreplaynum = res.total
        }
      })
    db.collection('newreplay')
      .where({
        topicopenid: app.globalData.openid,
        hasread: false
      })
      .orderBy('date', 'desc')
      .get({
        success: res => {
          that.data.newreplay = res.data
          that.setData({
            newreplay: that.data.newreplay
          })
        }
      })
  },

  //获取更多数据
  getMoreData() {
    if (that.data.newreplay.length < that.data.newreplaynum) {
      try {
        db.collection('newreplay')
          .skip(20)
          .limit(20)
          .where({
            topicopenid: app.globalData.openid,
            hasread: false
          })
          .orderBy('date', 'desc')
          .get({
            success: res => {
              console.log("下拉", res)
              that.data.newreplay = that.data.newreplay.concat(res.data)
              that.setData({
                newreplay: that.data.newreplay
              })
            }
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

  //上拉触底
  onReachBottom: function () {
    this.getMoreData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '最新回复'
    })
    that = this

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that.getNewreplay()
  }
})