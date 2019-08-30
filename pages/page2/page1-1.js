// pages/page2/page1-1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      "/img/lunbo/s1.png",
      "/img/lunbo/s2.png",
      "/img/lunbo/s3.png",
      "/img/lunbo/s4.png"
    ],
    titles: ["课程介绍", "课程特色", "课程服务", "课程安排"],
    text: '课程介绍',
    currentinex: 0
  },
  tabClick: function(e) {
    var newindex = e.detail.index
    var newtext=''
    switch(newindex){
      case 0: newtext ='课程介绍';break;
      case 1: newtext = '课程特色'; break;
      case 2: newtext = '课程服务'; break;
      case 3: newtext = '课程安排'; break;

    }
    this.setData({
      currentinex: newindex,
      text:newtext
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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