window.onload=function(){


    /*曝光数*/
    var sum=0;/*初始化曝光数*/
    var allsum;/*当前的曝光数*/
    var i=0;/*每秒的增长量*/
    var data= new Date();/*时间对象*/
    var time=data.getHours();/*小时*/
    var minu= data.getMinutes();/*分钟*/
    var sec=data.getSeconds();/*秒*/
    var times=(time*3600)+(minu*60)+sec;/*当前时间的总秒数**/
    if(times>=0&&times<=32400){/*时间段的总秒数：32400*/
        /* 0:00-9:00  100000000*/
        i=3086;
        allsum=times*i;
        sum=allsum
    }else if(times>=32400&&times<=43200){/*时间段的总秒数：10800*/
        /* 9:00-12:00  200000000*/
        i=18518;
        allsum=sum+(32400*3086)+((times-32400)*i)
        sum=allsum
    }else if(times>=43200&&times<=61200){/*时间段的总秒数：18000*/
        /* 12:00-17:00 200000000*/
        i=18518;
        allsum=sum+(32400*3086)+ (10800*18518)+((times-43200)*i)
        sum=allsum
    }else if(times>=61200&&times<=75600){/*时间段的总秒数：14400*/
        /* 17:00-21:00 100000000*/
        i=3086;
        allsum=sum+(32400*3086)+ (10800*18518)+(18000*18518)+((times-61200)*i)
        sum=allsum

    }else if(times>=75600&&times<=86400){/*时间段的总秒数：10800*/
        /* 21:00-24:00 100000000*/
        i=3086;
        allsum=sum+(32400*3086)+ (10800*18518)+(18000*18518)+(14400*3086)+((times-75600)*i)
        sum=allsum
    }
    $(function() {
        Time=setInterval(function(){
            show_num1(sum,i)
        },1500);
    });
    function show_num1(n,i) {
        sum=sum+i
        var it = $(".t_num1 i");
        var len = String(n).length;
        var yi=len-9;
        for(var i = 0; i < len; i++) {
            if(it.length <= i) {

                $(".t_num1").append("<i></i>");
            }
            var num = String(n).charAt(i);
            //根据数字图片的高度设置相应的值
            var y = -parseInt(num) * 54;
            var obj = $(".t_num1 i").eq(i);
            obj.stop().animate({
                backgroundPosition: '(0 ' + String(y) + 'px)'
            }, 'slow', 'swing', function() {},2000);
        }
        $(".t_num1 span").remove()
        if(yi>=0){
            $(".t_num1 i").eq(yi).after("<span>亿</span>")
        }
        $(".t_num1 i").eq(len-1).after("<span>次</span>")
        $("#cur_num").val(n);
    }

}



/*获取数据*/
$.ajax({
    type:"get",
    url:"http://dt.wayboo.net.cn/websitecontroller/officewebsite.action",
    async:false,
    dataType: "jsonp",
    success:function(str){
        data=str
        MinCarousel()
    }
});
/***/


/*数据滚动**/
var MinCarousel=function(){
    var str=data.jsonp.supplier;
    var Ulist='';
    for (var i in str) {
        Ulist+="<li><p>"+data.jsonp.purchaser[i]+"</p><p>"+str[i]+"</p></li>"
    }
    $("#bottomRight_lun>ul").html(Ulist)
    var me=data.jsonp.companychannel;
    var kehu=data.jsonp.signingInformation;
    var List=''
    for (var i in me) {
        List+="<li><p>"+me[i]+"</p><p>"+kehu[i]+"</p></li>"
    }
    $(".mapbox_listBox>ul").html(List)


}
$(function(){
    $('#bottomRight_lun').myScroll({
        speed:60, //数值越大，速度越慢
        rowHeight:40 //li的高度
    });
    $('.mapbox_listBox').myScroll({
        speed:40, //数值越大，速度越慢
        rowHeight:59 //li的高度
    });

})



/*地图*/


