// pages/page4/acceptresult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    college: '',
    specialty: '',
    xiaoqu: '',
    student_no:'',
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.data.name = options.name
    this.data.college = options.college
    this.data.specialty = options.specialty
    this.data.xiaoqu = options.xiaoQu
    this.data.student_no = options.student_no
    this.setData({
      name: this.data.name,
      college: this.data.college,
      specialty: this.data.specialty,
      xiaoqu: this.data.xiaoqu,
      student_no: this.data.student_no
    })
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