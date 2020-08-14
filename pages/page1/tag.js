// pages/page1/t2.js
const app = getApp()
var that
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //分类
    categoryList:[["周末游"],['广州佛山'],['深圳东莞'],["寒暑假游"]]
    
    
  },

  /**,
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    let tag = options.tag
    let categoty = this.data.categoryList[tag-2]


    wx.setBackgroundColor({
      backgroundColor: '#4C79FA',
      backgroundColorBottom: '#ffffff'
    })
    //获取路线种类数据
    this.getRouteList(categoty);
  },

//获取路线列表数据
  getRouteList(category) {
    const command = db.command
    console.log(command.all(category))
    db.collection("route").where({
        category: command.all(category)
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