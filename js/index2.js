$(function() {
	/*头部滑动条*/	
    $(".head_list").append("<li id='magic-line'></li>");
    var $magicLine = $("#magic-line"); 
    $magicLine
        .width($(".current_page_item").width())
        .css("left", $(".current_page_item").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
     $(".head_list li").click(function(){
     	var left=$("#magic-line").position().left
     	$(this).addClass("current_page_item").siblings().removeClass("current_page_item")
     	$magicLine.data("origLeft",left)
     })   
    $(".head_list li>a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;       
        newWidth = $el.parent().width();      
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });    
    });

	
	/*下拉菜单*/
	$(".head_list>li").hover(function(){
		$(this).find(".head_listChild").stop().slideToggle()
		
	})
	/*产品product hover效果*/
	$(".product_listBox").hover(function(){
		$(this).find(".product_listBoxHover").stop().fadeToggle()
	})
	/*关闭弹出框*/
	$(".alter_button button").eq(1).click(function(){
		$(".alterBOX").hide()
	})
	/**/	 
    var dotLeft = 210;
    var dotTop = 210;
    var stard = 0;
    var radius = 200;
    var avd = 360/$(".A_section2RadioList").length;
    var ahd = avd*Math.PI/180;       
    $(".A_section2RadioList").each(function(index, element){
        $(this).css({"left":Math.sin((ahd*index))*radius+dotLeft,"top":Math.cos((ahd*index))*radius+dotTop});
    });

});

