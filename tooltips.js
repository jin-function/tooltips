// tooltop mouse event 
function Tooltip(e){
    let el = $(e); // 셀렉터

    let Jthis;     // target
    let data;
    let tooltip;   // tooltip tag
    let openTimer; 
    let closeTimer;
    let ready = false;

    /* check data */
    let wrap;
    let wrapChecker;

    el.mouseenter( function(e){
        data = initData(e);
        Jthis.attr('title', '');
        var html = '<div class="tooltip-box"><p class="title"></p></div>';
        data.parent.append(html);

        if(ready){ // open tips
            clearTimeout(closeTimer);
            openTip(data);
        } else {
           openTimer = setTimeout(function(){
                ready = true;
                openTip(data);
            }, 500);            
        }
    })
    .mouseleave(function(e){
        Jthis.attr('title', data.set['Title']);
        tooltip? tooltip.css('opacity',0):0;
        data.parent.find('.tooltip-box').remove();
        clearTimeout(openTimer);
        if(ready){
            closeTimer = setTimeout(function(){
                ready = false;
            }, 300);            
        }
    });
    
    /* 툴팁에 필요한 기본 데이터 생성 */
    function initData(e){
        Jthis = $(e.target);
        Selecter_Checker();

        //let wrap = $('body');
        let PT = wrap.position().top;
        let PL = wrap.position().left;
        let W = Jthis.outerWidth(true);
        let H = Jthis.outerHeight(true);
        let T = Jthis.position().top;
        let L = Jthis.position().left;

        var set = {
            "Width":W,
            "Height":H,
            "Top":T+H,
            "Left":L, 
            "PTop":PT,
            "PLeft":PL,
            "Title":title
        };

        return {
            parent: wrap,
            el:Jthis,
            set: set
        }
    }

    function openTip(data){
        tooltip = $('.tooltip-box');
        tooltip.find('.title').text(data.set['Title']);  

        let TW = tooltip.find('.title').width();          // 보여지는 크기
                 tooltip.find('.title').css('width',TW);
            TW = tooltip.find('.title').outerWidth(true); // 실제 크기를 할당해 left 값을 계산한다.

        let center = (TW - data.set['Width'])/2;         // Tooltip Width - Selecter Width / 2; (center) 
        let Left     = data.set['Left'] - center;        // center left 값.
        let W        = TW+Left;
        let PW       = data.parent.width();
        let Over     = W > PW ? W-PW:0;
        let TH       = tooltip.find('.title').outerHeight(true);
        let TLeft    = Left < 0 ? 10:Over > 0 ? ((Over+10)*(-1)) +Left:'auto'; // 컨텐츠를 벗어날 경우 내부로. 
        let top      = wrapChecker ? data.set['Top'] + data.set['PTop']:data.set['Top']; 

        tooltip.offset({top:top});
        tooltip.offset({left:Left});
        tooltip.offset({right:'auto'});
        tooltip.offset({bottom:'auto'});
        tooltip.find('.title').offset({left:TLeft});      
        tooltip.css('opacity',1);
    }

    function Selecter_Checker(){
        wrap = Jthis.parents('.tooltip-wrapper');
        wrapChecker = wrap.length == 0 ? false:true; //wrap 클래스 선언여부 체크.
 
        /* 하위 태그가 선택됬는지 체크 */
        let check = Jthis.data('toggle');
        typeof check == 'undefined' ? Jthis = Jthis.parents('[data-toggle="tooltip"]'):true;
        wrap  = wrapChecker ? wrap:Jthis.parent();    
        title = Jthis.attr('title');
        title = typeof title == 'undefined' ? 'Title is not found':title; //타이틀 미입력시.
    }
}
