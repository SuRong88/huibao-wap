<template>
  <div class="contact-page">
    <v-header></v-header>
    <main class="contact-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <!-- <h2 class="tit-cn">联系我们</h2>
          <h2 class="tit-en">Contact us</h2> -->
          <h2 class="tit-cn">申请办法</h2>
          <h2 class="tit-en">How to apply</h2>
        </div>
      </div>
      <div class="page-wrapper">
        <div class="contact-enter">
          <h3 class="enter-tit">加盟“我家的荟宝妆园”</h3>
          <div class="enter-list">
            <input maxlength="4" v-model="name" @blur="$inputBlur" @keyup.enter="submitHandle" class="enter-item" placeholder="姓名" type="text" />
            <input maxlength="11" v-model="phone" @blur="$inputBlur" @keyup.enter="submitHandle" class="enter-item" placeholder="手机" type="text" />
            <input maxlength="25" v-model="email" @blur="$inputBlur" @keyup.enter="submitHandle" class="enter-item" placeholder="电子邮箱" type="text" />
            <input v-model="website" @blur="$inputBlur" @keyup.enter="submitHandle" class="enter-item" placeholder="网址" type="text" />
            <textarea v-model="leaveMsg" @blur="$inputBlur" @keyup.enter="submitHandle" class="enter-item enter-item-mul" placeholder="留言" type="text"></textarea>
            <button @click="submitHandle" class="btn-submit">联系我们</button>
          </div>
          <div class="contact-info">
            <a class="info-logo" href=""><img class="logo" :src="webInfo.contact_page_logo" alt="" /></a>
            <p class="tel-txt">总部加盟咨询服务热线：</p>
            <p class="tel">{{ webInfo.customer_service_phone }}</p>
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
          module_id: 'apply'
          // module_id: 'contact'
        }
      })
    ]);
    return {
      SEOInfo: res01.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      name: '',
      phone:'',
      email: '',
      website: '',
      leaveMsg: ''
    };
  },
  methods: {
    submitHandle() {

      if (this.$nullTest(this.name)) {
        return this.$errorToast('请输入名字');
      }
      if (this.$nullTest(this.phone)) {
        return this.$errorToast('请输入手机');
      }
      if (!this.$checkPhone(this.phone)) {
        return this.$errorToast('手机格式有误');
      }
      if (this.$nullTest(this.email)) {
        return this.$errorToast('请输入邮箱');
      }
      if (!this.$checkEmail(this.email)) {
        return this.$errorToast('邮箱格式有误');
      }
      if (this.$nullTest(this.website)) {
        return this.$errorToast('请输入网址');
      }
      if (this.$nullTest(this.leaveMsg)) {
        return this.$errorToast('请填写留言');
      }
      // 提交加盟信息
      this.$axios
        .post(URL.submitJoin, {
          name: this.name,
          phone: this.phone,
          email: this.email,
          website: this.website,
          leave_msg: this.leaveMsg
        })
        .then(res => {
          this.$successToast('提交成功');
          this.name = '';
          this.phone = '';
          this.email = '';
          this.website = '';
          this.leaveMsg = '';
        })
        .catch(err => {
          return this.$errorToast(err.data.msg);
        });
    }
  },
  computed: {
    webInfo() {
      return this.$store.state.webInfo;
    }
  }
};
</script>

<style lang="less"></style>
