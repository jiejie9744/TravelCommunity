// pages/page2/page2.js
const app = getApp()
var that
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //路线导航栏标题
    navicationTitle: [{
      category_name: ""
    }],
    //当前选择栏下标
    currentIndex: 0,
  },

  //点击导航栏
  clickNavication: function (e) {
    var index = e.currentTarget.dataset.index;  //当前选择栏下标
    const navtitle = this.data.navicationTitle[index].category_name //导航栏标题
    //获取路线列表
    this.getRouteList(navtitle)
    this.setData({
      currentIndex: index,
    })
  },
  /**,
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setBackgroundColor({
      backgroundColor: '#4C79FA',
      backgroundColorBottom: '#ffffff'
    })
    //获取路线种类数据
    this.getCategoryData();
  },
  //获取路线种类数据
  getCategoryData() {
    db.collection("category").get().then(res => {
      console.log('111111')
      console.log(res.data)
      this.setData({
        navicationTitle: res.data
      })
      let currentIndex = this.data.currentIndex
      let navicationTitle = this.data.navicationTitle
      let navtitle = navicationTitle[currentIndex].category_name
      this.getRouteList(navtitle)
    })

  },
//获取路线列表数据
  getRouteList(navtitle) {
    const command = db.command
    db.collection("route").where({
        category: command.all([navtitle])
      })
      .get().then(res => {
        console.log(res.data)
        this.setData({
          routeList: res.data
        })
      })

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})