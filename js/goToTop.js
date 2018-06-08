 // $(function(){
 //     var topDistance = 500;
 //    var showDistance = 1;
 //    var goToTopButton = $('<div id="goToTop"><img src="../img/pagesimg/cctv/images/top.png" width="100%"/></div>');
 //     var thisTop = $(window).scrollTop() + topDistance;
 //     $('.container').append(goToTopButton);
 //     $('#goToTop').css('top' ,thisTop);
 //    if($(window).scrollTop() < showDistance){
 //        $('#goToTop').hide();
 //   }
 //     $(window).scroll(function(){
 //         thisTop = $(this).scrollTop() + topDistance;        //获取当前window向上滚动的距离
 //         $('#goToTop').css('top', thisTop);                    //修改goToTop按钮的top距离
 //         if($(this).scrollTop() > showDistance){
 //            $('#goToTop').fadeIn();
 //       }else{
 //            $('#goToTop').fadeOut();
 //            }
 //
 //         });
 //
 //        // 给按钮绑定一个click事件，点击按钮时，返回顶部
 //     $('#goToTop').click(function(){
 //         $('html ,body').animate({scrollTop: 0}, 300);
 //         return false;
 //     });
 // });