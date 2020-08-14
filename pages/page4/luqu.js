// pages/page4/luqu.js
const db = wx.cloud.database()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: '00',
    number: '',
  },
  getInput(event) {
    this.data.number = event.detail.value
    console.log('input内容:', this.data.number)
  },

  toManage() {
    wx.navigateTo({
      url: 'uploadexcell',
    })
  },
  getData() {
    try {
      db.collection('students_no')
        .where({ //索引是录取号。
          luQuHao: this.data.number
        })
        .get({
          success: res => {
            console.log('查询成功,结果为', res.data[0])
            if (res.data[0] == undefined) {
              wx.showToast({
                title: '查询失败,请重新输入',
                icon: 'none'
              })
              this.data.number = ''
              that.setData({
                number: this.data.number
              })
            }
            console.log(res.data[0].name + ' ' + res.data[0].college + ' ' + res.data[0].specialty + ' ' + res.data[0].xiaoQu + res.data[0].student_no)
            that.setData({
              res: that.data.res
            })
            wx.navigateTo({
              url: 'acceptresult?' + 'name=' + res.data[0].name + '&college=' + res.data[0].college + '&specialty=' + res.data[0].specialty + '&xiaoQu=' + res.data[0].xiaoQu + '&student_no=' + res.data[0].student_no
            })
          },
          fail: res => {
            wx.showToast({
              title: '查询失败,请重新输入',
              icon: 'none'
            })
            console.log('查询失败,请重新输入', res)
          },
        })
    } catch (e) {
      console.error(e);
    }
  },

  formSubmit: function(event) {

    wx.showLoading({
      title: '正在查询',
      mask: 'true',
    })
    that.getData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.hideLoading()
    this.data.number = ''
    that.setData({
      number: this.data.number
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})