Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    swpimg: [
      "http://m.qpic.cn/psb?/V13o3wzS0tJSU5/az*N*GOYKtY9PnxUH0ZuIoSxsUzNiTrDtS26xgRjx4M!/b/dFIBAAAAAAAA&bo=igN2AgAAAAARF90!&rf=viewer_4",
      "http://m.qpic.cn/psb?/V13o3wzS0tJSU5/uUFtiM4U481Om0SNhLRuej3LrvkQsXlG.PTfN2c6uBc!/b/dLgAAAAAAAAA&bo=hgN2AgAAAAARB8E!&rf=viewer_4",
      "http://m.qpic.cn/psb?/V13o3wzS0tJSU5/j.sdHNzJR3zzGFmfAwW6*P.dgqRFiLY7VfZVFFuMG0c!/b/dL8AAAAAAAAA&bo=6AIIAgAAAAARF8A!&rf=viewer_4",
      "http://m.qpic.cn/psb?/V13o3wzS0tJSU5/*xsI5bRm1CN1QNXl5KDDeJE6GXKa4jCSAbbdlBk8VOc!/b/dDUBAAAAAAAA&bo=VANUAgAAAAARBzE!&rf=viewer_4"
    ],
    //图标
    tubiao: [{
      url: '/pages/page1/tag1',
      src: '/img/tubiao/tu1.png',
      mc: '版本说明'
    },
    {
      url: '/pages/page1/tag?tag=2',
      src: '/img/tubiao/tu2.png',
      mc: '周末游'
    },
    {
      url: '/pages/page1/tag?tag=3',
      src: '/img/tubiao/tu3.png',
      mc: '精品线路'

    },
    {
      url: '/pages/page1/tag?tag=4',
      src: '/img/tubiao/tu4.png',
      mc: '港澳风情'
    },
    {
      url: '/pages/page1/tag?tag=5',
      src: '/img/tubiao/tu5.png',
      mc: '寒暑假游'
    }, {
      url: '/pages/page1/tag1',
      src: '/img/tubiao/tu6.png',
      mc: '关于我们'
    }
    ],


   //推荐数据
    recomimg: [{
      src: "http://m.qpic.cn/psb?/V13o3wzS1zL7RF/SuvhxOFyBmcLWGAzDDYjWRAlF0*tHYA*.jt3RqHajl4!/b/dLYAAAAAAAAA&bo=9QPLAgAAAAARBw8!&rf=viewer_4",
      url: '/pages/page2/detail?city=广州',
      mc: '广州'
    },
    {
      src: "http://m.qpic.cn/psb?/V13o3wzS15nhWr/gFSgDC8vtYNpC4Ni.Nzyib4irpKv0I1aaNVXUNak00k!/b/dL8AAAAAAAAA&bo=AgS0AgAAAAARB4A!&rf=viewer_4",
      url: '/pages/page2/detail?city=深圳',
      mc: '深圳'
    },
    {
      src: "http://m.qpic.cn/psb?/V13o3wzS2qigp6/I1RzsHLVFH8mGutNCwX.bu0G1T6Y4kHrt5jMdRkAW5Y!/b/dFMBAAAAAAAA&bo=IgMSAgAAAAARBwE!&rf=viewer_4",
      url: '/pages/page2/detail?city=佛山',
      mc: '佛山'
    },
    {
      src: "http://m.qpic.cn/psb?/V13o3wzS3Fu888/ULG8aFPELHX95aY1sejgBV7381LS9gKSHKtcGZMZvzw!/b/dLYAAAAAAAAA&bo=FASaAgAAAAARB7g!&rf=viewer_4",
      url: '/pages/page2/detail?city=广州佛山肇庆',
      mc: '广佛肇'
    },

    ]

  },
  //跳转更多页面
  toMorePage: function() {
    wx.navigateTo({
      url: '/pages/page1/more',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置背景颜色
    wx.setBackgroundColor({
      backgroundColor: '#4C79FA',
      backgroundColorBottom: '#ffffff',
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