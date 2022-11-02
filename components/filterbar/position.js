const twoStageDataLeft = {
  value: '1',
  label: '类别',
  children: [{
      value: '1',
      label: '公益',
      children: [{
          value: '0',
          label: '养老院'
        },
        {
          value: '1',
          label: '农家乐'
        },
        {
          value: '2',
          label: '养老院'
        },
        {
          value: '3',
          label: '养老院'
        }
      ]
    },
    {
      value: '2',
      label: '商业',
      children: [{
          value: '0',
          label: '建筑工地'
        },
        {
          value: '1',
          label: '建筑工地'
        },
        {
          value: '2',
          label: '建筑工地'
        }
      ]
    }
  ]
}

const radioData = {
  value: '2',
  label: '区域',
  children: [{
      value: '1',
      label: '鄞州区',
      children: [{
          value: '0',
          label: '钟公庙街道'
        },
        {
          value: '1',
          label: '下应街道'
        },
        {
          value: '2',
          label: '潘火街道'
        },
        {
          value: '3',
          label: '首南街道'
        },
        {
          value: '4',
          label: '中河街道'
        },
        {
          value: '4',
          label: '梅墟街道'
        },
        {
          value: '4',
          label: '白鹤街道'
        },
        {
          value: '4',
          label: '百丈街道'
        },
        {
          value: '4',
          label: '东胜街道'
        },
        
      ]
    },
    {
      value: '2',
      label: '江北区',
      children: [{
          value: '0',
          label: '建筑工地'
        },
        {
          value: '1',
          label: '建筑工地'
        },
        {
          value: '2',
          label: '建筑工地'
        }
      ]
    },
    {
      value: '3',
      label: '海曙区',
      children: [{
          value: '0',
          label: '建筑工地'
        },
        {
          value: '1',
          label: '建筑工地'
        },
        {
          value: '2',
          label: '建筑工地'
        }
      ]
    },
    {
      value: '4',
      label: '镇海区',
      children: [{
          value: '0',
          label: '建筑工地'
        },
        {
          value: '1',
          label: '建筑工地'
        },
        {
          value: '2',
          label: '建筑工地'
        }
      ]
    },
    {
      value: '5',
      label: '北仑区',
      children: [{
          value: '0',
          label: '建筑工地'
        },
        {
          value: '1',
          label: '建筑工地'
        },
        {
          value: '2',
          label: '建筑工地'
        }
      ]
    }
  ]
}

const sortData = {
  value: '3',
  label: '排序',
  children: [{
    value: '0',
    label: '距离排序'
  }, {
    value: '1',
    label: '发布时间'
  }]
}

const multiData = {
  label: '筛选',
  children: [{
      value: '4',
      label: '学历',
      children: [{
          value: '0',
          label: '不限'
        }, {
          value: '1',
          label: '高中及以下'
        }, {
          value: '2',
          label: '大专'
        },
        {
          value: '3',
          label: '本科'
        }, {
          value: '4',
          label: '硕士'
        }, {
          value: '5',
          label: '博士'
        }
      ]
    },
    {
      value: '5',
      label: '规模',
      children: [{
          value: '0',
          label: '不限',
        }, {
          value: '1',
          label: '0-50人'
        }, {
          value: '2',
          label: '50-100人'
        },
        {
          value: '3',
          label: '100-500人'
        }, {
          value: '4',
          label: '500-1000人'
        }, {
          value: '5',
          label: '1000人以上'
        }
      ]
    },
    {
      value: '6',
      label: '薪资',
      children: [{
        value: '0',
        label: '不限'
      }, {
        value: '1',
        label: '5k以下'
      }, {
        value: '2',
        label: '5K~10K'
      }, {
        value: '3',
        label: '10K以上'
      }]
    },
    {
      value: '7',
      label: '工作经验',
      children: [{
          value: '0',
          label: '不限'
        }, {
          value: '1',
          label: '应届'
        }, {
          value: '2',
          label: '1年以下'
        },
        {
          value: '3',
          label: '1-3年'
        }, {
          value: '4',
          label: '3-5年'
        }, {
          value: '5',
          label: '5-10年'
        }, {
          value: '6',
          label: '10年以上'
        }
      ]
    }
  ]
}

module.exports = {
  twoStageDataLeft: twoStageDataLeft,
  radioData: radioData,
  sortData: sortData,
  multiData: multiData
}