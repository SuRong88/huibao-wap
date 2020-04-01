<template>
  <div class="index-page">
    <v-header></v-header>
    <main class="index-main">
      <div v-if="bannerList.length > 0" class="index-banner" v-swiper:mySwiper1="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-item" v-for="item in bannerList">
            <!-- 1外链 -->
            <a v-if="item.link_type == 1" target="_blank" class="swiper-item-inner" :style="'background-image: url(' + item.img + ');'" :href="item.link" :title="item.name"></a>
            <!-- 2内链 -->
            <nuxt-link v-else class="swiper-item-inner" :style="'background-image: url(' + item.img + ');'" :to="item.link" :title="item.name"></nuxt-link>
          </div>
        </div>
        <div id="swiperP" class="swiper-pagination swiper-pagination-bullets flex flex-ver flex-align-center"></div>
      </div>
    </main>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  components: {
    vHeader: resolve => require(['@/components/vHeader'], resolve)
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
    let [res01, res02] = await Promise.all([
      app.$axios.get(URL.getBannerList, {
        params: {
          client: 2
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 2,
          module_id: '/'
        }
      })
    ]);
    return {
      bannerList: res01.data,
      SEOInfo: res02.data
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
        pagination: {
          el: '#swiperP',
          clickable: true
        }
      },
      bannerList: []
    };
  }
};
</script>

<style lang="less"></style>