function getEcharts(){
    require.config({
        paths: {
            echarts: './js'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/map'
        ],
        function (ec) {
            var myChart2 = ec.init(document.getElementById('map'));
            myChart2.setOption({
                tooltip : {
                    trigger: 'item',
                    /*设置弹出框*/
                    formatter: function (params,ticket,callback){
                        var $pna = params.name;
                        var res = '';
                        for(var i = 0;i<$imgs.length;i++){
                            if($imgs[i].area == $pna){
                                /*设置弹出的内容**/
                                res="<div class=\"maptxt\"><div style=\"width:auto;font-weight: bold;height:auto;\"><p>" + $imgs[i].nameOne + "</p><p>" + $imgs[i].nameTow + "</p></div></div>";
                                break;
                            }else{
                                res=$pna
                            }
                        }
                        return res;
                    },
                    axisPointer:{
                    },
                    textStyle: {
                        color:"#000"/***/
                    },
                    backgroundColor: 'rgba(0,0,0,0)',/**提示框颜色*/
                },
                series : [
                    {
                        type: 'map',
                        roam: true,/*是否可拖拽*/
                        hoverable: false,
                        mapType: 'china',
                        itemStyle:{
                            normal:{
                                borderColor:"rgba(0,0,0,.2)",/**线条颜色*/
                                borderWidth:1,/**线条宽*/
                                areaStyle:{
                                    color: 'rgba(255,255,255,0.1)',/**地图颜色*/
                                }
                            },
                            emphasis:{
                                areaStyle:{
                                    color: '#FCF9F4',/**鼠标移入地图颜色*/
                                }
                            }
                        },
                        data:[],
                        geoCoord:arrmap,
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 15 + v/10
                            },
                            itemStyle:{
                                normal:{
                                    color:"rgba(14,145,252,0.4)",/**圆圈颜色*/
                                },
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            data : mapName
                        }
                    },
                    {
                        type: 'map',
                        mapType: 'china',
                        data:[],
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 0.1
                            },
                            effect : {
                                show: false,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:true,
                                        position:'top',
                                        textStyle: {
                                            fontSize: 14,/*字体大小**/
                                            color:"#000",/*字体颜色**/
                                            borderColor:"#000",
                                        },
                                        formatter:function(params){
                                            return params.name
                                        }
                                    }
                                },
                                emphasis: {
                                    label:{show:false}
                                }
                            },
                            data :mapName
                        }
                    }
                ]
            });

        });

}

