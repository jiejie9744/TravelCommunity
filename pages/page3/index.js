const app = getApp()
var that
const db = wx.cloud.database()
// pages/page3/page3.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: [], //内容数据
    totalCount: 0, //列表总数量
    newreplaynum: 0 //最新回复数
  },
  onLoad: function (options) {
    wx.setBackgroundColor({
      backgroundColor: '#4C79FA',
      backgroundColorBottom: '#ffffff'
    })
    that = this
  },
  //创建说说
  create() {
    wx.navigateTo({
      url: './create',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取数据
    this.getData()
  },
  // 查看详情
  toDetail(event) {
    let topicid = event.currentTarget.dataset.topicid;
    let openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: './detail?' + 'topicid=' + topicid + '&openid=' + openid,
    })
  },

  //获取列表数据
  getData() {
    //先获取总记录数
    db.collection('shuoshuo').count()
      .then(res => {
        this.data.totalCount = res.total;
        console.log('说说列表总数量:', that.data.totalCount)
      })
    //获取前面的默认最多20条数据并渲染
    db.collection('shuoshuo')
      .orderBy('date', 'desc')
      .get()
      .then(res => {
        that.setData({
          content: res.data,//渲染到内容列表
        })
        console.log("当前列表已经渲染数据数量："+this.data.content.length)
      })
      //获取最新回复数
    db.collection('newreplay')
      .where({
        topicopenid: app.globalData.openid,  //当前用户的openId
        hasread: false  //是否已经点击看过
      })
      .count()
      .then(res => {
        console.log('我发布的内容新回复数量:', res)
        that.setData({
          newreplaynum: res.total
        })
      })

  },

  //前往查看最新回复
  toNewReplay() {
    wx.navigateTo({
      url: './newreplay',
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getData();//下拉刷新数据
    // wx.stopPullDownRefresh()
  },

  //获取更多数据
  getMoreData(){
    if (this.data.content.length < this.data.totalCount) {
      db.collection('shuoshuo')
        .skip(that.data.content.length) //跳过已经获取条目
        .orderBy('date', 'desc') //时间降序排列
        .get()
        .then(res => {
          this.data.content = this.data.content.concat(res.data) //拼接
          this.setData({
            content: this.data.content,
          })
        }).catch(err => {
          console.log('出错了', err)
        })
    } else {
      wx.showToast({
        title: '没有更多数据了',
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉获取更多数据
    this.getMoreData()
  },

})