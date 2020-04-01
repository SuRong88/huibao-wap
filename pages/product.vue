<template>
  <div class="product-page">
    <v-header></v-header>
    <main class="product-main page-wrapper">
      <!-- poster一些手机浏览器不支持，而且video高度可能会“压扁” -->
      <video poster="http://www.techviewinfo.com/_nuxt/img/708ded0.jpg" id="video" class="video-box" controls>
        <source src="@/assets/images/wap/product/video.mp4" />
        不支持播放该视频
      </video>
      <div v-for="(item, index) in list" class="product-box">
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
      <!-- 第二套主题 -->
      <div v-if="false" class="product-box product-box2">
        <div class="product-banner">
          <img class="product-banner-img" src="@/assets/images/wap/product/banner2.jpg" alt="" />
          <div class="intro-box">
            <img class="intro-tag" src="@/assets/images/culture/tag.png" alt="" />
            <p class="intro-tit">双重抗初老能量 逆转时光焕现美</p>
          </div>
          <img class="banner-tag" src="@/assets/images/others/MyAloneGarden.png" alt="" />
        </div>
        <p class="product-txt">
          特别添加200:1的活性芦荟荟宝素，实现1瓶=3株新鲜芦荟，先进的科学提取工艺，充分保留了天然芦荟原有的活性成分，高效补水保湿，让营养更易吸收，好吸收比新鲜芦荟更有效！
        </p>
        <div class="mul-box">
          <ul class="product-list flex flex-wrap">
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/e.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/f.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉眼部精华液</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/g.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/h.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
          </ul>
          <div class="view-more">
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
      app.$axios.get(URL.getIntroduceList),
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
