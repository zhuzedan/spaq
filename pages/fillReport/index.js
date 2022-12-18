// pages/fillReport/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 本地图片缓存链接
        imageList: [],
        // oss链接
        imageListUrl: [],
        photoId: [],
        photoTypeName: [],
        photoid: '',
        phototypename: '',
        sort: 0,
        // 表单类型与名称
        checkPhotoList: '',
        state: '',
        info: '',
        currentNum: 0,
        checked: true,
        editInformation: 1,
        stepList: [{
            name: '1'
        }, {
            name: '2'
        }, {
            name: '3'
        }, {
            name: '4'
        }, { name: 's' }, { name: 's' }, { name: 's' }, { name: 's' }],

        stepNum: 1 //当前的步数

    },
    forEdit1() {
        this.setData({
            editInformation: 2
        })
    },
    // 门头照片选择
    upLoadImage: function (e) {
        console.log(e.currentTarget.dataset);
        console.log(e.currentTarget.dataset.photoid)
        console.log(e.currentTarget.dataset.phototypename);
        var photoId = e.currentTarget.dataset.photoid;
        var photoTypeName = e.currentTarget.dataset.phototypename;
        this.setData({
            photoid: photoId,
            phototypename: photoTypeName
        })
        var that = this;
        wx.chooseMedia({
            camera: 'back',
            count: 9,
            mediaType: ['image'],
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                // console.log(res.tempFiles);
                var imageList = that.data.imageList;
                var tempFiles = res.tempFiles;
                // imageList数组的值为小程序图片本地缓存的地址
                for (var i = 0; i < tempFiles.length; i++) {
                    if (tempFiles.length >= 9) {
                        that.setData({
                            imageList: imageList
                        });
                        return false;
                    } else {
                        imageList.push(tempFiles[i].tempFilePath)
                    }
                }
                // console.log(imageList);
                that.setData({
                    imageList: imageList
                });
                // 上传到oss
                that.uploadFile();
            },
        })
    },
    // 上传图片url到oss
    uploadFile: function (e) {
        var that = this;
        // console.log(that.data.imageList);
        for (var i = 0; i < that.data.imageList.length; i++) {
            // var filePath = this.data.imageList[index];
            // console.log(this.data.imageList[i]);
            wx.showLoading({
                title: '上传中',
            })
            wx.uploadFile({
                filePath: that.data.imageList[i],
                name: 'file',
                url: app.globalData.url + '/api/app-check/uploadPic',
                header: {
                    "Authorization": "Bearer " + app.globalData.userInfo.token
                },
                success: (res) => {
                    // 将返回的json格式数据转换成对象
                    var successData = res.data
                    var jsonStr = successData.replace(" ", "")
                    if (typeof jsonStr != 'object') {
                        jsonStr = jsonStr.replace(/\ufeff/g, "");
                        var jj = JSON.parse(jsonStr);
                        res.data = jj;
                    }
                    // that.data.imageListUrl.concat(res.data.data.url)
                    // console.log(res.data.data.url);
                    that.setData({
                        imageListUrl: that.data.imageListUrl.concat(res.data.data.url)
                    })
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 2000);
                    console.log(that.data.imageListUrl);
                    that.insertReportPhoto()
                }
            })
        }
    },
    // 新增图片接口
    insertReportPhoto() {
        var that = this;
        for (var i = 0; i < that.data.imageListUrl.length; i++) {
            that.data.sort++;
            wx.request({
                url: app.globalData.url + '/api/app-check/insertReportPhoto',
                header: {
                    "Authorization": "Bearer " + app.globalData.userInfo.token
                },
                data: {
                    photoId: that.data.photoid,
                    photoTypeName: that.data.phototypename,
                    picAdd: that.data.imageListUrl[i],
                    reportFormId: 1,
                    sort: that.data.sort
                },
                method: 'POST',
                success: (res) => {
                    console.log(res.data);
                }
            })
        }
    },
    // 删除图片
    deleteImg: function (e) {
        var imageList = this.data.imageList;
        var index = e.currentTarget.dataset.index;
        imageList.splice(index, 1);
        this.setData({
            imageList: imageList
        });
    },
    // 预览图片
    previewImg: function (e) {
        //获取当前图片的下标
        var index = e.currentTarget.dataset.index;
        //所有图片
        var imageList = this.data.imageList;
        wx.previewImage({
            //当前显示图片
            current: imageList[index],
            //所有图片
            urls: imageList
        })
    },
    goSignature(e) {
        console.log(e.currentTarget.dataset.reportformid);
        wx.navigateTo({
            url: '../signature/index?reportFormId=' + e.currentTarget.dataset.reportformid,
        })
    },
    onChange(event) {
        this.setData({
            checked: event.detail,
        });
    },
    onChangeRadio(event) {
        this.setData({
            radio: event.detail,
        });
    },
    numSteps() {
        this.setData({
            stepNum: this.data.stepNum == this.data.stepList.length ? 1 : this.data.stepNum + 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options);
        this.setData({
            checkPointId: options.checkPointId
        })
        var that = this;
        // 查询单个详情
        wx.request({
            url: app.globalData.url + '/api/app-check/queryCheckPointOne',
            data: {
                checkPointId: options.checkPointId
            },
            header: {
                "Authorization": "Bearer " + app.globalData.userInfo.token
            },
            method: 'GET',
            success: function (res) {
                that.setData({
                    info: res.data.data
                })
            },
            fail: function (error) {
                console.log(error);
            }
        })
        // 查询所需检查点类型
        wx.request({
            url: app.globalData.url + '/api/app-check/queryCheckPhotoList',
            data: {
                categoryCode: options.categoryCode,
                orgCode: options.streetOrgCode
            },
            header: {
                "Authorization": "Bearer " + app.globalData.userInfo.token
            },
            method: 'GET',
            success: function (res) {
                // console.log(res.data);
                var dataArray = res.data.data
                for (var i = 0; i < dataArray.length; i++) {
                    // console.log(dataArray[i]["id"])
                    // console.log(dataArray[i]["photoTypeName"]);
                    that.setData({
                        photoId: that.data.photoId.concat(dataArray[i]["id"]),
                        photoTypeName: that.data.photoTypeName.concat(dataArray[i]["photoTypeName"]),
                        checkPhotoList: res.data.data
                    })
                }
                // console.log(that.data.photoId);
                // console.log(that.data.photoTypeName);
                console.log(that.data.checkPhotoList);
            }
        })
    },
    handle_name(e) {
        this.setData({ handle_name: e.detail.value })
    },
    handle_address(e) {
        this.setData({ handle_address: e.detail.value })
    },
    handle_user(e) {
        this.setData({ handle_user: e.detail.value })
    },
    handle_phone(e) {
        this.setData({ handle_phone: e.detail.value })
    },
    submit_basic() {
        if (this.data.handle_name && this.data.handle_address && this.data.handle_user && this.data.handle_phone) {
            wx.showLoading({
                success: res => {
                    wx.request({
                        url: app.globalData.url + '/api/app-check/insertReportForm',
                        method: 'POST',
                        header: {
                            "Authorization": "Bearer " + app.globalData.userInfo.token
                        },
                        data: {
                            "checkPointId": this.data.checkPointId,
                            "checkPointNAddress": this.data.handle_address,
                            "checkPointName": this.data.handle_name,
                            "connectName": this.data.handle_user,
                            "connectTel": this.data.handle_phone,
                            "userId": app.globalData.getUserInfo.userId
                        },
                        success: res => {
                            wx.hideLoading()
                            if (res.data.code == 200) {
                                wx.showToast({
                                    title: '提交成功',
                                    icon: 'none'
                                })
                                this.setData({
                                    currentNum:1
                                })
                            }
                            else {
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: "none"
                                })
                            }
                            // console.log(res);
                        }
                    })
                }
            })
        }
        else {
            wx.showToast({
                title: '请完善信息',
                icon: "none"
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    handleItemChange(e) {
        console.log(e.detail.index);
        const current = e.detail.index;
        this.setData({
            currentNum: current
        })
    }
})