//地图
$('#document').ready(function(){
    getEcharts();
});
var $imgs =
    [
        {
            area: '北京',
            nameOne:"北京信融一分:<br/>北京市朝阳区十里堡恒泰大厦B座1109室",
            nameTow:"北京信融二分:<br/>北京市丰台区马家堡西路时代风帆大厦二区609室"
        },
        {
            area: '上海',
            nameOne:"上海信融:<br/>上海市普陀中山北路2790号杰地大厦303室",
            nameTow:''
        },
        {
            area: '哈尔滨',
            nameOne:"哈尔滨信融:<br/>哈尔滨市南岗区西直大街118号哈特大厦1001室",
            nameTow:''
        },
        {
            area: '长春',
            nameOne:"长春信融:<br/>长春市朝阳区西安大路安华大厦2006室",
            nameTow:''
        },
        {
            area: '沈阳',
            nameOne:"沈阳信融:<br/>沈阳市沈河区奉天街333号恒运商务大厦1010室",
            nameTow:"沈阳信恒融:<br/>沈阳市和平区和平北大街156号光大大厦1811室",
        },
        {
            area: '大连',
            nameOne:"大连信融:<br/>大连市中山区民康街15号报业大厦20E室",
            nameTow:''
        },
        {
            area: '天津',
            nameOne:"天津信融:<br/>天津市河西区大沽南路与围堤道交口国华大厦2207室",
            nameTow:''
        },
        {
            area: '石家庄',
            nameOne:"石家庄信融:<br/>石家庄市长安区建设北大街燕华大厦706室",
            nameTow:''
        },
        {
            area: '保定',
            nameOne:"保定信融:<br/>保定市复兴中路3108号康泰国际1-2306室",
            nameTow:''
        },
        {
            area: '沧州',
            nameOne:"沧州信融:<br/>沧州市运河区人防大厦7楼707室",
            nameTow:''
        },
        {
            area: '邯郸',
            nameOne:"邯郸信融:<br/>邯郸市邯山区和平路396号同仁花园财富大厦6-B2室",
            nameTow:''
        },
        {
            area: '唐山',
            nameOne:"唐山信融:<br/>唐山市高新技术开发区东方大厦C座801室",
            nameTow:''
        },
        {
            area: '济南',
            nameOne:"济南信融:<br/>济南市历城区华信路15号凯贝特大厦C座617室",
            nameTow:''
        },
        {
            area: '烟台',
            nameOne:"烟台信融一分:<br/>烟台市芝罘区海港路十号润隆大厦12楼F座",
            nameTow:"烟台信融二分:<br/>烟台市芝罘区海港路十号润隆大厦18楼1803室",
        },
        {
            area: '郑州',
            nameOne:"郑州信融:<br/>郑州市二七区福寿街正弘凯宾城2号楼1117号",
            nameTow:''
        },
        {
            area: '南京',
            nameOne:"南京信融:<br/>南京市秦淮区太平南路2号日月大厦19楼AB座",
            nameTow:''
        },
        {
            area: '苏州',
            nameOne:"苏州一分:<br/>苏州市工业园区苏惠路环球188A座708室 ",
            nameTow:'苏州二分:<br/>苏州市人民路3188号万达广场B座908室 '
        },
        {
            area: '无锡',
            nameOne:"无锡信融:<br/>无锡市梁溪区人民中路220号财富大厦1006室",
            nameTow:''
        },
        {
            area: '南通',
            nameOne:"南通信融:<br/>南通市港闸区江海大道817号江海财富大厦B座602室",
            nameTow:''
        },
        {
            area: '西安',
            nameOne:"西安一分:<br/>西安市莲湖区北大街35号名流天地大厦701室",
            nameTow:'西安二分:<br/>陕西省西安市碑林区永宁国际大话南门壹中心1710室'
        },
        {
            area: '重庆',
            nameOne:"重庆信融:<br/>重庆市渝中区大坪正街118号嘉华鑫城A栋13-3室",
            nameTow:''
        },
        {
            area: '成都',
            nameOne:"成都信融:<br/>成都市金牛区万达甲级写字楼a座3505室",
            nameTow:''
        },
        {
            area: '昆明',
            nameOne:"昆明信融:<br/>昆明市官渡区星耀路99号星都国际总部基地B座611室",
            nameTow:''
        },
        {
            area: '厦门',
            nameOne:"厦门信融:<br/>福建省厦门市集美区杏林运营中心2号楼1305室",
            nameTow:''
        },
        {
            area: '青岛',
            nameOne:"青岛信融:<br/>青岛市南区香港中路36号招银大厦806",
            nameTow:''
        },
        {
            area: '长沙',
            nameOne:"长沙信融:<br/>长沙市天心区雀园路创谷广告产业园A1栋806-813",
            nameTow:''
        },
    ]
var mapName=[
    {name: '北京'},
    {name: '上海'},
    {name: '长春'},
    {name: '沈阳'},
    {name: '大连'},
    {name: '天津'},
    {name: '保定'},
    {name: '沧州'},
    {name: '邯郸'},
    {name: '唐山'},
    {name: '济南'},
    {name: '烟台'},
    {name: '郑州'},
    {name: '南京'},
    {name: '苏州'},
    {name: '无锡'},
    {name: '南通'},
    {name: '西安'},
    {name: '重庆'},
    {name: '成都'},
    {name: '昆明'},
    {name: '厦门'},
    {name: '石家庄'},
    {name: '哈尔滨'},
]
/**数字滚动*/
var z=true
$(function(){
    var mainOffsetTop = $(".about_list").offset().top;
    var mainHeight = $(".about_list").height();
    var winHeight = $(window).height();
    $(window).scroll(function(){
        if(z==true){
            var winScrollTop = $(window).scrollTop();
            if(winScrollTop > mainOffsetTop + mainHeight || winScrollTop <　mainOffsetTop - winHeight){
            }else{
                z=false
                var num1 = 30
                var num2 = 200000
                var num3 = 1000
                var xr_1=$('#xr_1')
                var xr_2=$('#xr_2')
                var xr_3=$('#xr_3')
                countUp(xr_1, num1, 0, 1000,0);
                countUp(xr_2, num2, 0, 1000,0);
                countUp(xr_3, num3, 0, 1000,0);
                return false
            }
        }
    })
});




