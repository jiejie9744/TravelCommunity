// pages/page4/uploadexcell.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileUrl:''
  },

chooseExcel(){//1、选择excel表格
let that = this
  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    success(res) {
      let path = res.tempFiles[0].path;
      console.log("选择excel成功",path)
      that.uploadExcel(path);
    }
  })
},
uploadExcel(path){//2、上传excel到云存储
  let that = this;
  wx.cloud.uploadFile({
    cloudPath: new Date().getTime() + ".xls",
    filePath: path,//文件路径
    success: res => {
      console.log('上传成功',res.fileID)
      that.jiexi(res.fileID);
    },
    fail:err => {
      console.log('上传失败',err)
    }
  })
},
jiexi(fileID){
  wx.cloud.callFunction({
    name:'excel',
    data: {
      fileID:fileID
    },
    success: res => {
      console.log('上传成功',res)
    },
    fail: err => {
      console.log('解析失败',err)
    }
  })
},

downloadExcel(){
  wx.cloud.callFunction({
    name: "getUser",
    success(res) {
      console.log("读取成功", res.result.data)
      that.savaExcel(res.result.data)
    },
    fail(res) {
      console.log("读取失败", res)
    }
  })
},

  savaExcel(userdata) {
    let that = this
    wx.cloud.callFunction({
      name: "getExcel",
      data: {
        userdata: userdata
      },
      success(res) {
        console.log("保存成功", res)
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        console.log("保存失败", res)
      }
    })
  },

  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl(fileID) {
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        // get temp file URL
        console.log("文件下载链接", res.fileList[0].tempFileURL)
        that.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
      },
      fail: err => {
        // handle error
      }
    })
  },
  
  //复制excel文件下载链接
  copyFileUrl() {
    let that = this
    wx.setClipboardData({
      data: that.data.fileUrl,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log("复制成功", res.data) // data
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    wx.cloud.init({
      env: 'test-7el9z'
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