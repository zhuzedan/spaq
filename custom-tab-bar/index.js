Component({
  data: {
    selected: 0,
    color: "#000",
    roleId: '',
    selectedColor: "#3161ff",
    allList: [{
      // 检查员角色
      list1: [{
        pagePath: "/pages/index/index",
        iconPath: "../assets/tabbar/check.png",
        selectedIconPath: "../assets/tabbar/check_select.jpg",
        text: "检查"
      }, {
        pagePath: "/pages/mine/index",
        iconPath: "../assets/tabbar/me.png",
        selectedIconPath: "../assets/tabbar/me_select.png",
        text: "我的"
      }],
      // 团队长角色
      list2: [{
          pagePath: "/pages/index/index",
          iconPath: "../assets/tabbar/check.png",
          selectedIconPath: "../assets/tabbar/check_select.jpg",
          text: "检查"
        },
        {
          "pagePath": "/pages/approval/index",
          "text": "审批",
          "iconPath": "../assets/tabbar/approval.png",
          "selectedIconPath": "../assets/tabbar/approval_select.png"
        },
        {
          pagePath: "/pages/mine/index",
          iconPath: "../assets/tabbar/me.png",
          selectedIconPath: "../assets/tabbar/me_select.png",
          text: "我的"
        }
      ],
      list: []
    }],
  },
  attached() {
    const roleId = 2
    if (roleId == 1) {
      this.setData({
        list: this.data.allList[0].list1
      })
    } else if (roleId == 2) {
      this.setData({
        list: this.data.allList[0].list2
      })
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})