!function(t){
    "use strict";
    
    
    function e(t,e){
        let n;return(...i)=>{clearTimeout(n),n=setTimeout((()=>{t(...i)}),e)}
    }
    
    class n{
        constructor(){
            this.callbacks=[], window.addEventListener("DOMContentLoaded",(()=>this.onDOMContentLoaded()))
        }
        onDOMContentLoaded() {
            this.callbacks.sort(((t,e)=>t.priority-e.priority)).forEach((({callback:t})=>t()))
        }
        runOnLoad(t){
            "loading"===document.readyState?this.callbacks.push(t):t.callback()
        }
    }
        
    class i{
        constructor(t){
            this.items=[],this.previousWidth=document.documentElement.clientWidth,this.previousHeight=window.innerHeight;
            
            const e=t((()=>this.onWindowResize()),100);
            window.addEventListener("resize",e)
        }
        
        onWindowResize(){
            const t=document.documentElement.clientWidth,e=window.innerHeight,n=this.previousWidth!==t,i=this.previousHeight!==e;
            this.items.forEach((t=>{const e=()=>{t.callback(),t.executed=!0};
            
            (!t.executed||n&&t.options.runOnWidthChange||i&&t.options.runOnHeightChange) && e()
        })),this.previousWidth=t,this.previousHeight=e}runOnResize(t,e){this.items.push({callback:t,options:e,executed:e.runOnLoad}),this.items.sort(((t,e)=>t.options.priority-e.options.priority)),e.runOnLoad&&function(t,e=Number.MAX_VALUE){var i;(window.canva_scriptExecutor=null!==(i=window.canva_scriptExecutor)&&void 0!==i?i:new n).runOnLoad({callback:t,priority:e})}(t,e.priority)}}const o="data-aspect-ratio",r="scale_rotated_fill_v2",s="--scale-fill",c=".animation_container";function a(t){const e=t.getAttribute(o);if(!e)return;const{width:n,height:i}=t.parentElement.getBoundingClientRect();let r=i/n;if(!r){const{width:e,height:n}=t.closest(c).getBoundingClientRect();r=n/e}const a=r/parseFloat(e);t.style.setProperty(s,`${a}`)}(function(t,n,o=e){var r;(window.canva_debounceResize=null!==(r=window.canva_debounceResize)&&void 0!==r?r:new i(o)).runOnResize(t,{runOnLoad:!1,runOnWidthChange:!0,runOnHeightChange:!1,priority:Number.MAX_VALUE,...n})})((function(){Array.from(document.querySelectorAll(`.${r}`)).forEach(a)}),{runOnLoad:!0,runOnHeightChange:!0}),t.scaleRotatedFill=a,Object.defineProperty(t,"__esModule",{value:!0})}({});
