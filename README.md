# tab-view
小程序tab-view组件
* @param {Array} navList 格式：[{ name: '', id: 0 }]
* @method swiperChange  tab栏索引切换时触发
* @externalClasses i-class 组件外部引入样式的class
* swiper根据slot名对应插入到组件中：  <view wx:for="{{ navList }}" slot="{{ 'pageViewSlot' + index }}" wx:key="{{ index }}">要插入的内容</view>
