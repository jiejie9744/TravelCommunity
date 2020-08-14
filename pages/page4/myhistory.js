// pages/page4/myhistory.js
const app = getApp()
var that
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    content: [],
  },
  getData: function() {
    db.collection('shuoshuo')
      .where({
        _openid: app.globalData.openid, // 填入当前用户 openid
      })
      .count({
        success: function(res) {
          that.data.totalCount = res.total;
        }
      })
    try {
      db.collection('shuoshuo')
        .where({
          _openid: app.globalData.openid, // 填入当前用户 openid
        })
        .orderBy('date', 'desc')
        .get({
          success: function(res) {
            that.data.content = res.data
            that.setData({
              content: that.data.content,
            })
          },
          fail:res=>{}
        })
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的说说'
    })
    that = this
  },
  onPullDownRefresh: function() {
    //在标题栏中显示加载,默认禁用
    that.getData();
  },
  toDetail(event) {
    var tempid = event.currentTarget.dataset.topticid;
    var openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '../page3/detail?' + 'tempid=' + tempid + '&openid=' + openid,
    })
  },

  //上拉获取更多数据
  getMoreData(){
    if (that.data.content.length < that.data.totalCount) {
      try {
        db.collection('shuoshuo')
          .where({
            _openid: app.globalData.openid, // 填入当前用户 openid
          })
          .skip(that.data.content.length) //跳过已有条目
          .orderBy('date', 'desc')
          .get({
            success: function(res) {
              that.data.content = that.data.content.concat(res.data)
              that.setData({
                content: that.data.content,
              })
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
   * 上拉触底
   */
  onReachBottom: function() {
    this.getMoreData()

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    that.getData();
  },


})