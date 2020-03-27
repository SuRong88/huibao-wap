<template>
  <div class="detail-page">
    <v-header></v-header>
    <main class="detail-main">
      <div class="main-banner common-banner" :style="'background-image:url(' + testArr[testId - 1].bannerUrl + ');'">
        <div class="banner-title-box">
          <h2 class="tit-cn">{{ testArr[testId - 1].titleCn }}</h2>
          <h2 class="tit-en">{{ testArr[testId - 1].titleEn }}</h2>
        </div>
      </div>
      <div class="page-wrapper edit_textBox">
        <p v-if="testId == 1" class="test">
          <img src="@/assets/images/wap/others/13.jpg" alt="" />
          <img src="@/assets/images/wap/others/14.jpg" alt="" />
          <img src="@/assets/images/wap/others/15.jpg" alt="" />
          <img src="@/assets/images/wap/others/16.jpg" alt="" />
        </p>
        <p v-else class="test" style="padding: 3rem;"><img src="@/assets/images/wap/others/17.jpg" alt="" /></p>
      </div>
    </main>
    <v-footer></v-footer>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  // default模板
  // layout: function(context) {
  //   return 'default-demo';
  // },
  // 参数校验（失败直接跳转至404页面）
  validate({ params, route }) {
    // 必须是number类型
    return /^\d+$/.test(params.id);
  },
  watchQuery: true,
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
    let SEOInfo = null;
    let id = params.id;
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
      SEOInfo: SEOInfo,
      testId: id
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      testId: 0,
      testArr: [
        {
          titleCn: '荟宝优势',
          titleEn: 'Join investment',
          bannerUrl: require('@/assets/images/wap/others/Joininvestment.jpg')
        },
        {
          titleCn: '申请办法',
          titleEn: 'Application procedure',
          bannerUrl: require('@/assets/images/wap/others/Applicationprocedure.jpg')
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less"></style>
