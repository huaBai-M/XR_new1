// 回到顶部
var headHeight = $('.xr_banner').height();//获取头部的高度
var stepHeight = $('.step').height();//获取流程的高度
var topheight = headHeight + stepHeight; //超过这个距离显示回到顶部
$(window).scroll(function () {
    var scrollTop =$(document).scrollTop();
    if(scrollTop >= headHeight ){
        $('.goTo').css('display','block');
    }else {
        $('.goTo').css('display','none');
    }
    $('.goTo').click(function () {
        $(document).scrollTop('0');//点击设置页面卷曲的距离为0;
    })
})
