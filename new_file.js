var app = getApp();
var stores; //门店列表
var first = true; //第一次进来页面
var exchange; //兑换码
var exchange_status = false; //兑换码是否正确、
var commit_status = true; //用于限制调用接口时每次只能发送一次请求，请求结束恢复为true
var agreement_status = [1]; //加速度用户协议状态
var c_status = false; //判断用户是否选中电池故障（顺便记录小故障ID）
var coupon_status=0;//判断价格是否属于优惠价格
Page({
  data: {
    faultListFlag: false, //是否显示故障列表
    name02: "", //现场维修的name
    phone02: "", //现场维修的phone
    store_name: "", //门店名称
    store_address: "", //门店地址
    store_time: "", //门店时间
    store_phone: "", //门店电话
    store_status: false, //门店地址状态
    status: "72", //当前显示的维修方案
    // 维修方式对象
    mode: [{
      img: "../../images/1_2.png",
      img_avtive: "../../images/1_1.png",
      text: "上门维修",
      modeID: "72",
      class: true
    }, {
      img: "../../images/2_2.png",
      img_avtive: "../../images/2_1.png",
      text: "到店维修",
      modeID: "73",
      class: false
    }, {
      img: "../../images/3_2.png",
      img_avtive: "../../images/3_1.png",
      text: "邮寄维修",
      modeID: "74",
      class: false
    }, {
      img: "../../images/4_2.png",
      img_avtive: "../../images/4_1.png",
      text: "现场维修",
      modeID: "75",
      class: false
    }],
    // 用于全局的data
    data: {
      brandName: '',
      modelName: '',
      brandID: '',
      modelID: '',
      name: "",
      phone: "",
      master_id: "", //工程师id
      thumbImg: "", //手机缩略图
      combTampArr: [], //故障详情数组
      imgArr: [], //本地显示图片
      userUploadImgs: [], //需要上传图片的路径
      price: '', //总维修价格
      storeId: '', //地址ID
      serverAddress: "", //服务地址
      province: '', //省份
      city: '', //城市
      district: '', //地区
      address: '', //详情地址
      timeStr: '请选择上门时间', //上门时间
      couponID: '', //优惠券ID
      couponName: '请选择优惠券', //优惠券名称
      couponPrice: 0, //优惠价格
      payPrice: '', //预计需支付
      userID: app.globalData.userid, //用户ID
      repairWay: 72, //维修方式，72上门，73到店，74寄邮,75现场
      orderTime: '', //预约时间，0表示立即出发
      desc: '', //留言
      invitationCode: '', //兑换码
      otherRepair: '', //其他故障描述
      duihuan_price: 0, //兑换码优惠的价格
      is_battery: 0 //是否是免费换电池，1免费换电池，0否，默认0
    },
    selectAddress: "请选择服务地址", //请选择服务地址
    selectAddress01: "请填写您的回寄地址", //请填写您的回寄地址
    selectAddress_status: true, //请选择服务地址状态
    timeShadeFlag: false, //隐藏时间蒙层
    dateArr: [], //日期数组
    timeArr: [], //时段数组
    dateValue: [0],
    timeValue: [0],
    timeFlag: false, //时间控件是否点击了确定
    couponFlag: true, //是否显示优惠券
  },
  onLoad: function(options) {
    var that = this;

    //获取时间规则
    wx.request({
      url: app.globalData.serverUrl + 'getOrderTime',
      data: {},
      method: 'GET',
      success: function(res) {
        //下单时间规则 
        var time_list = res.data.data.time;
        var time_interval_str = JSON.parse(time_list.time_interval_str.trim());
        var time_list_weekArr = time_interval_str.weekArr;
        that.setData({
          time_list: time_list,
          time_interval_str: time_interval_str,
          time_list_weekArr: time_list_weekArr
        })
        //添加下单日期
        that.showTime(parseInt(time_list.longest_appointment));
        //添加下单时段
        that.showTimeDetaile(true);
      },
      fail: function() {}
    })

    // 获取门店列表
    wx.request({
      url: app.globalData.serverUrl + 'getStores',
      data: {},
      method: "GET",
      success: function(res) {
        console.log('获取门店列表:', res);
        if (res.data.error_code == 0) {
          stores = res.data.data.store;
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.error_msg,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
    })
  },
  // 页面显示
  onShow: function() {
    var that = this;
    // console.log("11111111",that.data.data)
    //获取本地下单对象信息
    try {
      var value = wx.getStorageSync('order_data');

     
      console.log("缓存优惠券", value)
      if (!value.couponID) {
        //是否显示选择颜色
        var combTampArr = value.combTampArr;
        var flagTemp = false;

        if (value.color_name) {
          for (var i = 0; i < combTampArr.length; i++) {
            if (combTampArr[i].is_connect_color === 1) {
              flagTemp = true;
            }
          }
        }


        //颜色
        if (typeof value.color_name == 'string') {
          if (value.color_name) {
            var color_name = value.color_name.split(',');
            for (var i = 0; i < color_name.length; i++) {
              color_name[i] = {
                text: color_name[i],
                class: false
              }
            }
            that.setData({
              "data.color_name": color_name,
            })
          }
        }


        that.setData({
          "data.brandName": value.brandName,
          "data.brandID": value.brandID,
          "data.modelName": value.modelName,
          "data.modelID": value.modelID,
          "data.isColor": flagTemp,
          "data.combTampArr": value.combTampArr,
          "data.thumbImg": value.thumbImg,
          "data.price": value.price,
          "data.payPriceprice": value.price
        });
      }
    } catch (e) {
      console.log("fillout_order页面的获取本地数据catch")
      console.log(e)
    }


    if (first) {
      first = false;
      return false;
    }
    // 查看地区是否符合99换电池条件
    that.region_price();

    //获取门店地址ID
    try {
      var order_storeId = wx.getStorageSync('order_storeId');
      var order_data = wx.getStorageSync('order_data');
      console.log('获取门店地址ID', order_data)
      // 保存门店地址ID 
      that.setData({
        "data.storeId": order_storeId
      });
      for (let i in stores) {
        if (stores[i].id == order_storeId) {
          that.setData({
            store_name: stores[i].name,
            store_address: stores[i].address,
            store_time: stores[i].serviceTime,
            store_phone: stores[i].phone,
            store_status: true,
            // "data.couponName": order_data.couponName//设置优惠券名称
          })
        }
      }
      console.log(that.data)

      // 根据优惠券减价格
      if (order_data.couponName != "请选择优惠券") {
        var payPrice = parseFloat(order_data.price) - parseFloat(order_data.couponPrice);
        if (payPrice < 0) {
          payPrice = 0;
        }
        that.setData({
          "data.payPriceprice": payPrice,
          "data.couponID": order_data.couponID,
          "data.couponPrice": order_data.couponPrice,
          "data.couponName": order_data.couponName //设置优惠券名称
        })
      }



    } catch (e) {
      console.log("stores页面的获取本地数据catch")
      console.log(e)
    }


    //判断兑换码是否正确  修改价格
    if (exchange_status) {

      //使用兑换码修改价格
      var combTampArr = that.data.data.combTampArr;
      var tempPrice = 0;
      for (var i = 0, len = combTampArr.length; i < len; i++) {
        if (combTampArr[i].choose_failure !== 20) {
          tempPrice += parseFloat(combTampArr[i].price);
        }
      }
      console.log("54545454", tempPrice)

      that.setData({
        "data.payPriceprice": tempPrice,
      });
    }
  },
  //选择颜色
  click_color: function(e) {
    var index = e.target.dataset.index;
    var color_name = this.data.data.color_name;
    //选择颜色单选 没有class就给添加class，有就删除
    if (color_name[index].class) {
      color_name[index].class = null;
    } else {
      for (let i in color_name) {
        color_name[i].class = null;
      }
      color_name[index].class = 'on';
    }

    this.setData({
      "data.color_name": color_name
    });

    wx.setStorageSync('order_data', this.data.data)
  },
  // 选择优惠券
  openwin: function(event) { //跳转页面

    if(coupon_status==1){
      wx.showModal({
        title: '提示',
        content: '当前价格为活动价，不能使用优惠券',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            return false;
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    }else{

      var path = event.target.dataset.url;
      wx.navigateTo({
        url: '../' + path + '/' + path
      })
    }
  },
  //立即维修
  formSubmit: function(e) {
  
    // console.log('form发生了submit事件，携带数据为：', this.data.data)
    var form_id = e.detail.formId; //表单ID
    var comIds = []; //故障ID数组
    var orderTime = ""; //上门时间
    var form_status = false; //表单是否可提交状态
    var that = this;
    // 判断当前选择的维修方式
    var data = this.data.data
    if (data.repairWay == 72) { // 上门维修----------------------------------------------------------------
      // 上门维修
      if (that.data.selectAddress_status == true) {
        wx.showModal({
          title: '提示',
          content: '请选择服务地址',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return false;
      } else if (data.timeStr == '请选择上门时间') {
        wx.showModal({
          title: '提示',
          content: '请选择上门时间',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return false;
      } else {
        var year = (new Date()).getFullYear();
        var month = data.timeStr.split('月')[0].replace(/(明天|今天)/gi, '');
        var day = data.timeStr.split('月')[1].split('日')[0];
        var hours = data.timeStr.split('日')[1];
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }

        orderTime = year + '-' + month + '-' + day + ' ' + hours;
        if (hours == '立即上门') {
          orderTime = 0;
        }
        // 表单状态为真
        form_status = true;
      }
    } else if (data.repairWay == 73) { // 到店维修----------------------------------------------------------
      // 到店维修
      if (data.storeId == '' || !that.data.store_status) {
        wx.showModal({
          title: '提示',
          content: '请选择门店',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return false;
      } else if (that.data.name02 == '') {
        wx.showModal({
          title: '提示',
          content: '请输入您的姓名',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return false;
      } else if (that.data.phone02.length != 11) {
        if (that.data.phone02 == "") {
          wx.showModal({
            title: '提示',
            content: '请输入您的手机号码',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return false;
        } else {
          wx.showModal({
            title: '提示',
            content: '请输入正确的手机号码',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return false;
        }
      } else {
        // 表单状态为真
        form_status = true;
        that.setData({
          "data.name": that.data.name02,
          "data.phone": that.data.phone02
        })
      }
    } else if (data.repairWay == 74) { // 邮寄维修-------------------------------------
      // 邮寄维修
      if (that.data.selectAddress_status == true) {
        wx.showModal({
          title: '提示',
          content: '请填写您的回寄地址',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return false;
      } else {
        // 表单状态为真
        form_status = true;
      }

    } else if (data.repairWay == 75) { // 现场维修------------------------------------
      // 现场维修
      if (that.data.name02 == '') {
        wx.showModal({
          title: '提示',
          content: '请输入您的姓名',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return false;
      } else if (that.data.phone02.length != 11) {
        if (that.data.phone02 == "") {
          wx.showModal({
            title: '提示',
            content: '请输入您的手机号码',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return false;
        } else {
          wx.showModal({
            title: '提示',
            content: '请输入正确的手机号码',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return false;
        }
      } else if (data.master_id == '') {
        wx.showModal({
          title: '提示',
          content: '请输入工程师编号',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return false;
      } else {
        // 表单状态为真
        form_status = true;
        that.setData({
          "data.name": that.data.name02,
          "data.phone": that.data.phone02
        })
      }
    }

    if (form_status) {
      var combTampArr = data.combTampArr;
      for (var i = 0; i < combTampArr.length; i++) {
        comIds.push(combTampArr[i].id);
      }

      //选中的颜色
      var isColor = that.data.data.isColor;
      var colorNameArr = that.data.data.color_name;
      var colorName = '';
      if (isColor && colorNameArr) {
        for (var i = 0; i < colorNameArr.length; i++) {
          if (colorNameArr[i].class) {
            colorName = colorNameArr[i].text;
          }
        }
        if (!colorName) {
          wx.showModal({
            title: '提示',
            content: '请选择颜色',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return false;
        }
      }

      //加速度用户协议是否勾选
      if (agreement_status.length == 0) {
        wx.showModal({
          title: '提示',
          content: '请勾选同意下方的《服务协议》，即可立刻维修哦',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return false;

      }
      //限制请求结束前不能再提交
      if (commit_status) {
        commit_status = false;
      } else {
        return false;
      }

      wx.showToast({
        title: '提交预约中...',
        icon: 'loading',
        duration: 10000,
        mask: true
      });

      var from_appid = null;
      try {
        from_appid = wx.getStorageSync('from_appid');
        console.log('from_appid:', from_appid)
      } catch (e) {
        // Do something when catch error
        console.log(e)
      }

      wx.request({
        url: app.globalData.serverUrl + 'battery/batteryOrder',
        data: {
          from_appid: from_appid,
          modelName: data.modelName,
          colorName: colorName,
          storeId: data.storeId,
          orderTime: orderTime,
          modelID: data.modelID,
          repairWay: data.repairWay,
          desc: data.desc,
          // promo_code: data.invitationCode, //兑换码
          name: data.name,
          phone: data.phone,
          master_id: data.master_id, //工程师id
          province: data.province, //省份
          city: data.city, //城市
          district: data.district, //地区
          address: data.address, //详情地址
          couponID: data.couponID,
          userID: app.globalData.userid,
          otherRepair: "", //其他故障描述
          is_battery: data.is_battery //是否是免费换电池，1免费换电池，0否，默认0
        },
        method: 'POST',
        success: function(res) {
          console.log(res);
          if (res.data.error_code == 0) {
            wx.redirectTo({
              url: '../success/success?id=' + res.data.data.id + '&status=' + that.data.status + '&storeId=' + data.storeId
            })
          } else {
            wx.showModal({
              title: '提示',
              content: JSON.stringify(res),
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        },
        fail: function() {
          // fail
          wx.showModal({
            title: '提示',
            content: '接口调用失败fail',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        },
        complete: function() {
          wx.hideToast();
          //请结束回复提交状态
          commit_status = true;
        }
      })
    }
  },
  //输入留言
  inputMark: function(event) {
    this.data.data.desc = event.detail.value
    this.setData({
      data: this.data.data
    })

  },
  //留言失去焦点
  blurMark: function() {
    try {
      wx.setStorageSync('order_data', this.data.data)
    } catch (e) {
      console.log(e)
    }
  },
  //输入兑换码
  inputInvitation: function(event) {
    this.data.data.invitationCode = event.detail.value
    this.setData({
      data: this.data.data
    })
    //保存兑换码
    exchange = event.detail.value

  },
  //兑换码 兑换按钮
  exchange_fun: app.throttle(1000, function() {

    var that = this;
    //获取当前机型
    var exchange_model = that.data.data.modelID;
    var combTampArr = that.data.data.combTampArr;
    if (combTampArr) {
      var modelIdArr = [168, 169, 22, 23, 237, 16, 35, 3, 1, 2];

      if (modelIdArr.indexOf(exchange_model) > -1) { //含有modelID
        var flagTemp = true;
        for (var i = 0, len = combTampArr.length; i < len; i++) {
          if (combTampArr[i].choose_failure === 20) {
            flagTemp = false;
            break;
          }
        }
        if (flagTemp) {
          wx.showModal({
            title: '提示',
            content: "维修故障类型必须包含电池故障才能使用兑换码",
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })

          // 清空兑换码
          that.setData({
            "data.invitationCode": ""
          });
          return false;
        }

      } else {
        wx.showModal({
          title: '提示',
          content: "该机型不在本次活动范围之内",
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        // 清空兑换码
        that.setData({
          "data.invitationCode": ""
        });
        return false;
      }
    }
    wx.request({
      url: app.globalData.serverUrl + 'checkPromoCode', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        promo_code: exchange,
        modelId: exchange_model
      },
      header: {

      },
      success: function(res) {
        commit_status = true;
        // console.log("兑换码", res.data)
        //判断兑换码是否正确
        // console.log("兑换码", exchange_status)
        if (res.data.error_code == 0) {
          exchange_status = true;
          //使用兑换码修改价格
          var tempPrice = 0;
          for (var i = 0, len = combTampArr.length; i < len; i++) {
            if (combTampArr[i].choose_failure !== 20) {
              tempPrice += parseFloat(combTampArr[i].price);
            } else if (combTampArr[i].choose_failure == 20) {
              that.setData({
                "data.duihuan_price": combTampArr[i].price
              });
            }
          }
          // console.log("54545454", tempPrice)

          that.setData({
            "data.payPriceprice": tempPrice,
          });
          wx.showToast({
            title: '兑换成功',
            icon: 'success',
            duration: 2000,
            mask: true
          });
        } else {
          exchange_status = false;
          // 清空兑换码
          that.setData({
            "data.invitationCode": ""
          });
          wx.showModal({
            title: '提示',
            content: res.data.error_msg,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }

      }
    })

  }),
  //兑换码失去焦点
  blurInvitation: function() {
    try {
      wx.setStorageSync('order_data', this.data.data)
    } catch (e) {
      console.log(e)
    }
  },

  //选择时间蒙层
  selectConTime: function() {
    this.setData({
      timeFlag: false,
      timeShadeFlag: !this.data.timeShadeFlag
    })
  },
  //时间取消
  time_cancle: function() {
    this.setData({
      timeShadeFlag: !this.data.timeShadeFlag
    })
  },
  //时间确定
  time_confirm: function() {
    var dateArr = this.data.dateArr;
    var timeArr = this.data.timeArr;

    var time = dateArr[this.data.dateValue].text;
    time += timeArr[this.data.timeValue].text;
    this.data.data.timeStr = time

    this.setData({
      timeFlag: true,
      data: this.data.data,
      timeShadeFlag: false
    });

    try {
      wx.setStorageSync('order_data', this.data.data)
    } catch (e) {
      console.log(e)
    }

  },
  //选择日期
  ChangeDate: function(e) {
    var index = e.detail.value[0];
    console.log(index);
    this.setData({
      dateValue: [index],
      timeValue: [0],
    });
    if (index == 0) {
      this.showTimeDetaile(true);
    } else {
      this.showTimeDetaile(false);
    }
  },
  //选择时间时段
  ChangeTime: function(e) {
    var index = e.detail.value[0];
    this.setData({
      timeValue: [index]
    });
    //点击确定后
    if (this.data.timeFlag) {
      this.time_confirm()
    }
  },
  //添加下单日期
  showTime: function(num) {
    if (this.isLeapYear(year)) {
      var show_month = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];
    } else {
      var show_month = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];
    }
    var show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth();
    var date = time.getDate() - 1;
    var day = time.getDay() - 1;
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var second = time.getSeconds();
    month < 10 ? month = '0' + month : month;
    month = parseInt(month) + 1;
    var monthFlag = true;
    var monthNumber = month; //月份存储变量
    var dataNumber = ''; //日存储变量
    var dateArr = [];
    for (var i = 0; i < num; i++) {
      //星期
      var number = day + 1;
      if (number >= 7) {
        number = number - 7;
      }
      day = number;
      //日期
      dataNumber = date + 1;
      //月份
      if (dataNumber > show_month[monthNumber - 1]) {
        dataNumber = dataNumber - show_month[monthNumber - 1];
        monthNumber = monthNumber + 1;
        if (monthNumber > 12) {
          monthNumber = monthNumber - 12;
        }
      }
      date = dataNumber;
      //检查星期数组是否有相应的星期
      if (!this.checkoutWeek(show_day[number])) {
        num++;
        continue;
      }
      if (i == 0) {
        dateArr.push({
          text: '今天' + monthNumber + '月' + dataNumber + '日',
          class: true
        })
      } else if (i == 1) {
        dateArr.push({
          text: '明天' + monthNumber + '月' + dataNumber + '日',
          class: false
        })
      } else {
        dateArr.push({
          text: '' + monthNumber + '月' + dataNumber + '日',
          class: false
        })
      }
    }
    // console.log(dateArr)
    this.setData({
      dateArr: dateArr
    })
  },
  //添加下单时段
  showTimeDetaile: function(flag) {
    var time_list = this.data.time_list;
    var time_interval_str = this.data.time_interval_str;
    var sm_star_hour = parseInt(time_interval_str.sm_star_hour); //开始小时
    var sm_star_minute = parseInt(time_interval_str.sm_star_minute); //开始分钟
    var sm_end_hour = parseInt(time_interval_str.sm_end_hour); //结束小时
    var sm_end_minute = parseInt(time_interval_str.sm_end_minute); //结束分钟
    var seg_time_periods = parseInt(time_list.seg_time_periods); //时间间隔多少		
    var star = sm_star_hour * 60 + sm_star_minute;
    var end = sm_end_hour * 60 + sm_end_minute;
    var star_m = star;
    star_m = star_m + seg_time_periods;
    var timeArr = [];
    if (flag) {
      timeArr.push({
        text: '立即上门',
        class: false
      })
    }
    while (star_m <= (end + seg_time_periods)) {
      if (flag) { //如果选择是今天
        //判断今天已经过时的时段
        var totalMunite = (new Date()).getHours() * 60 + (new Date()).getMinutes(); //当前时间总分钟数
        var reservation_time = parseInt(time_list.reservation_time); //提前多少分钟
        if (star >= (totalMunite + reservation_time)) {
          timeArr.push({
            text: this.transformTime(star),
            class: false
          })
        }
      } else {
        timeArr.push({
          text: this.transformTime(star),
          class: false
        })
      }
      star = star_m;
      star_m = star_m + seg_time_periods;
    }
    this.setData({
      timeArr: timeArr
    })
  },
  //总分钟转换为24小时标准时间
  transformTime: function(time) {
    var hour = parseInt(time / 60);
    var minute = time % 60;
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return hour + ':' + minute;
  },
  //检查星期数组是否有相应的星期
  checkoutWeek: function(week) {
    var time_list_weekArr = this.data.time_list_weekArr;
    for (var i = 0; i < time_list_weekArr.length; i++) {
      if (time_list_weekArr[i] == week) {
        return true;
      }
    }
    return false;
  },
  //是否闰年
  isLeapYear: function(year) {
    var cond1 = year % 4 == 0; //条件1：年份必须要能被4整除
    var cond2 = year % 100 != 0; //条件2：年份不能是整百数
    var cond3 = year % 400 == 0; //条件3：年份是400的倍数
    //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
    //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
    //所以得出判断闰年的表达式：
    var cond = cond1 && cond2 || cond3;
    if (cond) {
      //			        alert(year + "是闰年");
      return true;
    } else {
      //			        alert(year + "不是闰年");
      return false;
    }
  },
  // 选择维修方式
  selectMode: function(e) {
    var that = this;
    var status = e.target.dataset.modeid;
    var index = e.target.dataset.index;
    var mode = this.data.mode;
    for (var i = 0; i < mode.length; i++) {
      mode[i].class = false;
      if (index == i) {
        mode[i].class = true;
      }
    }

    this.setData({
      status: status,
      mode: mode,
      "data.repairWay": status
    })
    //判断是否需要请求 优惠价格接口
    var region_price_status=false;
    //根据维修方式逐一判断
    if (status == 72){
      if (!that.data.selectAddress_status ){
        console.log(that.data.data.selectAddress)
        region_price_status = true;
      }else{
        region_price_status = false;
      }
    } else if (status == 73){
      if (that.data.store_status ==true) {
        region_price_status = true;
      } else {
        region_price_status = false;
      }
    } else if (status == 74) {
      if (!that.data.selectAddress_status ) {
        region_price_status = true;
      } else {
        region_price_status = false;
      }
    } else if (status == 75) {
      region_price_status = true;
    }

    if (region_price_status){
      // 查看地区是否符合99换电池条件
      that.region_price();
    }else{
      // 获取本地下单对象信息
      var obj = wx.getStorageSync('order_data');
      var combTampArr = obj.combTampArr;
      var tempPrice=0;
      //把电池故障价格显示为99（单纯只是显示效果）
      for (var i = 0; i < combTampArr.length; i++) {
        if (combTampArr[i].choose_failure === 20) {
          tempPrice += 99;      
        } else {
          tempPrice += parseFloat(combTampArr[i].price);
        }
      }
    
      that.setData({
        "data.payPriceprice": tempPrice,
      });
    }
    
    //优惠券
    try {
      var order_data = wx.getStorageSync('order_data');
      // 根据优惠券减价格
      if (order_data.couponName != "请选择优惠券") {
        var payPrice = parseFloat(order_data.price) - parseFloat(order_data.couponPrice);
        if (payPrice < 0) {
          payPrice = 0;
        }
        that.setData({
          "data.payPriceprice": payPrice,
        })
      }



    } catch (e) {
      console.log('selectMode:', e)
    }
    //判断兑换码是否正确  修改价格
    if (exchange_status) {

      //使用兑换码修改价格
      var combTampArr = that.data.data.combTampArr;
      var tempPrice = 0;
      for (var i = 0, len = combTampArr.length; i < len; i++) {
        if (combTampArr[i].choose_failure !== 20) {
          tempPrice += parseFloat(combTampArr[i].price);
        }
      }
      console.log("54545454", tempPrice)

      that.setData({
        "data.payPriceprice": tempPrice,
      });
    }

  },
  // 请选择服务地址
  selectAddress: function() {
    var that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.address"] === false) {
          wx.openSetting({
            success: (res) => {
              console.log('openSetting:', res)
            }
          })
        }
      }
    })
    wx.chooseAddress({
      success: function(res) {
        that.setData({
          "data.name": res.userName, //姓名
          "data.phone": res.telNumber, //号码
          "data.province": res.provinceName, //省份
          "data.city": res.cityName, //城市
          "data.district": res.countyName, //区
          "data.address": res.detailInfo, //详细地址
          "data.serverAddress": res.provinceName + res.cityName + res.countyName + res.detailInfo, //服务地址
          selectAddress_status: false //请选择服务地址状态
        })
        try {
          wx.setStorageSync("order_Address", {
            "name": res.userName, //姓名
            "phone": res.telNumber, //号码
            "province": res.provinceName, //省份
            "city": res.cityName, //城市
            "district": res.countyName, //区
            "address": res.detailInfo, //详细地址
            "serverAddress": res.provinceName + res.cityName + res.countyName + res.detailInfo, //服务地址
            selectAddress_status: false //请选择服务地址状态
          })
        } catch (e) {

        }
          // 查看地区是否符合99换电池条件
          that.region_price();

      },
      fail: function() {
        console.log("小程序用户信息没授权")
        that.setData({
          selectAddress_status: true
        })
        
      }
    })
  },
  // 现场维修input事件
  input_name: function(e) {
    this.setData({
      name02: e.detail.value
    })
  },
  input_phone: function(e) {
    this.setData({
      phone02: e.detail.value
    })
  },
  input_master_id: function(e) {
    this.setData({
      "data.master_id": e.detail.value
    })
  },
  //重选故障 返回上一页
  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  //点击故障列表
  showFlautCon: function() {
    this.setData({
      faultListFlag: true
    })
  },
  //关闭故障列表弹窗
  closefaultListBG: function() {
    this.setData({
      faultListFlag: false
    })
  },
  onReady: function() {
    // 页面渲染完成
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    stores = ''; //门店列表
    first = true; //第一次进来页面
    exchange = ''; //兑换码
    exchange_status = false; //兑换码是否正确
    console.log('fff')
  },
  // 选择门店
  clickStore: function() {
    wx.navigateTo({
      url: '../stores/stores'
    })
  },
  //空函数
  null_fun: function() {

  },


  //跳转到用户协议页面
  openwin02: function(event) {
    var path = event.target.dataset.url;
    wx.navigateTo({
      url: '../' + path + '/' + path
    })
  },
  //加速度用户协议选项
  checkboxChange: function(e) {
    agreement_status = e.detail.value;
    // console.log('checkbox发生change事件，携带value值为：', agreement_status)
  },
  // 查看地区是否符合99换电池条件
  region_price: function() {
    var that = this;
    var obj, order_storeId, order_Address,c_status;
    // 获取本地下单对象信息
    obj = wx.getStorageSync('order_data');
    // 判断是否选中了电池故障
    for (var i = 0; i < obj.combTampArr.length; i++) {
      if (obj.combTampArr[i].choose_failure == 20) {
        c_status = obj.combTampArr[i].detail_failure;
      }
    }
      // console.log("是否选中换电池", c_status)
    if (c_status) {
      try {
        // 获取本地门店ID信息
        order_storeId = wx.getStorageSync('order_storeId');
        // 上门维修地址
        order_Address = wx.getStorageSync('order_Address');
        console.log("01", obj)
        console.log("02", order_storeId)
        console.log("03", order_Address)
        console.log("04", that.data.data.repairWay)
        if (obj && (order_storeId || order_Address || that.data.data.repairWay)) {
          wx.request({
            url: app.globalData.serverUrl + 'getRepairPrice',
            data: {
              brandID: obj.brandID ? obj.brandID : "", //品牌
              modelID: obj.modelID ? obj.modelID : "", //型号
              city: order_Address.city ? order_Address.city : "", //城市 
              district: order_Address.district ? order_Address.district : "", //地区
              ChooseFailure: 20, //大类故障
              storeID: order_storeId ? order_storeId : "", //门店id
              repairWay: that.data.data.repairWay ? that.data.data.repairWay : 72, //维修方式
              detailFailure: c_status, //故障详情
            },
            method: 'POST',
            success: function(res) {
              // console.log("99换电池",res);
              if (res.data.error_code == 0) {
                console.log("电池价格", res.data.data.price)
                var dianchi_price = parseInt(res.data.data.price);
                var tempPrice = 0;
                var combTampArr = obj.combTampArr;
                 //判断价格是否属于优惠价格
                coupon_status = res.data.data.is_activity; //1为优惠价格，0为原价
                if (coupon_status) {
                  // 为优惠价格，不能使用优惠券
                  that.setData({
                    'data.couponID': '',
                    'data.couponName': '请选择优惠券',
                    'data.couponPrice': ''
                  });
                }
                for (var i = 0; i < combTampArr.length; i++) {
                  if (combTampArr[i].choose_failure === 20) {
                    tempPrice += dianchi_price;

                    // 故障列表的显示价格
                    var obj_com=that.data.data.combTampArr;
                    obj_com[i].price=dianchi_price;
                    that.setData({
                      "data.combTampArr":obj_com
                    });
                  } else {
                    tempPrice += parseFloat(combTampArr[i].price);
                  }
                }
                if(that.data.data.couponID && that.data.data.couponPrice){
                  tempPrice = tempPrice - that.data.data.couponPrice
                }
                that.setData({
                  "data.payPriceprice": tempPrice,
                });

              } else {
                console.log("99换电池接口失败")
              }
             
            },
            fail: function() {
              // fail
            },
            complete: function() {

            }
          })
        }
      } catch (e) {}

    }
  }
})
