// pages/page1/page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swpimg: [
      "/img/lunbo/s1.png",
      "/img/lunbo/s2.png",
      "/img/lunbo/s3.png",
      "/img/lunbo/s4.png"
      ],
      daohang1:[
        "研学宗旨", "风景名胜", "红色线路", "港澳风情",  "吃货攻略","关于我们"
      ]
      ,
    recomimg: [{ src:"https://ps.ssl.qhmsg.com/sdr/400__/t01ad947215fca99c97.jpg",  url: '/pages/page1/road1'},
      { src: "/img/lunbo/s2.png"  , url: '/pages/page1/road1' },
      { src: "/img/lunbo/s3.png"  , url: '/pages/page1/road1'},
      { src: "/img/lunbo/s4.png" , url: '/pages/page1/road1' },
      
      ]
      
  },
   gengduo: ()=>{
      wx.navigateTo({
        url: '/pages/page1/gengduo',
      })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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