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
          label: '餐饮企业'
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

module.exports = {
  twoStageDataLeft: twoStageDataLeft,
  radioData: radioData,
  sortData: sortData,
}