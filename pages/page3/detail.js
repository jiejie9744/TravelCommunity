// pages/page3/detail.js
var app = getApp()
const db = wx.cloud.database();
var that
import timeUtils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOpenID: '',
    nicheng: '', //用户昵称
    touxiang: '', //用户头像
    topicid: '', //当前话题id
    topicOpenID: '', //发布话题用户ID
    comment: '', //评论区文本
    content: [], //内容列表数据
    commentList: [], //评论列表数据
    isLike: false, //当前点赞标志
    removeAble: false, //当前内容能否被删除
    fbDisable: false, //发布按钮禁用
    removeDisable: false, //删除按钮禁用
    likeDisable: false, //点赞按钮禁用


    delBtnWidth: 175,
    startX: '',
    txtStyle: "",
  },

  // 删除评论
  deleteComment(e) {
    var index = e.currentTarget.dataset.index //评论索引
    var commentid = e.currentTarget.dataset.commentid //评论id
    var openid = e.currentTarget.dataset.openid //评论的人openid
    wx.showLoading({
      title: '删除中'
    })
    that.data.commentList.splice(index, 1) //删除该索引对应的数据
    wx.cloud.callFunction({
      name: 'remove',
      data: {
        tablename: 'newreplay',
        _openid: openid,
        _id: commentid
      },
      success: res => {
        console.log("删除后", res)
        wx.hideLoading()
        wx.showToast({
          title: '删除成功',
        })
        that.setData({
          commentList: that.data.commentList
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    })

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
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX <= 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else { //移动距离大于0，文本层left值等于手指移动距离
        //控制手指移动距离最大值为删除按钮的宽度
        txtStyle = "left:-" + disX + "rpx";
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      this.data.commentList[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        commentList: this.data.commentList
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > 88 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      this.data.commentList[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        commentList: this.data.commentList
      });
    }
  },

  // 更新查看回复
  upNewReplay(topicid) {
    wx.cloud.callFunction({
      name: "update",
      data: {
        tablename: 'newreplay',
        topicopenid:app.globalData.openid,
        topicid: topicid
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '圈友详情'
    })
    that = this;
    that.data.userOpenID = app.globalData.openid //该用户的openID
    that.setData({
      userOpenID: that.data.userOpenID
    })
    //options是页面传来的值
    that.data.topicid = options.topicid //当前话题ID
    that.data.topicOpenID = options.openid //发布该话题的用户openID
    that.upNewReplay(that.data.topicid)  //更新查看回复
    //如果发布者ID与当前用户ID相匹配则有权删除话题
    if (that.data.topicOpenID == that.data.userOpenID || that.data.userOpenID == 'oPdH-4xyy7BhTsldRPK6q2Lwn630') {
      that.setData({
        removeAble: true
      })
    }
    this.getData() //获取所有数据
  },
  getData() {
    that.getTopicData()
    that.getLikeData()
    that.getCommentList(0)
  },

  //获取话题数据
  getTopicData() {
    db.collection('shuoshuo').doc(that.data.topicid).get({ //拿到shuoshuo表的数据,ID索引是话题ID。
      success: res => {
        that.data.content = res.data;
        //渲染该说说内容
        that.setData({
          content: that.data.content,
        })
      },
      fail: res => {
        wx.showToast({
          title: '获取不到当前话题',
          icon: 'none'
        })
      },
    })
  },

  //获取点赞数据
  getLikeData() {
    db.collection('like') //连接like表的数据
      .where({ //若当前用户ID和当前话题ID匹配得上 有数据则证明赞过
        _openid: app.globalData.openid, //当前用户openID
        topicid: that.data.topicid //当前话题ID
      })
      .get({
        success: res => {
          if (res.data.length > 0) { //如果该条目有数据代表点赞过
            that.setData({
              isLike: true,
            })
          } else { //否则没有赞过或者取消了
            that.setData({
              isLike: false,
            })
          }
        },
        fail: res => {
          wx.showToast({
            title: '获取点赞列表失败',
            icon: 'none'
          })
        },
      })
  },

  //获取评论列表信息
  getCommentList(skipnum) {
    db.collection('newreplay').where({
      topicid: that.data.topicid
    }).count({
      success: res => {
        that.data.commentListnum = res.total
        db.collection('newreplay').where({
            topicid: that.data.topicid
          })
          .skip(skipnum) //跳过当前已经有评论数目
          .get({
            success: res => {
              console.log('评论数目', that.data.commentListnum)
              that.data.commentList = that.data.commentList.concat(res.data) //数组拼接
              that.setData({
                commentList: that.data.commentList
              })
              console.log('评论', that.data.commentList)
              if (that.data.commentList.length < that.data.commentListnum) {
                that.getCommentList(that.data.commentList.length) //递归地获取评论
              }
            },
            fail: res => {
              wx.showToast({
                title: '获取评论列表失败了',
                icon: 'none'
              })
            },
          })
      }
    })
  },

  //点击点赞按钮
  onLikeClick: function (event) {
    if (this.data.isLike) { //已经点赞则移除
      this.removeLikeData();
    } else { //没有点赞则添加
      this.saveLikeData();
    }
  },

  //保存点赞数据
  saveLikeData() {
    that.setData({
      isLike: true, //改为已赞状态
      likeDisable: true //禁止连续点击
    })

    //调用云函数增加该话题点赞数
    wx.cloud.callFunction({
      name:'update',
      data:{
        tablename:'shuoshuo',
        doSomething:'likeNumberAddOne',
        topicid:that.data.topicid     
      }
    }).then(res=>{
        that.data.content.likeNumber = that.data.content.likeNumber+1   //给该话题点赞数加1
        that.setData({
          content:that.data.content
        })
    })
    
    // 调用云函数添加数据
    wx.cloud.callFunction({
      name: 'add',
      data: {
        tablename: 'like', //连接的是like表
        topicid: that.data.topicid, //当前话题ID
        date: new Date(), //赞的时间
        content:that.data.content,//内容数据
        _openid: app.globalData.openid //点赞人的用户ID
      },
      success: res => {
        that.setData({
          likeDisable: false //恢复可点击状态
        })
        wx.showToast({
          title: '点赞成功',
        })
      },
      fail: res => {
        wx.showToast({
          title: '收藏失败',
          icon: 'none'
        })
      },
    })
  },

  //删除点赞数据
  removeLikeData() {
    that.setData({
      isLike: false, //取消赞
      likeDisable: true //禁止连续点击
    })
    //调用云函数减少该话题点赞数
    wx.cloud.callFunction({
      name:'update',
      data:{
        tablename:'shuoshuo',
        doSomething:'likeNumberSubOne',
        topicid:that.data.topicid     
      }
    }).then(res=>{
        that.data.content.likeNumber = that.data.content.likeNumber-1   //给该话题点赞数减1
        that.setData({
          content:that.data.content
        })
    })
    wx.cloud.callFunction({
      name: 'remove',
      data: {
        tablename: 'like', //连接的是like表
        _openid: app.globalData.openid, //取消点赞人的用户ID
        topicid: that.data.topicid //当前话题ID
      },
      success: res => {
        that.setData({
          likeDisable: false //恢复可点击状态
        })
        wx.showToast({
          title: '取消成功',
        })
      },
      fail: res => {
        wx.showToast({
          title: '取消失败',
          icon: 'none'
        })
      }
    })
  },

  //预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
      //当前显示图片
      current: this.data.content.images[index],
      //所有图片
      urls: this.data.content.images
    })
  },

  //删除自己的话题
  onRemoveTopic(e) {
    that.setData({
      removeDisable: true
    })
    wx.showLoading({
      title: '删除中',
    })
    //删除自己的说说同时删除作为外键关联的数据
    wx.cloud.callFunction({
      name: 'remove',
      data: {
        tablename: 'shuoshuo',
        _openid: that.data.topicOpenID, //用户自己的openid
        _id: that.data.topicid //用户自己发布的那条话题ID
      },
      success: res => {
        wx.hideLoading()
        wx.showToast({
          title: '删除成功',
        })
        setTimeout(res => { //删除后自动返回上一页
          wx.navigateBack({
            delta: 1,
          })
        }, 200)
      },
      fail:res=>{
        console.log('删除失败,,,'+res)
      }
    })
  },

  getTextAreaContent(event) {
    this.data.comment = event.detail.value;
  },

  //提交回复
  upReplay(event) {
    that.setData({
      fbDisable: true //防止连续点击
    })
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              that.setData({
                nicheng: res.userInfo.nickName,
                touxiang: res.userInfo.avatarUrl
              })
              //评论内容数据入库
              that.toCommentDatabase()
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
        that.data.fbDisable = false
        that.setData({
          fbDisable: that.data.fbDisable
        })
      }
    })
  },

  //评论内容数据入库
  toCommentDatabase() {
    //有评论数据则提交
    if (that.data.comment.length > 0 && that.data.comment.indexOf(' ') != 0) {
      wx.showLoading({
        title: '发布中……',
      })
      let time = timeUtils.formatTime(new Date()) //格式化时间
      time = time.substring(0, time.length - 3) //不显示具体秒数
      wx.cloud.callFunction({
        name: 'add',
        data: {
          tablename: 'newreplay', //表名
          topicid: that.data.topicid, //话题ID
          topicopenid: that.data.topicOpenID, //话题发布人的openid
          _openid: app.globalData.openid, //评论人的openid
          comment: that.data.comment, //评论内容
          date: new Date(), //时间
          time: time, //格式化后的时间
          nicheng: that.data.nicheng, //评论人昵称
          touxiang: that.data.touxiang, //评论人头像
          hasread: false //发布者是否已经看过
        },
        success: res => {
          that.setData({
            comment: '' //清空评论文本区
          })
          wx.hideLoading()
          wx.showToast({
            title: '回复成功',
            icon: 'success',
            mask: 'true',
          })
          that.getCommentList(that.data.commentList.length) //再次获取自己刚刚评论的内容
        },
        fail: res => {
          wx.showToast({
            title: '评论失败',
            icon: 'none',
            mask: 'true',
          })
        },
        complete: res => {
          that.setData({
            fbDisable: false //恢复可点击
          })
        }
      })
    } else {
      wx.showToast({
        title: '写点东西吧~',
        icon: 'none',
        mask: 'true',
        duration: 1000
      })
    }
  },
})