function countUp(elem, endVal, startVal, duration, decimal) {
    var startTime = 0;
    var dec = Math.pow(10, decimal);
    var progress,value;
    function startCount(timestamp) {
        startTime = !startTime ? timestamp : startTime;
        progress = timestamp - startTime;
        value = startVal + (endVal - startVal) * (progress / duration);
        value = (value > endVal) ? endVal : value;
        value = Math.floor(value*dec) / dec;
        elem.html(value.toFixed(decimal))
        progress < duration && requestAnimationFrame(startCount)
    }
    requestAnimationFrame(startCount)
}


/**滑动的菜单**/
var iSpeed=0;
var left=0;
function startMove(obj, iTarget)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        iSpeed+=(iTarget-obj.offsetLeft)/5;
        iSpeed*=0.7;
        left+=iSpeed;
        if(Math.abs(iSpeed)<1 && Math.abs(left-iTarget)<1)
        {
            clearInterval(obj.timer);
            obj.style.left=iTarget+'px';
        }
        else
        {
            obj.style.left=left+'px';
        }
    }, 30);
}





//  鼠标悬浮 解决方案 40px
$(function () {
    // if($(document.body).width()>768){
    //     $('.solve .lists div').mouseenter(function () {
    //         $(this).find('.hide_text').css('display','block');
    //
    //     })
    //         .mouseleave(function () {
    //             $(this).find('.hide_text').css('display','none');
    //         });
    //     $('.solve .lists .cases1').mouseenter(function () {
    //         $(this).css("backgroundImage","url(images/hide_d_03.png)");
    //     })
    //         .mouseleave(function () {
    //             $(this).css("backgroundImage","url(images/solution_06.png)");
    //         })
    //     $('.solve .lists .cases2').mouseenter(function () {
    //         $(this).css("backgroundImage","url(images/hide_d_03.png)");
    //     })
    //         .mouseleave(function () {
    //             $(this).css("backgroundImage","url(images/search_03.jpg)");
    //         })
    //     $('.solve .lists .cases3').mouseenter(function () {
    //         $(this).css("backgroundImage","url(images/hide_d_03.png)");
    //     })
    //         .mouseleave(function () {
    //             $(this).css("backgroundImage","url(images/weixin_03.png)");
    //         })
    //     $('.solve .lists .cases4').mouseenter(function () {
    //         $(this).css("backgroundImage","url(images/hide_d_03.png)");
    //     })
    //         .mouseleave(function () {
    //             $(this).css("backgroundImage","url(images/build.jpg)");
    //         })
    // }
    if($(document.body).width()>768){
        $('.xr_head li').mouseenter(function () {
            $('.xr_head li').find('span').remove();
            $(this).append('<span></span>');
            $(this).find('.nav_tow').css('display','block');
        })
            .mouseleave(function () {
                $('.xr_head li').find('span').remove();
                $('.xr_head li').eq(0).append('<span></span>');
                $('.xr_head li').eq(5).find('span').remove();
                $(this).find('.nav_tow').css('display','none');
            })
        $('.xr_head li').eq(5).mouseenter(function () {
            $(this).find('span').remove();
            $('.xr_head li').eq(0).append('<span></span>');
        })
    }
    // 移动端导航点击显示隐藏二级分类
    if($(document.body).width()<768){
        $('.logo img').attr('src','images/logo2.png');
        $('.xr_head li').click(function () {
            if($(this).find('.nav_tow').is(':hidden')){//如果当前隐藏
            $('.nav_tow').is(':hidden');//如果当前隐藏
                $(this).find('.nav_tow').show();//那么就显示div
            }else{//否则
                $(this).find('.nav_tow').hide();//就隐藏div
            }
        })
    }
    //点击导航隐藏按钮 变符号
    if($(document.body).width()<768){
        $('button').click(function () {
            if($('.nav').is(':hidden')){
                $(this).find('span').removeClass('icon-bar');
                $(this).find('span:first').addClass('glyphicon glyphicon-remove-circle');
            }else{
                $(this).find('span').addClass('icon-bar');
                $(this).find('span:first').removeClass('glyphicon glyphicon-remove-circle');
            }
        })
    }

    // 回到顶部
    if($(document.body).width()>768){
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
        rolling(".step",300,function(){
            window.scrollReveal = new scrollReveal();
        });
        rolling(".goods",300,function(){
            window.scrollReveal = new scrollReveal();
        });
        rolling(".cases",300,function(){
            window.scrollReveal = new scrollReveal();
        });
    })
    }
