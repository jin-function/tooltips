// tooltop mouse event 
function Tooltip(e){
    let el = $(e); // 셀렉터

    let Jthis;     // target
    let tooltip;   // tooltip tag
    let Timer; 
    let ready = false;

    let seting = {
        parent:  {top: 0, left:0, width:0, height:0},
        selecter:{top: 0, left:0, width:0, height:0},
        tooltip: {top: 0, left:0, width:0, height:0},
        body:    {top: 0, left:0, width:0, height:0},
        title:   'Title is not found',
        position:'under'
    };

    /* check data */
    let wrap;
    let wrapChecker;

    el.mouseenter( function(e){
        initData(e);
        if(ready){ 
            clearTimeout(Timer);
            openTip();
        } else {
           Timer = setTimeout(function(){
                ready = true;
                openTip();
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
        Jthis.attr('title', '');

        /* parent setting */
        seting.parent.top    = wrapChecker ? wrap.offset().top:0;
        seting.parent.left   = wrap.offset().left;
        seting.parent.width  = wrap.outerWidth();
        seting.parent.height = wrap.outerHeight();

        /* selecter setting */
        seting.selecter.top    = Jthis.position().top;
        seting.selecter.left   = Jthis.position().left;
        seting.selecter.width  = Jthis.outerWidth(true);
        seting.selecter.height = Jthis.outerHeight(true);

        return {
            parent: wrap,
            el:Jthis
        }
    }

    function openTip(){
        let html = '<div class="tooltip-box"><p class="title"></p></div>';
        wrap.append(html);
        tooltip = $('.tooltip-box');
        tooltip.find('.title').text(seting.title);  
        SetPosition();   
    }

    function closeTip(){
        tooltip? tooltip.css('opacity',0):0;
        wrap.find('.tooltip-box').remove();
        Jthis.attr('title', seting.title);
    }

    function Selecter_Checker(){
        //tooltip-wrapper class check.
        wrap = Jthis.parents('.tooltip-wrapper');
        wrapChecker = wrap.length != 0 ? true:false;

        /* child selected */
        selected = Jthis.parents('[data-toggle="tooltip"]'); // childe selected check
        proper   = selected.length == 0 ? Jthis.parent():selected.parent(); // 1 = child selected
        wrap     = wrapChecker ? wrap:proper; 


        /* title 체크 */
        let Attrcheck = Jthis.data('toggle');
        Jthis = typeof Attrcheck == 'undefined' ? Jthis.parents('[data-toggle="tooltip"]'):Jthis;
        seting.title = typeof Jthis.attr('title') == 'undefined' ? seting.title:Jthis.attr('title'); //타이틀 미입력시.
    }

    function tooltipSize(){
        let TW = tooltip.find('.title').width();          // 보여지는 크기
        tooltip.find('.title').css('width',TW);

        seting.tooltip.width  = tooltip.find('.title').outerWidth(true);
        seting.tooltip.height = tooltip.find('.title').outerHeight(true);
    }

    // function tolltip_Line(data, line='under'){
    //     tooltip.addClass(line+'Line');
    // }

    function SetPosition(){
        tooltipSize();
        underLine();

        tooltip.addClass(seting.position);
        tooltip.offset({top:seting.tooltip.top});
        tooltip.offset({left:seting.tooltip.left});
        tooltip.css('right','auto');
        tooltip.css('bottom','auto');
        tooltip.find('.title').offset({left:seting.body.left});
        tooltip.css('opacity',1);
    }

    function underLine(){
        let left = wrapChecker ? seting.selecter.left:seting.selecter.left - seting.parent.left;

        /* LEFT horizontal center && wraper inlne */
        let horizontal  = (seting.tooltip.width - seting.selecter.width)/2;    // Tooltip Width - Selecter Width / 2; ( 가로 중앙 정렬 )
        let width_align = left - horizontal;                   // center left 값.
        let width       = seting.tooltip.width + width_align;
        let max_width   = seting.parent.width;
        let overSize    = width > max_width ? width - max_width:0;
        let inline      = ((overSize)*(-1)) + width_align;
        let TLeft       = width_align < 0 ? 0:overSize > 0 ? inline:'auto'; // 컨텐츠를 벗어날 경우 내부로. 

        seting.tooltip.left  = wrapChecker ? width_align + seting.parent.left:seting.selecter.left-horizontal;
        seting.body.left     = TLeft + seting.parent.left;

        /* under top set */
        let under_top = seting.parent.top + seting.selecter.top + seting.selecter.height;  
        /* over top set */
        let over_top  = seting.parent.top + seting.selecter.top - seting.tooltip.height; 
        let max_top   = seting.parent.top + seting.parent.height;
        let top       = seting.parent.top + under_top + seting.tooltip.height;

        /* under || over check */
        if(max_top < top){
            seting.position    = 'over';
            seting.tooltip.top = over_top;        
            /* all out check */
            if(seting.tooltip.top < wrap.offset().top){
               seting.position    = 'under';
               seting.tooltip.top = under_top;
            }         
        } else {
            seting.position    = 'under';
            seting.tooltip.top = under_top;
        }  
    }

    function rightLine(data){
         let vertical    = (data['theight'] - data['height'])/2;  // Tooltip Width - Selecter Width / 2; ( 세로 중앙 정렬 ) 
         let mid_height  = data['top'] - vertical;                // center top 값. 
    }

}
Tooltip('[data-toggle="tooltip"]');