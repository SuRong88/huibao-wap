<template>
  <div class="news-page">
    <v-header></v-header>
    <main class="news-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">荟宝动态</h2>
          <h2 class="tit-en">News</h2>
        </div>
      </div>
      <div class="page-wrapper">
        <ul class="nav-list flex flex-sa">
          <li v-for="(item, index) in typeList" :key="index" @click="navToggle(item.id)" class="nav-item" :class="{ active: type == item.id }">{{ item.name }}</li>
        </ul>
        <ul v-if="list.length > 0" class="news-list">
          <li v-for="(item, index) in list" :key="index" class="news-item">
            <div class="item-img-box"><img class="item-img" :src="item.img" alt="" /></div>
            <div class="item-info">
              <p class="item-other">
                <span class="item-type">{{ item.type }}</span>
                <span class="line">|</span>
                <span class="item-date">{{ item.time | dateformat('YYYY.MM.DD') }}</span>
              </p>
              <p class="item-tit">{{ item.name }}</p>
              <nuxt-link :to="'/newsDetail/' + item.id" class="item-btn flex flex-center">查看详情</nuxt-link>
            </div>
          </li>
        </ul>
        <button v-show="!isLastPage && total_page != 0" @click="viewMore" class="view-more">查看更多</button>
        <p v-show="isLastPage && total_page != 0" class="nomore-tip">加载完毕</p>
      </div>
    </main>
    <v-footer></v-footer>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
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
    // 文章分类id
    let type = params.type == '-1' || !params.type ? -1 : params.type;
    console.log('type' + type);
    let [res01, res02, res03] = await Promise.all([
      app.$axios.get(URL.getArticleType),
      app.$axios.get(URL.getArticleList, {
        params: {
          classify_id: type,
          client: 2,
          page: 1,
          rownum: 6
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'article_list',
          client: 2,
          module_id: type
        }
      })
    ]);
    res01.data.unshift({
      id: 'all',
      name: '全部',
      template: 'article_default'
    });
    let pagination = res02.data.pagination;
    return {
      type: params.type == -1 ? 'all' : params.type,
      typeList: res01.data,
      list: res02.data.list,
      limit: pagination.rownum,
      current_page: pagination.current,
      total_page: pagination.total_page,
      total: pagination.total,
      isLastPage: pagination.current == pagination.total_page,
      SEOInfo: res03.data
    };
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', () => {
      this.$scrollBottom(() => {
        console.log(this.current_page+1);
      });
    });
  },
  data() {
    return {
      SEOInfo: {},
      typeList: [],
      // 类型
      type: 'all',
      limit: 2,
      current_page: 1,
      total_page: 0,
      total: 0,
      list: [],
      isLastPage: false
    };
  },
  methods: {
    // 分类切换
    navToggle(type) {
      this.$router.push({
        params: {
          type: type
        }
      });
    },
    // 查看更多
    viewMore() {
      let that = this;
      let type = this.$route.params.type == '-1' || !this.$route.params.type ? -1 : this.$route.params.type;
      this.$axios
        .get(URL.getArticleList, {
          params: {
            classify_id: type,
            client: 2,
            page: ++that.current_page,
            rownum: 6
          }
        })
        .then(res => {
          let data = res.data;
          let pagination = data.pagination
          that.list = that.list.concat(data.list);
          // 可省略
          that.current_page = pagination.current
          that.total_page = pagination.total_page
          that.total = pagination.total
          // 可省略end
          that.isLastPage = pagination.current == pagination.total_page;
        })
        .catch(err => {
          return this.$errorToast('数据获取失败');
        });
    }
  }
};
</script>

<style lang="less"></style>
