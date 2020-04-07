<template>
  <no-ssr>
    <div class="v-header" :class="{ withBgc: show, spread: spread }">
      <div class="header-t flex flex-jcsb flex-ver">
        <!-- 左边 -->
        <h1 class="logo-box">
          <nuxt-link v-show="!spread" to="/" class="logo" :style="'background-image: url(' + webInfo.website_logo_ph + ')!important;'">{{ webInfo.website_name }}</nuxt-link>
        </h1>
        <!-- 右边 -->
        <div class="flex">
          <div v-show="!spread" @click="searchToggle" class="icon-search"></div>
          <div @click="navToggle" class="icon-fold"></div>
        </div>
      </div>
      <div class="header-b">
        <!-- 导航栏页面 -->
        <div v-show="!isSearch" class="screen01 flex flex-col">
          <ul class="nav-menu flex-1">
            <template v-for="(item, index) in navList">
              <!-- 无子级菜单 -->
              <li v-if="item.children && item.children.length <= 0" class="nav-item" :class="{ active: index == currentIndex }">
                <div class="nav-item-outer flex flex-jcsb flex-ver">
                  <p @click="jumpTarget(index, -1, item.type * 1, item.value, item.open * 1)">{{ item.name }}</p>
                </div>
              </li>
              <!-- 有子级菜单 -->
              <li v-else class="nav-item" :class="{ active: item.show || index == currentIndex }" @click="menuToggle(index)">
                <div class="nav-item-outer flex flex-jcsb flex-ver">
                  <p>{{ item.name }}</p>
                </div>
                <dl @click.stop="" v-show="item.show || index == currentIndex" class="nav-item-inner sub-nav-menu">
                  <dd
                    @click="jumpTarget(index, subIndex, subItem.type * 1, subItem.value, subItem.open * 1)"
                    v-for="(subItem, subIndex) in item.children"
                    class="sub-nav-item flex flex-ver"
                    :class="{ active: index == currentIndex && subIndex == currentSubIndex }"
                  >
                    {{ subItem.name }}
                  </dd>
                </dl>
              </li>
            </template>
          </ul>
          <!-- 微信 -->
          <div class="info-box">
            <img v-show="showQrcode" class="qrcode" :src="webInfo.qrcode_ph" alt="" />
            <button @click="showQrcode = !showQrcode" class="info-wechat">
              <img class="icon" src="@/assets/images/wap/index/wechat.png" alt="" />
              官方微信
            </button>
            <p class="info-copyright">
              <span v-html="webInfo.website_copyright"></span>
              <br />
              <a href="http://www.beian.miit.gov.cn" target="_blank">{{ webInfo.website_icp_numb }}</a>
            </p>
          </div>
        </div>
        <!-- 搜索页面 -->
        <div v-show="isSearch" class="screen02 search-box flex flex-col">
          <!-- 搜索页面>>搜索头部 -->
          <div class="search-hd">
            <div class="search-hd-top">
              <input @blur="$inputBlur" maxlength="12" @keyup.enter="searchHandle" v-model="searchWord" class="enter-input flex-1" placeholder="请输入搜索内容" type="text" />
              <div @click="searchHandle" class="enter-btn flex flex-ver">
                <img class="search-icon" src="@/assets/images/side/search.png" alt="" />
                <span class="enter-txt">搜索</span>
              </div>
            </div>
            <div class="search-hd-bottom">
              <p v-if="list.length > 0">
                为您找到相关结果
                <span class="count">{{ total }}</span>
                个
              </p>
              <p v-else-if="keyword != '' && list.length <= 0">抱歉，没有找到关于“{{ keyword }}”的相关结果!</p>
            </div>
          </div>
          <!-- 搜索页面>>搜索结果 -->
          <ul class="search-bd search-list flex-1">
            <nuxt-link :to="'/newsDetail/' + item.id" tag="li" v-for="(item, index) in list" :key="item.id" class="list-item flex">
              <div class="item-img-box"><img class="item-img" :src="item.img" alt="" /></div>
              <div class="item-info">
                <h3 class="item-tit">{{ item.name }}</h3>
                <p class="item-txt">{{ item.summary }}</p>
                <p class="item-date">{{ item.time | dateformat('YYYY.MM.DD') }}</p>
              </div>
            </nuxt-link>
            <button @click="loadMore" v-show="!isEnding && total_page != 0" class="loadmore-btn">加载更多</button>
            <p v-show="isEnding && total_page != 0" class="nomore-tip">加载完毕</p>
          </ul>
        </div>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import URL from '~/plugins/url';
