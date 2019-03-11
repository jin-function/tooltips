// tooltop mouse event 
function Tooltip(e){
    let el = $(e); // 셀렉터

    let Jthis;     // target
    let tooltip;   // tooltip tag
    let Timer; 
    let data;
    let ready = false;

    /* check data */
    let wrap;
    let wrapChecker;

    el.mouseenter( function(e){
        data = initData(e);
        if(ready){ // open tips
            clearTimeout(Timer);
            openTip(data);
        } else {
           Timer = setTimeout(function(){
                ready = true;
                openTip(data);
            }, 500);            
        }
    })
    .mouseleave(function(e){
        closeTip();
        clearTimeout(Timer);
        if(ready){
            Timer = setTimeout(function(){
                ready = false;
            }, 300);            
        }
    });
    
    /* 툴팁에 필요한 기본 데이터 생성 */
    function initData(e){
        Jthis = $(e.target);
        Selecter_Checker();  //올바른 selecter인지 체크하고 랩퍼로 사용할 부모 클래스를 할당한다.

        let parentTop       = wrap.offset().top;
        let parentLeft      = wrap.offset().left;
        let parentWidth     = wrap.outerWidth();
        let parentHeight    = wrap.outerHeight();
        let selecterWidth   = Jthis.outerWidth(true);
        let selecterHeight  = Jthis.outerHeight(true);
        let selecterTop     = Jthis.position().top;
        let selecterLeft    = Jthis.position().left;

        var set = {
            "PTop":     parentTop,
            "PLeft":    parentLeft,
            "PWidth":   parentWidth,
            "PHeight":  parentHeight,
            "width":    selecterWidth,
            "height":   selecterHeight,
            "Top":      selecterTop,
            "Left":     selecterLeft, 
            "Title":    title
        };

        return {
            parent: wrap,
            el:Jthis,
            set: set
        }
    }

    function openTip(data){
        let html = '<div class="tooltip-box"><p class="title"></p></div>';
        Jthis.attr('title', '');
        data.parent.append(html);
        tooltip = $('.tooltip-box');
        tooltip.find('.title').text(data.set['Title']);  
        SetPosition(data.set);   
    }

    function closeTip(){
        Jthis.attr('title', data.set['Title']);
        tooltip? tooltip.css('opacity',0):0;
        data.parent.find('.tooltip-box').remove();
    }

    function Selecter_Checker(){
        wrap = Jthis.parents('.tooltip-wrapper');
        wrapChecker = wrap.length == 0 ? false:true; //wrap 클래스 선언여부 체크.
        /* 하위 태그가 선택됬는지 체크 */
        let check = Jthis.data('toggle');
        // tooltip 하위태그 선택되는 이슈. 셀렉터 재할당.
        typeof check == 'undefined' ? Jthis = Jthis.parents('[data-toggle="tooltip"]'):true; 
        wrap  = wrapChecker ? wrap:Jthis.parent();    
        title = Jthis.attr('title');
        title = typeof title == 'undefined' ? 'Title is not found':title; //타이틀 미입력시.
    }

    function SetPosition(data){
        let TW = tooltip.find('.title').width();          // 보여지는 크기
                 tooltip.find('.title').css('width',TW);
            TW = tooltip.find('.title').outerWidth(true); // 실제 크기를 할당해 left 값을 계산한다.
        let TH = tooltip.find('.title').outerHeight(true);
        data['TWidth']  = TW;
        data['THeight'] = TH;

        let setData = underLine(data);

        tooltip.offset({top:setData.box_top});
        tooltip.offset({left:setData.box_left});
        tooltip.css('right','auto');
        tooltip.css('bottom','auto');
        tooltip.find('.title').offset({left:setData.tip_left});
        tooltip.css('opacity',1);   
    }


    function underLine(data){
        let horizontal  = (data['TWidth']-data['width'])/2;    // Tooltip Width - Selecter Width / 2; ( 가로 중앙 정렬 )
        let offset_mid  = data['Left']-horizontal;             // center left 값.
        let width       = data['TWidth']+offset_mid;
        let max_width   = data['PWidth'];

        let overSize    = width > max_width ? width - max_width:0;
        let inline      = ((overSize+10)*(-1)) + offset_mid;
        let TLeft       = offset_mid <= 0 ? 10:overSize > 0 ? inline:'auto'; // 컨텐츠를 벗어날 경우 내부로. 

        /* under line */
        let top      = data['Top'] + data['height'];
        let box_top  = wrapChecker ? top + data['PTop']:top; 
        let box_left = offset_mid + data['PLeft'];
        let tip_left = TLeft + data['PLeft'];

        return {
            box_top :box_top,
            box_left:box_left,
            tip_left:tip_left
        }
    }

    function overLine(data){

    }

    function rightLine(data){

         let vertical    = (data['THeight'] - data['height'])/2;  // Tooltip Width - Selecter Width / 2; ( 세로 중앙 정렬 ) 
         let mid_height  = data['Top'] - vertical;                // center top 값. 

    }

}
Tooltip('[data-toggle="tooltip"]');