// 移动端展开的导航和页面大小一般大
    if($(document.body).width()<768){
        var screenHeight = $(window).height();
        var barHeight = $('.navbar-header').height();
        // console.log(screenHeight);
        $('.navbar-nav').height(screenHeight-barHeight);

        // $('.navbar-nav').css('overflowerY','hidden');
        // console.log($('.navbar-nav').height());
    }




    function rolling(div,offset,fun){
        var a,b,c,d;
        d=$(div).offset().top;
        a=eval(d + offset);
        b=$(window).scrollTop();
        c=$(window).height();
        if(b+c>a){
            fun()
        }
    }



    //特点中鼠标进入小图标整体向上移动40px 切显示隐藏的文案
    $('.point .p1').mouseenter(function () {
        $(this).find('.hide_tedian').stop().fadeIn(3000);

    })
        .mouseleave(function () {
            $(this).find('.hide_tedian').stop().fadeOut(500);
        });
    $('.point .p1').eq(0).mouseenter(function () {
        $('.point .point_imgs img').css('zIndex','-3');
        $('.point .point_imgs .img1').css({
            'zIndex':'-1',
            'opacity':'1',
            'transform':'scale(1.5)'
        });
        // $('.point .point_imgs .img1').animate({
        //     'opcity':'0',
        //     'transform':'scale(1.5)'
        // });
    })
        .mouseleave(function () {
            $('.point .point_imgs .img1').css({
                'opacity':'0',
                'transform':'scale(1)'
            });
            $('.point .point_imgs .img2').css('opacity','1');
        });
    $('.point .p1').eq(1).mouseenter(function () {
        $('.point .point_imgs img').css('zIndex','-3');
        $('.point .point_imgs .img2').css({
            'zIndex':'-1',
            'opacity':'1',
            'transform':'scale(1.5)'
        });
    })
        .mouseleave(function () {
            $('.point .point_imgs .img2').css({
                'opacity':'0',
                'transform':'scale(1)'
            });
            $('.point .point_imgs .img3').css('opacity','1');
        });
    $('.point .p1').eq(2).mouseenter(function () {
        $('.point .point_imgs img').css('zIndex','-3');
        $('.point .point_imgs .img3').css({
            'zIndex':'-1',
            'opacity':'1',
            'transform':'scale(1.5)'
        });
    }).mouseleave(function () {
        $('.point .point_imgs .img3').css({
            'opacity':'0',
            'transform':'scale(1)'
        });
        $('.point .point_imgs .img2').css('opacity','1');
    });
//移动端 手势滑动
    if($(document.body).width()<768){
        /**
         * Created by Administrator on 2017/7/11.
         */
        'use strict';
        $(function () {
            // 获取手指在轮播图元素上的一个滑动方向（左右）

            // 获取界面上轮播图容器
            var $carousels = $('.carousel');
            var startX,endX;
            // 在滑动的一定范围内，才切换图片
            var offset = 50;
            // 注册滑动事件
            $carousels.on('touchstart',function (e) {
                // 手指触摸开始时记录一下手指所在的坐标x
                startX = e.originalEvent.touches[0].clientX;

            });
            $carousels.on('touchmove',function (e) {
                // 目的是：记录手指离开屏幕一瞬间的位置 ，用move事件重复赋值
                endX = e.originalEvent.touches[0].clientX;
            });
            $carousels.on('touchend',function (e) {
                //console.log(endX);
                //结束触摸一瞬间记录手指最后所在坐标x的位置 endX
                //比较endX与startX的大小，并获取每次运动的距离，当距离大于一定值时认为是有方向的变化
                var distance = Math.abs(startX - endX);
                if (distance > offset){
                    //说明有方向的变化
                    //根据获得的方向 判断是上一张还是下一张出现
                    $(this).carousel(startX >endX ? 'next':'prev');
                }
            })
        });
    }
})
