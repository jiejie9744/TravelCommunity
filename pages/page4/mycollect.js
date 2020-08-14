Page({
  data: {
    
    storageList:[{
      id:"",
      city:"",
      littlePicture:"",
      tag:""
    }],
    delBtnWidth: 185,
    startX:''
  },

  delItem: function (e) {

    let index = e.currentTarget.dataset.index;
    this.data.storageList[index].tag=false
    this.data.storageList.splice(index, 1);
    this.setData({
      storageList: this.data.storageList
    })
    wx.setStorageSync('collection', this.data.storageList)
  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      let moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      let disX = this.data.startX - moveX;
      let delBtnWidth = this.data.delBtnWidth;
      let txtStyle = "";
      if (disX <= 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else { //移动距离大于0，文本层left值等于手指移动距离
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + disX + "rpx";
      }
      //获取手指触摸的是哪一项
      let index = e.currentTarget.dataset.index;
      this.data.storageList[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        storageList: this.data.storageList
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      let endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      let disX = this.data.startX - endX;
      let delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      let txtStyle = disX >28? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      let index = e.currentTarget.dataset.index;
      this.data.storageList[index]['txtStyle'] =txtStyle;
     
      //更新列表的状态
      this.setData({
        storageList: this.data.storageList,
      });
    }
  },
  toDetail:function(e){
    console.log(e)
    const index = e.currentTarget.dataset.index
    const city=this.data.storageList[index].city
    wx.navigateTo({
      url: "/pages/page2/detail?city="+city,
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的收藏'
    })
    let storageList = wx.getStorageSync('collection')
    this.setData({
      storageList: storageList
    })
    console.log("storageList",this.data.storageList)

  },
})