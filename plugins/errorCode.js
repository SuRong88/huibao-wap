import Vue from 'vue'
import URL from './url'

export default ({ app }, inject) => {

    // 状态码管理
    inject('errorCode', function(res){
        this.$loadEnd();
        
        switch(parseInt(res.data.code) || parseInt(res.data.err_code)){
            case 50001:
            case 50002:
            case 50003:
            case 50004:
                localStorage.fullPath = this.$route.fullPath;   // 记录当前链接，登录成功后返回该链接
                if(localStorage.token){
                    this.$errorToast("登录已过期，请重新登录");
                }else{
                    this.$errorToast("请先登录");
                }
                
                setTimeout(() => {
                    this.$router.push({ path: '/login' });  // 路径根据项目实际路径修改
                }, 1000)
                break;
            default:
                this.$errorToast(res.data.msg);
                break;

        }
    })

}





