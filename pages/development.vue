<template>
  <div class="development-page">
    <v-header></v-header>
    <main class="development-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">发展历程</h2>
          <h2 class="tit-en">Development history</h2>
        </div>
      </div>
      <div class="page-wrapper">
        <div class="intro-box">
          <h2 class="intro-tit">公司概况</h2>
          <p class="intro-txt">
            广州澳梓美生物科技有限公司成立于1999年，是一家集 营销运作、加盟连锁为一体的大型化妆品公司，营销网络 已遍布全国。旗下品牌为专注芦荟护肤21年的荟宝品牌，
            化妆品行业杰出芦荟品牌，以及目前全国拥有3200多家 芦荟单品牌店“荟宝·我家的芦荟妆园”加盟店。“荟宝·我 家的芦荟妆园”是一家以芦荟为核心的单品牌店，也是中
            国特色芦荟家庭护理品牌， “ 荟 ”聚世界好芦荟产品，拥 有丰富的芦荟品类结构，有护肤系列、彩妆产品、洗护产 品、婴童、孕妇等家庭护理产品，满足家庭所有人群的需
            求，真正实现一站式购物，快捷方便。
          </p>
          <p v-show="isSpread" class="intro-txt" style="margin-top: 2.2rem;">
            广州澳梓美生物科技有限公司拥有资金实力及国际技术， 在国际开放的大背景之下，不断地钻研和利用科技成果实 现国际品质品牌本土化的发展规划，作为具有国际视野的
            护肤专家，澳梓美一直站在全球学术界对生物体和化妆品 研发的前沿，秉承“高品质、高形象、高服务”的营销理念 ，研制和生产符合市场需求的高品质产品，在2013年澳
            梓美公司荣获广东中小企业促进会颁发的“岭南好企业”奖 项，荟宝品牌多次荣获化妆品行业的“芦荟杰出护肤品牌” ，荟宝·我家的芦荟妆园荣获《中国美妆》、中国百货商
            业协会共同颁发“最佳芦荟专卖店”、“杰出芦荟单品牌店” 奖项等等。
          </p>
          <div class="spread-box" @click="isSpread = !isSpread">
            <img v-show="isSpread" class="spread-icon" src="@/assets/images/wap/culture/close.png" alt="" />
            <img v-show="!isSpread" class="spread-icon" src="@/assets/images/wap/culture/open.png" alt="" />
            <p class="spread-txt">{{ !isSpread ? '展开全部' : '折叠全部' }}</p>
          </div>
          <div class="intro-bg"></div>
        </div>
        <div class="swiper-box01">
          <div class="swiper-box01-inner">
            <!-- swiper -->
            <div v-if="bannerList01.length" class="swiper" v-swiper:mySwiper1="swiperOption01">
              <div class="swiper-wrapper">
                <div class="swiper-slide swiper-item" v-for="item in bannerList01">
                  <div class="item-t"><img class="item-img" :src="item.coverUrl" alt="" /></div>
                  <div class="item-b">
                    <p class="inner-tit">{{ item.tit }}</p>
                    <p class="inner-txt" v-html="item.txt"></p>
                  </div>
                </div>
              </div>
            </div>
            <img class="swiper-border-img" src="@/assets/images/wap/culture/kuang.png" alt="" />
          </div>
          <div id="swiperP01" class="swiper-pagination swiper-pagination-bullets flex flex-ver flex-align-center"></div>
        </div>
        <div class="swiper-box02">
          <div id="swiperP02" class="swiper-pagination swiper-pagination-bullets flex flex-ver"></div>
          <div class="swiper-box02-inner">
            <!-- swiper -->
            <div v-if="bannerList02.length" class="swiper" v-swiper:mySwiper2="swiperOption02">
              <div class="swiper-wrapper">
                <div class="swiper-slide swiper-item" v-for="item in bannerList02">
                  <div class="item-t"><img class="item-img" :src="item.coverUrl" alt="" /></div>
                  <div class="item-b">
                    <div class="item-b-top flex flex-ver">
                      <img class="item-icon" src="@/assets/images/wap/culture/round.jpg" alt="" />
                      <p class="item-date">{{ item.date | dateformat('YYYY.MM') }}</p>
                    </div>
                    <p class="item-b-tit">{{ item.tit }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="swiper-button-prev02" class="swiper-button-prev"></div>
            <div id="swiper-button-next02" class="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </main>
    <v-footer></v-footer>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  components: {
    vHeader: resolve => require(['@/components/vHeader'], resolve),
    vFooter: resolve => require(['@/components/vFooter'], resolve)
  },
  head() {
    return {
      title: this.SEOInfo.seo_title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.SEOInfo.seo_keyword
        },
        {
          hid: 'description',
          name: 'description',
          content: this.SEOInfo.seo_desc
        }
      ]
    };
  },
  async asyncData({ store, params, query, route, app }) {
    let [res01] = await Promise.all([
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 2,
          module_id: 'development'
        }
      })
    ]);
    return {
      SEOInfo: res01.data
    };
  },
  data() {
    let that = this;
    return {
      SEOInfo: {},
      isSpread: false,
      swiperOption01: {
        loop: false,
        speed: 800,
        spaceBetween: 10,
        pagination: {
          el: '#swiperP01'
        },
        on: {
          slideChange() {},
          tap() {}
        }
      },
      swiperOption02: {
        loop: false,
        speed: 800,
        spaceBetween: 10,
        pagination: {
          el: '#swiperP02',
          clickable: true,
          renderBullet: (index, className) => {
            return '<span class="' + className + '">' + this.$formatDate(this.bannerList02[index].date, 'YYYY ~') + '</span>';
          }
        },
        navigation: {
          nextEl: '#swiper-button-next02',
          prevEl: '#swiper-button-prev02'
        }
      },
      //第一个轮播数组
      bannerList01: [
        {
          tit: '公司业务',
          txt: '生产研发、培训教育、营销运作、加盟连锁',
          coverUrl: require('@/assets/images/culture/3yewu.jpg')
        },
        {
          tit: '品牌理念',
          txt: '高品质、高形象、高服务',
          coverUrl: require('@/assets/images/culture/4linan.jpg')
        },
        {
          tit: '核心价值观',
          txt: '直接表达想法 高效相互协作<br>维护契约精神 一起快乐工作',
          coverUrl: require('@/assets/images/culture/5jiazhiguan.jpg')
        }
      ],
      //第二个轮播数组
      bannerList02: [
        {
          tit: '荟宝三大系列108单品亮相全国。',
          date: '2001-12-01 15:01:22',
          coverUrl: require('@/assets/images/culture/6.jpg')
        },
        {
          tit: '荟宝三大系列108单品亮相全国。',
          date: '2002-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/1.jpg')
        },
        {
          tit: '荟宝三大系列108单品亮相全国。',
          date: '2003-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/2.jpg')
        },
        {
          tit: '荟宝三大系列108单品亮相全国。',
          date: '2004-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/3.jpg')
        },
        {
          tit: '荟宝三大系列108单品亮相全国。',
          date: '2005-12-01 15:01:22'
          // coverUrl: require('@/assets/images/others/4.jpg')
        },
        {
          tit: '000荟宝三大系列108单品亮相全国。',
          date: '2006-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/5.jpg')
        },
        {
          tit: '001荟宝三大系列108单品亮相全国。',
          date: '2007-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/2.jpg')
        },
        {
          tit: '002荟宝三大系列108单品亮相全国。',
          date: '2008-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/1.jpg')
        }
      ]
    };
  },
  computed: {}
};
</script>

<style lang="less"></style>
