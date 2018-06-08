$(function(){
    //鍒ゆ柇1涓埌浜斾釜锛屼釜鏁颁笉鍚屽畾浣嶄笉鍚岋紱鏈€缁�5涓垨鑰呬簲涓互涓婂畾浣嶇粺涓€锛�
    var sum_li=$(".show_s_ui>li").length;//杞挱鍥剧殑鏁伴噺
    $(".show_s_ui>li:nth-child(1)").attr("id","middel_shows");
    $(".show_s_ui>li:nth-child(2)").attr("id","right_shows");
    if(sum_li<=3){
        $(".show_s_ui>li:nth-child(3)").attr("id","left_shows");
    }else if(sum_li>=4){
        $(".show_s_ui>li:nth-child(3)").attr("id","small_right");
    }
    if(sum_li==4){
        $(".show_s_ui>li:last-child").attr("id","left_shows");
    }
    if(sum_li>=5){
        $(".show_s_ui>li:nth-last-child(2)").attr("id","small_left");
    }
    if(sum_li>=5){
        $(".show_s_ui>li:last-child").attr("id","left_shows");
    }
    //鍒ゆ柇鏄惁鎹㈣锛屽鏋滄崲琛屽垯鍚戝墠瀵瑰叾锛涙鍔熻兘锛堜娇鐢ㄥ脊鎬у竷灞€锛変笉鏀寔ie9鍙婁竴涓�,ie9浠ヤ笅閲囩敤娴佸紡甯冨眬
    var mg_top=parseFloat($(".nav_banners>li").css("margin-top"));
    var mg_bottom=parseFloat($(".nav_banners>li").css("margin-bottom"));
    var li_padd_t=parseFloat($(".nav_banners>li").css("padding-top"));
    var li_padd_b=parseFloat($(".nav_banners>li").css("padding-bottom"));
    var li_heights=parseFloat($(".nav_banners>li").height());
    var sum_ul_height=mg_top+mg_bottom+li_padd_t+li_padd_b+li_heights+10;
    var ul_heights=$(".nav_banners").height();
    if(ul_heights>sum_ul_height){
        $(".pre_banner_3d").height($(".contrves").height()+$(".banner_tree").height());
        $(".nav_banners").css("-webkit-box-pack","start").css("-ms-flex-pack","start").css("justify-content","flex-start");
    }
    var middel_width=$("#middel_shows").width();//涓棿鏄剧ず寰楀
    var middel_hright=$("#middel_shows").height();//涓棿鏄剧ず寰楅珮
    var slet_width=$("#right_shows").width();//涓よ竟鏄剧ず寰楀
    var slet_height=$("#right_shows").height();//涓よ竟鏄剧ず寰楅珮
    var cster_width=$("#small_right").width();//鏈€澶栧眰瀹藉害
    var cster_height=$("#small_right").height();//鏈€澶栧眰楂樺害
    var pos_left_1=$("#middel_shows").css("left");//涓棿left鍋忕Щ閲�
    var pos_left_2=$("#right_shows").css("left");//鍙宠竟left鍋忕Щ閲�
    var pos_left_3=$("#small_right").css("left");//鏈€鍙宠竟left鍋忕Щ閲�
    var pos_left_4=$("#left_shows").css("left");//宸﹁竟left鍋忕Щ閲�
    var pos_left_5=$("#small_left").css("left");//鏈€宸﹁竟left鍋忕Щ閲�
    var counts=1,lerts,rierts,fourts,five;
    //濡傛灉杞挱椤圭洰澶т簬5鏃跺鐢ㄧ殑椤圭洰鐨勪笅琛ㄧ殑鍙橀噺锛�
    if(sum_li>=5){
        lerts=counts+1;
        rierts=sum_li-2;
        fourts=sum_li-1;
        five=sum_li;
    }
    //====================================================
    var secend=150;//鍔ㄧ敾寤惰繜鏃堕棿
    if($(window).width()<521){secend=300}
    var scentimer=4000;//瀹氭椂鍣ㄩ棿闅旀椂闂�
    var timers=setInterval(auto_play_tree,scentimer);
    var ares=counts+1,ares2=counts;
    if(sum_li==4){ares=counts+2}
    if(sum_li>=5){ares=sum_li-1}
    //====================================================
    function dis_bloc(){
        $($(".show_s_ui>li")[counts]).css("display","block");
        $($(".show_s_ui>li")[lerts]).css("display","block");
        $($(".show_s_ui>li")[rierts]).css("display","block");
        $($(".show_s_ui>li")[fourts]).css("display","block");
        $($(".show_s_ui>li")[five]).css("display","block");
    }
    //宸︾偣鍑绘帶浠跺紑濮�=========================================
    function left_btn(){
        $(this).off("click");
        if(sum_li==2){
            ares=counts;
            if(counts>=2){counts=0;}else if(counts<0){counts=sum_li-1}
            lerts=counts+1;
            if(lerts>=2){lerts=lerts-sum_li;}else if(lerts<0){lerts=sum_li-1}
            animating(counts,middel_width,middel_hright,pos_left_1,"1");//1
            animating(lerts,slet_width,slet_height,pos_left_2,"0.6");//0
        }
        if(sum_li==3){
            if(counts<0){counts=sum_li-1;}else if(counts>=sum_li){counts=0;}
            lerts=counts+1;
            rierts=counts+2;
            if(lerts>=3){lerts=lerts-sum_li;}
            if(rierts>=3){rierts=rierts-sum_li;} animating(counts,slet_width,slet_height,pos_left_4,"0.6");//1
            animating(lerts,middel_width,middel_hright,pos_left_1,"1");//2
            animating(rierts,slet_width,slet_height,pos_left_2,"0.6");//0
        }
        if(sum_li==4){
            if(counts<0){counts=sum_li-1;}else if(counts>=sum_li){counts=0}
            lerts=counts+1;
            rierts=counts+2;
            fourts=counts+3;
            if(lerts>=4){lerts=lerts-sum_li;}
            if(rierts>=4){rierts=rierts-sum_li;}
            if(fourts>=4){fourts=fourts-sum_li;}
            animating(counts,slet_width,slet_height,pos_left_3,"0");//1
            animating(lerts,slet_width,slet_height,pos_left_4,"0.6");//2
            animating(rierts,middel_width,middel_hright,pos_left_1,"1");//3
            animating(fourts,slet_width,slet_height,pos_left_2,"0.6");//0
        }
        if(sum_li>=5){
            if(counts>=sum_li){counts=0;}else if(counts<0){counts=sum_li-1;}
            if(lerts>=sum_li){lerts=0;}else if(lerts<0){lerts=sum_li-1;}
            if(rierts>=sum_li){rierts=0;}else if(rierts<0){rierts=sum_li-1;}
            if(fourts>=sum_li){fourts=0;}else if(fourts<0){fourts=sum_li-1;}
            if(five>=sum_li){five=0;}else if(five<0){five=sum_li-1;}
            dis_bloc()
            animating(counts,cster_width,cster_height,pos_left_3,"0");//1
            animating(lerts,cster_width,cster_height,pos_left_5,"0");//2
            animating(rierts,slet_width,slet_height,pos_left_4,"0.6");//鍊掓暟绗簩涓�
            animating(fourts,middel_width,middel_hright,pos_left_1,"1");//鍊掓暟绗竴涓�
            animating(five,slet_width,slet_height,pos_left_2,"0.6");//0
            lerts--;
            rierts--;
            fourts--;
            five--;
        }
        if(ares>=sum_li){ares=0}else if(ares<0){ares=sum_li-1}
        $($(".nav_banners>li")[ares]).addClass("blue_nav").siblings().removeClass("blue_nav");
        counts--;
        ares--;
        ares2--;
        if(ares2>=sum_li){ares2=0}else if(ares2<0){ares2=sum_li-1}
        setTimeout(function(){
            $(".left_btn").on("click",left_btn);
        },secend);
    }
    $(".left_btn").on("click",left_btn);
    //宸︾偣鍑绘帶浠剁粨鏉�=========================================
    //鍙崇偣鍑绘帶浠跺紑濮�==========================================
    function right_btn(){
        $(this).off("click");
        auto_play_tree();
        setTimeout(function(){
            $(".right_btn").on("click",right_btn);
        },secend);
    }
    $(".right_btn").on("click",right_btn);
    //鍙崇偣鍑荤┖闂寸粨鏉�=======================================
    $(".color_font").mouseenter(function(){
        //榧犳爣绉诲叆鎺т欢娓呴櫎瀹氭椂鍣�
        clearInterval(timers);
    }).mouseleave(function(){
        //榧犳爣绉诲嚭鎺т欢鍚姩瀹氭椂鍣�
        timers=setInterval(auto_play_tree,scentimer);
    });
    //鍔ㄧ敾鍑芥暟寮€濮�========================================
    function animating(number,width,height,lefts,opacitting){
        $($(".show_s_ui>li")[number]).animate({
            width:width+"px",
            height:height+"px",
            left:lefts,
            opacity:opacitting,
        },secend);
    }
    //鍔ㄧ敾鍑芥暟缁撴潫=========================================
    //杞挱瀵艰埅鏉℃樉绀�=======================================
    $(".nav_banners>li").click(function(){
        clearInterval(timers);
        counts=$(this).index();
        ares=counts-2;
        ares2=counts;
        //    if(sum_li<5){

        //    }
        if(sum_li>=5){
            $(".show_s_ui>li").css("display","none");
            lerts=counts+1;
            rierts=sum_li-2+counts;
            if(rierts<=sum_li){rierts-=1}else if(rierts>sum_li)(rierts=rierts-sum_li-1)
            fourts=sum_li-1+counts;
            if(fourts<=sum_li){fourts-=1}else if(fourts>sum_li)(fourts=fourts-sum_li-1)
            five=sum_li+counts;
            if(five<=sum_li){five-=1}else if(five>sum_li)(five=five-sum_li-1)
        }
        auto_play_tree();

        timers=setInterval(auto_play_tree,scentimer)
    })
    //杞挱鍒拌埅鏉＄粨鏉�=======================================
    //杞挱鍑芥暟寮€濮�=========================================
    function auto_play_tree(){
        if(sum_li==2){
            if(counts>=2){counts=0;}else if(counts<0){counts=sum_li-1}
            lerts=counts+1;
            if(lerts>=2){lerts=lerts-sum_li;}else if(lerts<0){lerts=sum_li-1}
            animating(counts,middel_width,middel_hright,pos_left_1,"1");//1
            animating(lerts,slet_width,slet_height,pos_left_2,"0.6");//0
        }
        if(sum_li==3){
            if(counts>=3){counts=0;}else if(counts<0){counts=sum_li-1;}
            lerts=counts+1;
            rierts=counts+2;
            if(lerts>=3){lerts=lerts-sum_li;}
            if(rierts>=3){rierts=rierts-sum_li;}
            animating(counts,middel_width,middel_hright,pos_left_1,"1");//1
            animating(lerts,slet_width,slet_height,pos_left_2,"0.6");//2
            animating(rierts,slet_width,slet_height,pos_left_4,"0.6");//0
        }
        if(sum_li==4){
            if(counts>=4){counts=0;}else if(counts<0){counts=sum_li-1;}
            lerts=counts+1;
            rierts=counts+2;
            fourts=counts+3;
            if(lerts>=4){lerts=lerts-sum_li;}
            if(rierts>=4){rierts=rierts-sum_li;}
            if(fourts>=4){fourts=fourts-sum_li;}
            animating(counts,middel_width,middel_hright,pos_left_1,"1");//1
            animating(lerts,slet_width,slet_height,pos_left_2,"0.6");//2
            animating(rierts,slet_width,slet_height,pos_left_3,"0");//3
            animating(fourts,slet_width,slet_height,pos_left_4,"0.6");//0
        }
        if(sum_li>=5){
            if(counts>=sum_li){counts=0;}else if(counts<0){counts=sum_li-1;}
            if(lerts>=sum_li){lerts=0;}else if(lerts<0){lerts=sum_li-1;}
            if(rierts>=sum_li){rierts=0;}else if(rierts<0){rierts=sum_li-1;}
            if(fourts>=sum_li){fourts=0;}else if(fourts<0){fourts=sum_li-1;}
            if(five>=sum_li){five=0;}else if(five<0){five=sum_li-1;}
            dis_bloc();
            animating(counts,middel_width,middel_hright,pos_left_1,"1");//1
            animating(lerts,slet_width,slet_height,pos_left_2,"0.6");//2
            animating(rierts,cster_width,cster_height,pos_left_3,"0");//鍊掓暟绗簩涓�
            animating(fourts,cster_width,cster_height,pos_left_5,"0");//鍊掓暟绗竴涓�
            animating(five,slet_width,slet_height,pos_left_4,"0.6");//0
            lerts++;
            rierts++;
            fourts++;
            five++;
        }
        if(ares2>=sum_li){ares2=0}else if(ares2<0){ares2=sum_li-1}
        $($(".nav_banners>li")[ares2]).addClass("blue_nav").siblings().removeClass("blue_nav");
        counts++;
        ares++;
        ares2++;
        if(ares>=sum_li){ares=0}else if(ares<0){ares=sum_li-1}
    }
    //杞挱鍑芥暟缁撴潫=========================================================
    //濡傛灉灏变竴寮犲垯鍋滄瀹氭椂鍣紱娓呴櫎鎵€鏈夋帶浠朵簨浠�
    if(sum_li<2){
        clearInterval(timers);
        $(".nav_banners>li").off();
        $(".color_font").off();
    }
    //绉诲叆鍒拌疆鎾」鐩笂鍋滄瀹氭椂鍣紝闅愯棌浠嬬粛锛坉iv锛夋樉绀猴紝绉诲嚭鍚姩瀹氭椂鍣紱
    // $(".show_s_ui>li").mouseenter(function(){
    //     clearInterval(timers);
    //     $(this).children("div").css("display","block");
    // }).mouseleave(function(){
    //     $(this).children("div").css("display","none");
    //     timers=setInterval(auto_play_tree,scentimer);
    // });
});