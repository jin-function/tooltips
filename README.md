# tooltips

tooltip 사용법

1. 프로젝트에 tooltips.js, tooltips.css 를 추가하세요.

2. 원하는 elment를 tooltip 요소로 만들기 위해서는 그저 data-toggle="tooltip"만 선언만하면 됩니다.

3. tooltip에 표시될 메세지는 html의 title 기능을 그대로 사용하면됩니다.

ex ) 〈span data-toggle="tooltip" title="example tooltip"〉example〈/span〉


주의.

아래와 같은 구조에서 사용시 몇가지 주의해야할 점들이 있습니다.
1. table과 같은 구조.

〈table〉<br>
    〈td〉<br>
        〈span data-toggle="tooltip" title="example tooltip"〉〈/span〉<br>
    〈/td〉<br>
    〈td〉<br>
        〈span data-toggle="tooltip" title="example tooltip"〉〈/span〉<br>
    〈/td〉<br>
    〈td〉<br>
        〈span data-toggle="tooltip" title="example tooltip"〉〈/span〉<br>
    〈/td〉<br>
〈table〉<br>

html에서 table내에는 tr,td,th 등등의 table 형태가 아닌 elment가 삽입 될 경우 
추가되는(tooltip-box) elment의 위치를 명확히 파악 할 수 없습니다.

이와 같은 문제를 해결하기 위해서는 table을 div class="tooltip-wrapper"〉〈/div〉외피로 감싸주면 됩니다.
대부분의 상황에서 〈div class="tooltip-wrapper"〉〈/div〉 를 사용하지 않아도 정상적으로 작동하지만
아래와 같이 사용하길 권장합니다.
〈div class="tooltip-wrapper"〉<br>
	〈table〉<br>
	    〈td〉<br>
		〈span data-toggle="tooltip" title="example tooltip"〉〈/span〉<br>
	    〈/td〉<br>
	    〈td〉<br>
		〈span data-toggle="tooltip" title="example tooltip"〉〈/span〉<br>
	    〈/td〉<br>
	    〈td〉<br>
		〈span data-toggle="tooltip" title="example tooltip"〉〈/span〉<br>
	    〈/td〉<br>
	〈table〉<br>
〈/div〉<br>
