<template>
  <div class="index-page">
    <v-header></v-header>
    <main class="index-main">
      <div v-if="bannerList.length" class="index-banner" v-swiper:mySwiper1="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-item" v-for="item in bannerList">
            <nuxt-link tag="div" class="swiper-item-inner" :style="'background-image: url(' + item.coverUrl + ');'" :to="'/'" :title="item.title"></nuxt-link>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets flex flex-ver flex-align-center"></div>
      </div>
    </main>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  // default模板
  // layout: function(context) {
  //   return 'default-index';
  // },
  // 参数校验（失败直接跳转至404页面）
  // validate({ params, route }) {
  //   // 必须是number类型
  //   return /^\d+$/.test(params.id);
  // },
  components: {
    vHeader:resolve=>require(['@/components/vHeader'], resolve)
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
  async asyncData({ store, params, route, app }) {
    let SEOInfo = null;
    await app.$axios
      .get(URL.getSEOInfo, {
        params: {
          name: '/'
        }
      })
      .then(res => {
        SEOInfo = res.data;
        console.log('async请求成功');
      })
      .catch(err => {
        console.log(err);
        console.log('async请求失败');
      });
    return {
      SEOInfo: SEOInfo
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      swiperIndex: 0,
      swiperOption: {
        loop: false,
        speed: 800,
        // direction: 'vertical',
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          // dynamicBullets: true
        },
        on: {
          slideChange() {
            // console.log('onSlideChangeEnd', this);
          },
          tap() {
            // console.log('onTap', this);
          }
        }
      },
      bannerList: [
        {
          title: '轮播title1',
          link: '/target01',
          coverUrl: require('@/assets/images/wap/index/banner.jpg')
        },
        {
          title: '轮播title2',
          link: '/target02',
          coverUrl: require('@/assets/images/wap/index/banner.jpg')
        },
        {
          title: '轮播title3',
          link: '/target03',
          coverUrl: require('@/assets/images/wap/index/banner.jpg')
        }
      ]
    };
  }
};
</script>

<style lang="less"></style>
