<template>
  <div class="product-page">
    <v-header></v-header>
    <main class="product-main page-wrapper">
      <div v-for="(item, index) in list">
        <!-- poster一些手机浏览器不支持，而且video高度可能会“压扁” -->
        <video
          v-if="item.product_video"
          autoplay
          :poster="item.cover_img"
          id="video"
          class="video-box"
          controls
          webkit-playsinline
          playsinline
          x5-playsinline
          x-webkit-airplay="allow"
        >
          <source :src="item.product_video" />
          不支持播放该视频
        </video>
        <div class="product-box">
          <div class="product-banner">
            <img class="product-banner-img" :src="item.bg_img" />
            <div class="intro-box">
              <img class="intro-tag" :src="item.tag_img" alt="" />
              <p class="intro-tit">{{ item.propaganda }}</p>
            </div>
            <img class="banner-tag" src="@/assets/images/others/MyAloneGarden.png" alt="" />
          </div>
          <p class="product-txt">{{ item.profiles }}</p>
          <div class="mul-box">
            <ul class="product-list flex flex-wrap">
              <li v-for="(subItem, subIndex) in item.product_data" class="product-item">
                <img class="item-img" :src="subItem.product_img" alt="" />
                <p class="item-txt">{{ subItem.product_title }}</p>
              </li>
            </ul>
            <a :href="item.link_url" target="_blank" class="view-more">
              <div id="wrap" style="width: 60px;height: 60px;">
                <svg viewBox="0 0 100 100">
                  <path d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0" fill="none" stroke="rgba(210,210,210,1)" stroke-width="2">></path>
                  <path
                    d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
                    fill="none"
                    stroke="#2C5432"
                    stroke-linecap="round"
                    class="my-svg-path"
                    transform="rotate(180,50,50)"
                    stroke-width="4"
                  ></path>
                </svg>
                <p class="txt">查看更多</p>
              </div>
            </a>
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
    let [res01, res02] = await Promise.all([
      app.$axios.get(URL.getIntroduceList, {
        params: {
          type: 2,
          client: 2
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 2,
          module_id: 'product'
        }
      })
    ]);
    return {
      list: res01.data,
      SEOInfo: res02.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      list: []
    };
  },
  computed: {}
};
</script>

<style lang="less"></style>
