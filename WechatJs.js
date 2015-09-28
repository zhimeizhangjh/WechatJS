/**
 * Created by zhangjianhua on 15/9/28.
 */
/**
 * Created by zhangjianhua on 15/9/16.
 * wechat js api
 * v1.0.0
 */
function WechatJS(option) {
    var self = this;
    var opt = $.extend({
        weixinJsUrl: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',
        wxConfig: {
            debug: false,
            appId: '',
            timestamp: '',
            nonceStr: '',
            signature: '',
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'getNetworkType',
                'hideOptionMenu',
                'showOptionMenu',
                'chooseWXPay'

            ]
        },
        shareImg: '',
        shareLink: '',
        getShareTitle: function () {
            return "分享标题";
        },
        getShareDescription: function () {
            return "分享描述";
        },
        shareCallback: function () {
        },
        initShare : true //初始化分享配置
    }, option);

    self.init = function () {
        wx.config(opt.wxConfig);
        wx.ready(function () {
            if(opt.initShare){
                initShareContent();
            }
        });

        wx.error(function (res) {
            //alert(JSON.stringify(res));
        });
    };


    //加载文件
    function loadWeixinJs(callback) {
        addScript(opt.weixinJsUrl, callback);
    }

    function addScript(src, onload) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = onload || null;
        head.appendChild(script);
    }

    //初始化分享内容
    function initShareContent() {
        var title = opt.getShareTitle();
        var desc = opt.getShareDescription();
        self.setShareOptions(title, desc);
    }

    //设置分享参数
    self.setShareOptions = function(title, description) {
        var title = title || '范冰冰邀您玩游戏';
        var link = opt.shareLink;
        var imgUrl = opt.shareImg;
        var shareCallback = opt.shareCallback;
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link,
            imgUrl: imgUrl, // 分享图标
            success: shareCallback,
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: description, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: shareCallback,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: description, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: shareCallback,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
}