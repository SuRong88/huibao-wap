import Vue from 'vue'
import moment from 'moment'
import URL from './url'
import { Toast, Indicator, MessageBox } from 'mint-ui';

let loading = null;

export default ({ app }, inject) => {

    // 错误提示
    inject('errorToast', function(msg, duration = 2000){
        if(msg && process.client){
            Toast({
                message: msg,
                duration: duration
            });
        }
    }),

    // 成功提示
    inject('successToast', function(msg, duration = 2000){
        if(msg && process.client){
            Toast({
                message: msg,
                duration: duration
            });
        }
    }),

    // 加载
    // 显示loading
    inject('loadStart', function(text = '加载中'){
        if(process.client){
            Indicator.open({
                text: text,
                spinnerType: 'fading-circle'
            });
        }
    }),

    // 隐藏loading
    inject('loadEnd', function(){
        // if(process.client){
           Indicator.close();
        // }
    }),

    // 弹窗
    inject('wDialog', function(title, msg, showCancel, cancelText, confirmText, cb_yes, cb_no){
        if(process.client){
            MessageBox({
                title: title,
                message: msg,
                showCancelButton: showCancel,
                cancelButtonText: cancelText,
                confirmButtonText: confirmText,
                closeOnClickModal: false
            }).then(function(Promise) {
                if (Promise == "confirm") {
                    cb_yes && cb_yes();
                } else {
                    cb_no && cb_no();
                }
            })
        }
    }),

    // 指定滚动条位置
    inject('wSetScroll', function(left, top){
        window.scrollTo(left,top);
    }),

    // textarea格式转换
    inject('textFormat', function(str){
        if(str){
            return str.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
        }else{
            return '';
        }

    }),

    // 获取富文本编辑器纯文字
    inject('getEditorText', function(html){
        if(!html){
            return "";
        }
        html = html.replace(/(\n)/g, "");
        html = html.replace(/(\t)/g, "");
        html = html.replace(/(\r)/g, "");
        html = html.replace(/<\/?[^>]*>/g, "");
        // html = html.replace(/\s*/g, "");
        return html;

    }),

    // 判断页面是否滚动到底部
    inject('scrollBottom', function(cb){
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        if (scrollTop + windowHeight == scrollHeight) {
            cb && cb();
        }

    }),
    // 格式化日期
    inject('formatDate', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
        return moment(dataStr).format(pattern)
    })
}
