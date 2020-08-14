const app = getApp()
var that
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //整个请求页面的数据
    pageData: {},
    //城市数据
    city: "",
    //简介数据
    description: "",
    //课程数据
    courseInfo: {
      introduction: "",
      features: "",
      service: "",
      plan: ""
    },
    //轮播图
    banners: [],
    //选择栏数据
    titles: ["课程介绍", "课程特色", "课程服务", "课程安排"],
    //选择栏当前索引
    currentIndex: 0,
    //本地缓存的收藏数据
    goods: {
      id: "",
      tag: false,
      title: "",
      littlePicture: ""
    }
  },
  tabClick: function (e) {
    var newIndex = e.detail.index
    this.setData({
      currentIndex: newIndex,
    })
  },

  onCollectTab: function () {
    let goods = this.data.goods
    goods.tag=false
    let storageList = wx.getStorageSync('collection') || []
    let i
    let len
    //如果收藏缓存中有该数据，则删除该缓存
    for (i = 0, len = storageList.length; i < len; i++) {
      if (storageList[i].id == goods.id) {
        storageList.splice(i, 1)
        wx.setStorageSync('collection', storageList)
        wx.showToast({
          title: '已取消收藏',
        })
        break;
      }
    }
    //如果收藏缓存中没有该数据，则添加收藏
    if (i >= len) {
      goods.tag = true
      storageList.push(goods);
      wx.setStorageSync('collection', storageList)
      wx.showToast({
        title: '收藏成功~',
      })
    }
    this.setData({
      goods:goods
    })
    console.log("goods:--",this.data.goods)
    console.log("collection缓存数据：",wx.getStorageSync('collection'))

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    let city = options.city
    this.getData(city)
    
  },
  //获取收藏缓存
  getStorageData() {
    var storageList = wx.getStorageSync('collection') || []
    var goods = this.data.goods
    for (var i = 0; i < storageList.length; i++) {
      if (storageList[i].id == goods.id) {
        goods = storageList[i]
      }
    }
    this.setData({
      goods: goods
    })
    console.log(wx.getStorageSync('collection'))
  },
  getData(city) {
    db.collection("route_detail").where({
        city: city
      })
      .get().then(res => {
        let id = res.data[0]._id
        let city = res.data[0].city
        let littlePicture = res.data[0].littlePicture
        let goods={id,city,littlePicture}
        this.setData({
          goods: goods,
          banners: res.data[0].banners,
          city: res.data[0].city,
          description: res.data[0].description,
          courseInfo: res.data[0].courseInfo
        })
        this.getStorageData()
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