export default {
  props: {
    change: {
      type: Boolean,
      default: false
    },
    // 带背景颜色
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    webInfo() {
      return this.$store.state.webInfo;
    }
  },
  created() {
    let that = this;
    this.keyword = this.$route.query.keyword || '';
    this.$axios
      .get(URL.getNavList, {
        params: {
          client: 2
        }
      })
      .then(res => {
        this.navList = res.data.header;
        this.navList.forEach((item, index) => {
          if (item.children.length > 0) {
            this.$set(this.navList[index], 'show', false);
          }
        });
      });
    if (process.client) {
      // this.spread = sessionStorage.getItem('isActived') || false;
      this.currentIndex = sessionStorage.getItem('currentIndex') || -1;
      this.currentSubIndex = sessionStorage.getItem('currentSubIndex') || -1;
    }
  },
  data() {
    return {
      currentIndex: -1,
      currentSubIndex: -1,
      // 导航菜单是否展开
      spread: false,
      // 展开搜索页
      isSearch: false,
      // 显示官方微信二维码
      showQrcode: false,
      // 导航栏
      navList: [],
      /* 搜索data*/
      // 输入框的搜索关键字
      searchWord: '',
      // url的搜索关键字
      keyword: '',
      limit: 6,
      current_page: 1,
      total_page: 0,
      total: 0,
      list: [],
      isEnding: true
    };
  },
  methods: {
    // 页面跳转
    jumpTarget(index, subIndex, type, value, open) {
      console.log(index, subIndex, type, value, open);
      sessionStorage.setItem('currentIndex', index);
      sessionStorage.setItem('currentSubIndex', subIndex);
      // sessionStorage.setItem('isActived', true);
      this.navList[index].show = true;
      this.currentIndex = index;
      this.currentSubIndex = subIndex;
      switch (type) {
        // case 0: //不跳转
        //   console.log('不跳转');
        //   break;
        case 1: //首页或栏目
          switch (value * 1) {
            case 0: //首页
              switch (open) {
                case 0: //新页面打开
                  window.open(this.webInfo.website_domain);
                  break;
                case 1: //原页面打开
                  this.$router.push({
                    path: '/'
                  });
                  break;
              }
              break;
            default:
              //栏目
              switch (open) {
                case 0: //新页面打开
                  window.open('/wap/news/' + value);
                  break;
                case 1: //原页面打开
                  this.$router.push({
                    path: '/news/' + value
                  });
                  break;
              }
              break;
          }
          break;
        case 2: //自定义页面
          switch (open) {
            case 0: //新页面打开
              window.open(value);
              break;
            case 1: //原页面打开
              this.$router.push({
                path: '/' + value
              });
              break;
          }
          break;
        case 3: //文章
          switch (open) {
            case 0: //新页面打开
              window.open('/newsDetail/' + value);
              break;
            case 1: //原页面打开
              this.$router.push({
                path: '/newsDetail/' + value
              });
              break;
          }
          break;
        case 4: //外链
          switch (open) {
            case 0: //新页面打开
              window.open(value);
              break;
            case 1: //原页面打开
              window.location.href = value;
              break;
          }
          break;
      }
    },
    // 子级菜单toggle
    menuToggle(index) {
      this.navList[index].show = !this.navList[index].show;
    },
    // 搜索页面toggle 展示
    searchToggle() {
      this.isSearch = true;
      this.spread = !this.spread;
      // 清空搜索相关data
      this.searchWord = '';
      this.keyword = '';
      this.limit = 6;
      this.current_page = 1;
      this.total_page = 0;
      this.total = 0;
      this.list = [];
      this.isEnding = true;
      let query = JSON.parse(JSON.stringify(this.$route.query));
      delete query.keyword;
      this.$router.push({
        query: query
      });
    },
    // 导航菜单toggle
    navToggle() {
      this.isSearch = false;
      this.spread = !this.spread;
    },
    // 搜索
    searchHandle() {
      if (this.$nullTest(this.searchWord)) {
        return this.$errorToast('请输入搜索关键字');
      }
      this.keyword = this.searchWord;
      this.$router.push({
        query: {
          keyword: this.searchWord
        }
      });
      this.$axios
        .get(URL.getArticleSearch, {
          params: {
            keyword: this.searchWord,
            page: 1,
            rownum: this.limit,
            client: 2
          }
        })
        .then(res => {
          let pagination = res.data.pagination;
          this.list = res.data.list;
          this.total_page = pagination.total_page;
          this.current_page = pagination.current;
          this.limit = pagination.rownum;
          this.total = pagination.total;
          this.isEnding = pagination.total_page == pagination.current ? true : false;
        });
    },
    // 加载更多
    loadMore() {
      this.$axios
        .get(URL.getArticleSearch, {
          params: {
            keyword: this.searchWord,
            page: ++this.current_page,
            rownum: this.limit,
            client: 2
          }
        })
        .then(res => {
          let pagination = res.data.pagination;
          this.list = this.list.concat(res.data.list);
          this.total_page = pagination.total_page;
          this.current_page = pagination.current;
          this.limit = pagination.rownum;
          this.total = pagination.total;
          this.isEnding = pagination.total_page == pagination.current ? true : false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@color: #2c5432; // 主色调
.v-header {
  width: 100%;
  height: 4.3rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: @color;
  &.spread {
    .header-t {
      padding-right: 2.2rem;
    }
    .header-b {
      transform: translateY(0%);
    }
    .icon-fold {
      background-image: url(../assets/images/wap/index/close.png) !important;
    }
  }
}

.header-t {
  padding-left: 1.2rem;
  padding-right: 1.4rem;
  height: 100%;
  position: relative;
  z-index: 2;
}

.logo {
  display: block;
  width: 2.8rem;
  height: 2.8rem;
  text-indent: -999px;
  overflow: hidden;
  background: url(../assets/images/wap/index/LOGO.png) center center/contain no-repeat;
}

.icon-search {
  width: 2rem;
  height: 2rem;
  margin-right: 1.2rem;
  background: url(../assets/images/wap/index/search.png) center center/contain no-repeat;
}

.icon-fold {
  width: 2rem;
  height: 2rem;
  background: url(../assets/images/wap/index/menu.png) center center/contain no-repeat;
}
.header-b {
  padding: 6.3rem 2.2rem 0rem;
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  background: rgba(238, 238, 238, 1);
  transform: translateY(-100%);
  transition: transform 0.5s;
  overflow: hidden;
  .screen01 {
    height: 100%;
    padding-bottom: 4.5rem;
  }
  .screen02 {
  }
}
// 菜单
.nav-menu {
  padding-top: 0.4rem;
  width: 100%;
  margin-bottom: 2rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 0 !important;
  }

  .nav-item {
    border-top: 1px solid #eaeff6;
    font-size: 1.6rem;
    &.active {
      .nav-item-outer {
        p {
          padding-bottom: 1.8rem;
          border-bottom: 1px solid @color;
        }
      }
    }
    &:last-child {
      border-bottom: 1px solid #eaeff6;
    }

    .nav-item-outer {
      padding: 1.3rem 0;
      line-height: 1;
      color: @color;
      font-weight: 700;
      p {
        letter-spacing: 0.1rem;
      }
    }
  }

  .nav-item-icon {
    width: 1.2rem;
    transition: all 0.2s;
  }

  .sub-nav-menu {
    padding: 0rem 0 1.5rem;
    transition: all 1.5s;
  }

  .sub-nav-item {
    line-height: 1;
    letter-spacing: 0.1rem;
    font-size: 1.3rem;
    color: rgba(153, 153, 153, 1);
    padding: 0.95rem 0;
    &:first-child {
      padding-top: 0.5rem;
    }
    &.active {
      color: @color;
    }
  }
}
.info-box {
  width: 100%;
  text-align: center;
  position: relative;
  .qrcode {
    width: 10rem;
    top: -12rem;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    position: absolute;
  }
  .info-wechat {
    height: 4rem;
    width: 16.7rem;
    font-size: 1.6rem;
    color: @color;
    border: 1px solid @color;
    background-color: transparent;
    .icon {
      width: 2.3rem;
    }
  }
  .info-copyright {
    padding-top: 3rem;
    font-size: 1.2rem;
    font-family: PingFang SC;
    color: rgba(153, 153, 153, 1);
    line-height: 1.6rem;
    a {
      font-size: 1.2rem;
      font-family: PingFang SC;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>
