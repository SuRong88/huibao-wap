<template>
  <no-ssr>
    <div class="v-header" :class="{ withBgc: show, spread: spread }">
      <div class="header-t flex flex-jcsb flex-ver">
        <!-- 左边 -->
        <h1 class="logo-box">
          <!-- :style="'background-image: url(' + webInfo.website_logo_ph + ')!important;'" -->
          <nuxt-link v-show="!spread" to="/" class="logo">{{ webInfo.website_name }}</nuxt-link>
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
              <li v-if="item.children && item.children.length == 0" class="nav-item">
                <div class="nav-item-outer flex flex-jcsb flex-ver">
                  <p @click="jumpTarget(item.value, item.type, item.open)">{{ item.name }}</p>
                </div>
              </li>
              <!-- 有子级菜单 -->
              <li v-else class="nav-item" :class="{ show: item.show }" @click="menuToggle(index)">
                <div class="nav-item-outer flex flex-jcsb flex-ver">
                  <p>{{ item.name }}</p>
                </div>
                <dl v-show="item.show" class="nav-item-inner sub-nav-menu">
                  <dd @click="jumpTarget(subItem.value, item.type, item.open)" v-for="(subItem, subIndex) in item.children" class="sub-nav-item flex flex-ver">
                    {{ subItem.name }}
                  </dd>
                </dl>
              </li>
            </template>
          </ul>

          <div class="info-box">
            <button class="info-wechat">
              <img class="icon" src="@/assets/images/wap/index/wechat.png" alt="" />
              官方微信
            </button>
            <p class="info-copyright">
              {{ webInfo.website_copyright }}
              <br />
              <a href="http://www.beian.miit.gov.cn" target="_blank">{{ webInfo.website_icp_numb }}</a>
            </p>
          </div>
        </div>
        <!-- 搜索页面 -->
        <div v-show="isSearch" class="screen02 search-box">
          <div class="search-hd">
            <div class="search-hd-top">
              <input class="enter-input flex-1" placeholder="请输入搜索内容" type="text" />
              <div class="enter-btn flex flex-ver">
                <img class="search-icon" src="@/assets/images/side/search.png" alt="" />
                <span class="enter-txt">搜索</span>
              </div>
            </div>
            <div class="search-hd-bottom">
              <p v-if="searchList.length > 0">
                为您找到相关结果
                <span class="count">{{ searchList.length }}</span>
                个
              </p>
              <p v-else>抱歉，没有找到关于“上衣”的相关结果!</p>
            </div>
          </div>
          <ul class="search-bd search-list">
            <li v-for="(item, index) in searchList" :key="item.id" class="list-item flex">
              <div class="item-img-box"><img class="item-img" :src="item.coverUrl" alt="" /></div>
              <div class="item-info">
                <h3 class="item-tit">{{ item.tit }}</h3>
                <p class="item-txt">{{ item.txt }}</p>
                <p class="item-date">{{ item.date | dateformat('YYYY.MM.DD') }}</p>
              </div>
            </li>
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
    this.$axios
      .$get(URL.getNavList, {
        params: {
          client: 2
        }
      })
      .then(res => {
        this.navList = res.data.header;
        this.navList.forEach((item, index) => {
          if (item.children.length > 0) {
            // this.$set(item, 'show', false);可以
            this.$set(this.navList[index], 'show', false);
          }
        });
      });
  },
  data() {
    return {
      // 导航菜单是否展开
      spread: true,
      // 展开搜索页
      isSearch: true,
      // 导航栏
      navList: [],
      // 搜索结果
      searchList: [
        {
          id: 1,
          tit: '专注芦荟二十年，荟宝专注芦荟二十年，荟宝为…',
          txt: '芦荟护肤的概念早已深入人芦荟护肤的概念早已深入人心',
          date: '2018-01-02 15:01:02',
          coverUrl: require('@/assets/images/wap/index/1.jpg')
        },
        {
          id: 2,
          tit: '专注芦荟二十年，荟宝专注芦荟二十年，荟宝为…',
          txt: '芦荟护肤的概念早已深入人芦荟护肤的概念早已深入人心',
          date: '2018-01-02 15:01:02',
          coverUrl: require('@/assets/images/wap/index/2.jpg')
        },
        {
          id: 3,
          tit: '专注芦荟二十年，荟宝专注芦荟二十年，荟宝为…',
          txt: '芦荟护肤的概念早已深入人芦荟护肤的概念早已深入人心',
          date: '2018-01-02 15:01:02',
          coverUrl: require('@/assets/images/wap/index/3.jpg')
        },
        {
          id: 4,
          tit: '专注芦荟二十年，荟宝专注芦荟二十年，荟宝为…',
          txt: '芦荟护肤的概念早已深入人芦荟护肤的概念早已深入人心',
          date: '2018-01-02 15:01:02',
          coverUrl: require('@/assets/images/wap/index/4.jpg')
        },
        {
          id: 5,
          tit: '专注芦荟二十年，荟宝专注芦荟二十年，荟宝为…',
          txt: '芦荟护肤的概念早已深入人芦荟护肤的概念早已深入人心',
          date: '2018-01-02 15:01:02',
          coverUrl: require('@/assets/images/wap/index/5.jpg')
        }
      ]
    };
  },
  methods: {
    // 页面跳转
    jumpTarget(link, type, open) {
      this.spread = false;
      switch (type * 1) {
        // 外链
        case 4:
          if (open * 1 == 1) {
            //原页面打开
            window.location.href = link;
          } else {
            //新页面打开
            window.open(link);
          }
          break;
        // 1：首页或栏目；2：自定义页面；3：文章；
        default:
          if (open * 1 == 1) {
            this.$router.push({
              path: link
            });
          } else {
            // window.open(link);
            window.open('/wap' + link);
          }
      }
    },
    // 子级菜单toggle
    menuToggle(index) {
      this.navList[index].show = !this.navList[index].show;
    },
    // 搜索toggle
    searchToggle() {
      this.isSearch = true;
      this.spread = !this.spread;
    },
    // 导航菜单toggle
    navToggle() {
      this.isSearch = false;
      this.spread = !this.spread;
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
  z-index: 9999;
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
  // background-color: rgba(0,0,0,0.3);
}

.logo {
  display: block;
  width: 2.8rem;
  height: 2.8rem;
  text-indent: -999px;
  overflow: hidden;
  background: url(../assets/images/wap/index/LOGO.png) center center/contain no-repeat !important;
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
  // height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0 !important;
  }

  .nav-item {
    border-top: 1px solid #eaeff6;
    font-size: 1.6rem;
    &.show {
      .nav-item-icon {
        transform: rotate(180deg);
      }
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
      // height: 4.2rem;
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
  }
}
.info-box {
  width: 100%;
  text-align: center;
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
