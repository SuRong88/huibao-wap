<template>
  <div class="news-detail-page">
    <v-header></v-header>
    <main class="detail-main">
      <div class="main-banner"></div>
      <div class="page-wrapper">
        <div class="hd">
          <h2 class="tit">{{ articleInfo.name }}</h2>
          <p class="brief">
            <span class="type">{{ articleInfo.type || '暂无分类' }}</span>
            <span class="line">|</span>
            <span class="date">{{ articleInfo.create_time | dateformat('YYYY.MM.DD') }}</span>
          </p>
        </div>
        <div v-html="articleInfo.body" class="bd edit_textBox"></div>
      </div>
    </main>
    <v-footer></v-footer>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
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
  async asyncData({ store, params, route, app }) {
    let [res01, res02] = await Promise.all([
      app.$axios.get(URL.getArticleDetail, {
        params: {
          id: params.id
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'article_info',
          client: 2,
          module_id: params.id
        }
      })
    ]);
    return {
      articleInfo: res01.data,
      SEOInfo: res02.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      articleInfo: null
    };
  }
};
</script>

<style lang="less"></style>
