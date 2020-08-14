// pages/test/fabu.js
const app = getApp()
var that
const db = wx.cloud.database()
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
  getTextAreaContent: function(event) {
    this.data.text = event.detail.value;
  },
  /**
   * 选择图片
   */



  chooseImage: function(event) {

    if (that.data.images.length >= 6) {
      wx.showToast({
        title: '最多只能选择6张图片',
        icon: 'none'
      })
    } else {
      wx.chooseImage({
        count: 6 - that.data.images.length,
        sizeType: ['compressed'],
        success: function(res) {
          let currentimgnum=that.data.images.length
          that.data.images = that.data.images.concat(res.tempFilePaths)
          that.data.fbdisable = true
          that.data.tjdisable = true
          that.setData({
            fbdisable: that.data.fbdisable,
            tjdisable: that.data.tjdisable,
            images: that.data.images,
          })
          that.cloudUpload(currentimgnum, that.data.images)
        },
      })
    }
  },

  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;

    wx.previewImage({
      //当前显示图片
      current: this.data.images[index],
      //所有图片
      urls: this.data.images
    })
  },

  removeImg: function(event) {
    var index = event.currentTarget.dataset.index;
    this.data.images.splice(index, 1);
    this.data.realimg.splice(index, 1);
    // 渲染图片
    this.setData({
      images: this.data.images,
      realimg: this.data.realimg
    })
  },
  totimeStamp(time) {
    return time.valueOf()
  },

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
      success: function(res) {},
      fail: console.error
    })
  },
  toDatabase() {
    if ((that.data.text != '' && that.data.text.indexOf(' ') != 0) || that.data.images.length > 0) {
      // that.data.fbdisable = true
      // that.setData({
      //   fbdisable: that.data.fbdisable
      // })
      let text = that.data.text
      let date = new Date()
      let images= that.data.realimg 
      let time = that.turnTime(new Date())
      let nicheng = that.data.nicheng
      let touxiang = that.data.touxiang
      db.collection('shuoshuo').add({
        data: {
          text: text,
          date: date,
          images: images,
          time: time,
          nicheng: nicheng,
          touxiang: touxiang
        },
        success: function(res) {
          that.data.text = ''
          that.data.fbdisable = true
          that.setData({
            text: that.data.text,
            fbdisable: that.data.fbdisable
          })
          wx.hideLoading()
          // console.log('入数据库的', that.data.realimg)
          wx.showToast({
            title: '发布成功',
          })
          setTimeout(res => {
            wx.navigateBack()
          }, 200)
        },
        fail: console.error
      })
      that.toHistory(text,date,images,time,  nicheng, touxiang)
      // }, 100)
    } else {
      wx.showToast({
        title: '写点东西吧~',
        icon: 'none',
        mask: 'true',
        duration: 1000
      })
    }
  },

  cloudUpload(index, img) {

    wx.showLoading({
      title: '上传中……',
      mask: 'true',
    })
    wx.cloud.uploadFile({
      cloudPath: that.totimeStamp(new Date()) + '.png',
      filePath: img[index],
      success: res => {
        that.data.realimg = that.data.realimg.concat(res.fileID)
        index++
      },
      fail: res => {
        wx.showToast({
          title: '上传失败',
        })
      },
      complete: res => {
        if (index == img.length) {
          wx.hideLoading()
          console.log('complete', res)
          that.data.fbdisable = false
          that.data.tjdisable = false
          that.setData({
            fbdisable: that.data.fbdisable,
            tjdisable: that.data.tjdisable
          })
        } else {
          that.cloudUpload(index, img)
        }
      }
    })
  },


  formSubmit: function(event) {
    var that = this
    that.data.fbdisable = true
    that.setData({
      fbdisable: that.data.fbdisable
    })
    wx.getUserInfo({
      success: res => {
        that.setData({
          nicheng: res.userInfo.nickName,
          touxiang: res.userInfo.avatarUrl
        })
        wx.showLoading({
          title: '正在发布……',
          mask: 'true',
        })
        that.toDatabase()
      },
      fail: res => {
      }
    })
  },

  turnTime(date) {

    let year = ''
    let month = ''
    let day = ''
    let hour = ''
    let minute = ''
    let time = ''

    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()
    hour = date.getHours()
    minute = date.getMinutes()
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    time = year + '/' + month +
      '/' + day + '/' + hour + ':' + minute

    return time
  },

  bindGetUserInfo: function(e) {
    var that = this
    that.data.fbdisable = true
    that.setData({
      fbdisable: that.data.fbdisable
    })
    wx.getSetting({
      success: res=> {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
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
        that.data.fbdisable = false
        that.setData({
          fbdisable: that.data.fbdisable
        })
      }
    })
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '发布圈圈'
    })
  },

  onShow(options) {
    that = this
  }
})