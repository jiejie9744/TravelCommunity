// pages/test/create.js
const app = getApp()
var that
const db = wx.cloud.database()
import timeUtils from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    images: [],
    realimg: [],
    nicheng: '',
    touxiang: '',
    fbdisable: false,
    tjdisable: false,

  },
  /**
   * 获取填写的内容
   */
  getTextAreaContent: function (event) {
    this.data.text = event.detail.value;
  },

  /**
   * 选择图片
   */
  chooseImage() {
    if (that.data.images.length >= 6) {
      wx.showToast({
        title: '最多只能选择6张图片',
        icon: 'none'
      })
    } else {
      wx.chooseImage({
        count: 6 - that.data.images.length, //选择图片数量 这里一共6张 (一次最多9张)
        sizeType: ['original', 'compressed'], //图片格式 原图/压缩
        sourceType: ['album', 'camera'], //图片来源 相册/相机
        success: function (res) {
          that.data.images = that.data.images.concat(res.tempFilePaths) //拼接图片
          that.setData({
            images: that.data.images,
          })
        },
      })
    }
  },

  //每一张上传
  uploadEach(i, imgList) {
    return new Promise(resolve => {
      wx.cloud.uploadFile({
        cloudPath: that.toTimeStamp(new Date()) + '.png',
        filePath: imgList[i],
      }).then(res => {
        // that.data.realimg = that.data.realimg.concat(res.fileID)
        console.log('上传成功：', res)
        resolve(res.fileID)
      }).catch(err => {
        console.log('失败了。。。', err)
        wx.showToast({
          title: '上传失败',
        })
      })
    })


  },
  //用云上传图片
  async cloudUpload(imgList) {
    let tempImg = []
    for (var i = 0; i < imgList.length; i++) {
      tempImg = tempImg.concat(await that.uploadEach(i, imgList)) //await等待异步方法执行完才执行下面的
    }
    return tempImg
  },

  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
      //当前显示图片
      current: this.data.images[index],
      //所有图片
      urls: this.data.images
    })
  },

  // 删除图片
  removeImg: function (event) {
    var index = event.currentTarget.dataset.index;
    this.data.images.splice(index, 1);
    this.data.realimg.splice(index, 1);
    // 渲染图片
    this.setData({
      images: this.data.images,
      realimg: this.data.realimg
    })
  },
  //转换为时间戳
  toTimeStamp(time) {
    return time.valueOf()
  },

  //存进历史库
  toHistory(text, date, images, time, nicheng, touxiang) {
    db.collection('history').add({
      data: {
        text: text,
        date: date,
        images: images,
        time: time,
        nicheng: nicheng,
        touxiang: touxiang
      },
      success: function (res) {},
      fail: console.error
    })
  },

  async toDatabase() {
    //文字不为空并且首位不是空格  或者  有图片  则可以发布
    if ((that.data.text != '' && that.data.text.indexOf(' ') != 0) || that.data.images.length > 0) {
      let text = that.data.text //文本内容
      let date = new Date() //系统时间
      let time = timeUtils.formatTime(new Date()) //显示的时间
      time = time.substring(0, time.length - 3) //不显示具体秒数
      let nicheng = that.data.nicheng //昵称
      let touxiang = that.data.touxiang //头像
      let realImgList = await that.cloudUpload(that.data.images) //图片列表
      db.collection('shuoshuo').add({
        data: {
          text: text,
          date: date,
          images: realImgList,
          time: time,
          nicheng: nicheng,
          touxiang: touxiang,
          likeNumber:0      //被点赞数初始化为0
        },
        success: function (res) {
          that.setData({
            text: "", //一旦按了发布就清空数据
            fbdisable: true //发布的时候阻塞按钮 防止用户连续快速点击
          })
          wx.navigateBack({
            delta: 1,
          })
          
        },
        fail: console.error
      })
      that.toHistory(text, date, realImgList, time, nicheng, touxiang) //把记录存进历史库
    } else {
      wx.showToast({
        title: '写点东西吧~',
        icon: 'none',
        mask: 'true',
        duration: 1000
      })
    }
  },

  //点击发布提交
  formSubmit: function (event) {
    that.setData({
      fbdisable: true //不允许连续点击提交
    })
    wx.showLoading({
      title: '正在发布……',
      mask: 'true',
    })
    //获取用户信息
    wx.getUserInfo({
      success: res => {
        that.setData({
          nicheng: res.userInfo.nickName, //昵称
          touxiang: res.userInfo.avatarUrl //头像
        })
        //存进数据库
        that.toDatabase()
      },
    })
  },

  //获取用户信息
  bindGetUserInfo: function (e) {
    that.data.fbdisable = true
    that.setData({
      fbdisable: that.data.fbdisable
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                nicheng: res.userInfo.nickName,
                touxiang: res.userInfo.avatarUrl,
              })
            }
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '请先登陆',
          icon: 'none'
        })
      },
      complete: res => {
        that.setData({
          fbdisable: false
        })
      }
    })
  },

  onLoad(options) {
    wx.setNavigationBarTitle({ //设置标题
      title: '发布圈圈'
    })
  },

  onShow(options) {
    that = this
  }
})