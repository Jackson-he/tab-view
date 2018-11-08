const _duration = 200;
const animation = wx.createAnimation({
  duration: _duration
});
Component({
  properties: {
    navList: {
      type: Array
    },
    currentTabIndex: {
      type: Number
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  externalClasses: ['i-class'],
  data: {
    marginLeft: 1000,
    windowHeight: 0,
    animationData: {},
    contenListMarginTop: 0,
    backgroundColor: ''
  },
  methods: {
    scrollToBottom() {
      this.triggerEvent('bottomReached');
    },

    tabClick(e) {
      this.swiperChange(e);
    },

    swiperChange(e) {
      const currentTabIndex = e.type === 'tap' ? e.target.dataset.current : e.detail.current;
      if (this.properties.currentTabIndex === currentTabIndex) return;
      this.setData({
        currentTabIndex
      });
      this.animationFn();
      this.triggerEvent('swiperChange', currentTabIndex);
    },

    animationFn() {
      let moveStep = 0; // 当前移动步长

      let width = 0; // 当前元素宽度

      const index = this.data.currentTabIndex;
      const query = wx.createSelectorQuery().in(this);
      query.selectAll('.nav-bar-item').boundingClientRect();
      query.exec(res => {
        const arr = res[0];
        moveStep = arr[index].left - arr[this.data.lockIndex].left;
        width = arr[index].width;
        animation.translateX(moveStep).width(width).step();
        this.setData({
          animationData: animation.export()
        });
      });
    }

  },

  ready() {
    const currentIndex = this.data.currentTabIndex;
    const query = wx.createSelectorQuery().in(this);
    query.select('.nav-bar').boundingClientRect();
    query.selectAll('.nav-bar-item').boundingClientRect();
    query.exec(res => {
      const tabBarHeight = res[0].height;
      const height = wx.getSystemInfoSync().windowHeight - tabBarHeight;
      this.setData({
        tabBarHeight,
        windowHeight: height,
        swiperHeight: 190 * 10,
        contenListMarginTop: tabBarHeight + 10,
        marginLeft: res[1][currentIndex].left,
        lockIndex: currentIndex
      });
      this.animationFn();
      setTimeout(() => {
        this.setData({
          backgroundColor: '#FF5344'
        });
      }, _duration);
    });
  }

});