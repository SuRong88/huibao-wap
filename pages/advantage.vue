<template>
  <div class="advantage-page">
    <v-header></v-header>
    <main class="advantage-main">
      <div class="img-box img-box01"><img class="img" src="@/assets/images/wap/advantage/01.jpg" alt="" /></div>
      <div class="img-box img-box02"><img class="img" src="@/assets/images/wap/advantage/02.jpg" alt="" /></div>
      <div class="img-box img-box03"><img class="img" src="@/assets/images/wap/advantage/03.jpg" alt="" /></div>
      <div class="img-box img-box04"><img class="img" src="@/assets/images/wap/advantage/04.jpg" alt="" /></div>
      <div class="img-box img-box05"><img class="img" src="@/assets/images/wap/advantage/05.jpg" alt="" /></div>
      <div class="img-box img-box06"><img class="img" src="@/assets/images/wap/advantage/06.jpg" alt="" /></div>
      <div class="img-box img-box07"><img class="img" src="@/assets/images/wap/advantage/07.jpg" alt="" /></div>
      <div class="img-box img-box08"><img class="img" src="@/assets/images/wap/advantage/08.jpg" alt="" /></div>
      <div class="img-box img-box09"><img class="img" src="@/assets/images/wap/advantage/09.jpg" alt="" /></div>
      <div class="img-box img-box10">
        <img class="img" src="@/assets/images/wap/advantage/10.jpg" alt="" />
        <!-- 创业者列表 -->
        <div class="inf-list clearfix">
          <div v-for="item in list" class="inf-item fl">
            <div class="item-t"><img class="item-img" :src="item.cover_img" alt="" /></div>
            <div class="item-b">
              <div class="item-tit">{{ item.name }}</div>
              <div class="item-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="img-box img-box11"><img class="img" src="@/assets/images/wap/advantage/11.jpg" alt="" /></div>
      <div class="img-box img-box12">
        <nuxt-link to="/contact" class="link01" href="">
          <img class="link-img" src="@/assets/images/wap/advantage/link01.jpg" alt="" />
        </nuxt-link>
        <img class="img" src="@/assets/images/wap/advantage/link-spe.jpg" alt="" />
        <nuxt-link to="/news/all" class="link02" href="">
          <img class="link-img" src="@/assets/images/wap/advantage/link02.jpg" alt="" />
        </nuxt-link>
        <!-- <img class="img" src="@/assets/images/wap/advantage/12.jpg" alt="" />
        <nuxt-link to="/apply" class="link01" href="">
          <img class="link-img" src="@/assets/images/wap/advantage/join.png" alt="" />
        </nuxt-link>
        <nuxt-link to="/news/all" class="link02" href="">
          <img class="link-img" src="@/assets/images/wap/advantage/hot.png" alt="" />
        </nuxt-link> -->
      </div>
    </main>
    <!-- <main class="detail-main">
      <div class="main-banner common-banner" :style="'background-image:url(' + testArr[testId - 1].bannerUrl + ');'">
        <div class="banner-title-box">
          <h2 class="tit-cn">{{ testArr[testId - 1].titleCn }}</h2>
          <h2 class="tit-en">{{ testArr[testId - 1].titleEn }}</h2>
        </div>
      </div>
      <div v-html="detail" class="page-wrapper edit_textBox">
      </div>
    </main> -->
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
      app.$axios.get(URL.getEntrepreneursList, {
        params: {}
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 2,
          module_id: 'advantage'
        }
      })
    ]);
    console.log(res01.data);
    return {
      list: res01.data.list,
      SEOInfo: res02.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {}
      // detail: null,
      // testId: 1,
      // testArr: [
      //   {
      //     titleCn: '荟宝优势',
      //     titleEn: 'Join investment',
      //     bannerUrl: require('@/assets/images/wap/others/Joininvestment.jpg')
      //   },
      //   {
      //     titleCn: '申请办法',
      //     titleEn: 'Application procedure',
      //     bannerUrl: require('@/assets/images/wap/others/Applicationprocedure.jpg')
      //   }
      // ]
    };
  },
  methods: {}
};
</script>

<style lang="less"></style>
