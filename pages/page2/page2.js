// pages/page2/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biaoti: [
      1, 2, 3, 4, 5, 6
    ],
    jianjie:[
      {
        src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
        url: "/pages/page2/page1-1"
      }

    ],
    // recomimg: {
    //   nav: [{
    //       src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
    //       url: "/pages/page2/page1-1"
    //     },
    //     {
    //       src: "http://m.qpic.cn/psb?/V13o3wzS0SsJ7B/Fj8I*ZZb3bO6.EE7dXjS0*LxyU7iZF.as23s90Y0Q3g!/b/dMUAAAAAAAAA&bo=OATgAgAAAAARB.4!&rf=viewer_4",
    //       url: "/pages/page2/page1-2"
    //     },
    //     {
    //       src: "/img/lunbo/s3.png",
    //       url: "/pages/page2/page1-3"
    //     },
    //     {
    //       src: "/img/lunbo/s4.png",
    //       url: "/pages/page2/page1-4"
    //     },
    //   ]
    // },
    currentindex: 0,
  },
  clicknav: function(e) {
    var index = e.currentTarget.dataset.index;
    var newjianjie

    switch (index) {
      case 0:
        newjianjie = [{
          src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
          url: "/pages/page2/page1-1"
      }]      
        break;
      case 1:
        newjianjie = [
          {
          src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
          url: "/pages/page2/page2-1"
        },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page2-2"
          },
        ]
       break;
      case 2:
        newjianjie = [
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-1"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-2"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-3"
          }
        ]
        break;
      case 3:
       newjianjie = [
        {
          src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
          url: "/pages/page2/page4-1"
        },
        {
          src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
          url: "/pages/page2/page4-2"
        },
        {
          src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
          url: "/pages/page2/page4-3"
        },
        {
          src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
          url: "/pages/page2/page4-4"
        }
      ]   
        break;
      case 4:
        newjianjie = [
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-1"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-2"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-3"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-3"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-3"
          }
        ]    
        break;
      case 5:
        newjianjie = [
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-1"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-2"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-3"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-3"
          },
          {
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-3"
          },{
            src: "http://img.pptjia.com/image/20180117/767f4b74a8d7b453b149430ee364c9ce.jpg",
            url: "/pages/page2/page3-3"
          }
        ]
        break;
    }
    
    this.setData({
      currentindex: index,
      jianjie:newjianjie
    })
  },
  /**,
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