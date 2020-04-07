<template>
  <div class="apply-page detail-page">
    <v-header></v-header>
    <main class="detail-main">
      <div class="main-banner common-banner" :style="'background-image:url(' + testArr[testId - 1].bannerUrl + ');'">
        <div class="banner-title-box">
          <h2 class="tit-cn">{{ testArr[testId - 1].titleCn }}</h2>
          <h2 class="tit-en">{{ testArr[testId - 1].titleEn }}</h2>
        </div>
      </div>
      <div class="page-wrapper edit_textBox" v-html="detail">
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
        app.$axios.get(URL.getCustomArticle, {
          params: {
            sign: 'apply'
          }
        }),
        app.$axios.get(URL.getSEOInfo, {
          params: {
            type: 'custom',
            client: 2,
            module_id: 'apply'
          }
        })
      ]);
      return {
        detail: res01.data.content,
        SEOInfo: res02.data
      };
    },
  created() {},
  data() {
    return {
      SEOInfo: {},
      detail:null,
      testId: 2,
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
