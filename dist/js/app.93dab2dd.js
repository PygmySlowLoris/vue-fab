webpackJsonp([1],{"+sbl":function(t,i,o){"use strict";var e=o("qDgq"),a=o.n(e),s=o("fgjQ"),n=o("XyMi");function l(t){o("4NO3")}var c=!1,r=l,p="data-v-02431236",d=null,u=Object(n["a"])(a.a,s["a"],s["b"],c,r,p,d);i["default"]=u.exports},0:function(t,i,o){o("iXgl"),t.exports=o("QVe3")},"1KHk":function(t,i){},"4NO3":function(t,i){},QVe3:function(t,i,o){t.exports=o.p+"img/logo.f582b9bd.png"},fGss:function(t,i){},fgjQ:function(t,i,o){"use strict";o.d(i,"a",function(){return e}),o.d(i,"b",function(){return a});var e=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("label",{class:[t.$parent.actionIconSize,"material-icons"],on:{click:function(t){t.stopPropagation()}}},[o("i",{class:[t.$parent.actionIconSize,"material-icons"]},[t._v(t._s(t.action.icon))]),o("input",{attrs:{type:"file",multiple:"",hidden:""},on:{change:t.change}})])},a=[]},iXgl:function(t,i,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=o("7+uW"),a=(o("EuXz"),o("+sbl")),s=o("WEHx"),n=o("WQHf"),l=o("lcOp"),c={mixins:[s["mixin"]],directives:{Ripple:n["a"],tooltip:l["VTooltip"]},data:function(){return{toggle:!1,pos:{},tooltipPosition:"left"}},props:{bgColor:{default:"#333333"},position:{default:"bottom-right"},positionType:{default:"fixed"},zIndex:{default:"999"},rippleShow:{default:!0},rippleColor:{default:"light"},mainIcon:{default:"add"},iconSize:{default:"medium"},mainTooltip:{default:null},fixedTooltip:{default:!1},actions:{default:function(){return[]}}},computed:{actionIconSize:function(){switch(this.iconSize){case"small":return"md-18";case"medium":return"md-24";case"large":return"md-36";default:return"md-24"}},mainIconSize:function(){switch(this.iconSize){case"small":return"md-24";case"medium":return"md-36";case"large":return"md-48";default:return"md-36"}},paddingAmount:function(){switch(this.iconSize){case"small":return"28px";case"medium":return"32px";case"large":return"38px";default:return"32px"}},listPos:function(){return"top-right"===this.position||"top-left"===this.position?{top:"-20px",paddingTop:"20px"}:{bottom:"-20px",paddingBottom:"20px"}},transitionEnter:function(){var t=this.animation;return t.enter},transitionLeave:function(){var t=this.animation;return t.leave},animation:function(){return"top-right"===this.position||"top-left"===this.position?{enter:"animated quick fadeInDown",leave:"animated quick fadeOutUp"}:"bottom-right"===this.position||"bottom-left"===this.position?{enter:"animated quick fadeInUp",leave:"animated quick fadeOutDown"}:{enter:"animated fadeInUp",leave:"animated fadeOutDown"}},tooltipTrigger:function(){return this.fixedTooltip?"manual":"hover"}},methods:{tooltipPos:function(){"top-right"===this.position||"bottom-right"===this.position?this.tooltipPosition="left":this.tooltipPosition="right"},toParent:function(t){this.$emit(t),this.toggle=!1},away:function(){this.toggle=!1},setPosition:function(){switch(this.pos={},this.position){case"bottom-right":this.pos.right="5vw",this.pos.bottom="4vh";break;case"bottom-left":this.pos.left="5vw",this.pos.bottom="4vh";break;case"top-left":this.pos.left="5vw",this.pos.top="4vh";break;case"top-right":this.pos.right="5vw",this.pos.top="4vh";break;default:this.pos.right="5vw",this.pos.bottom="4vh"}},moveTransition:function(){var t=document.getElementById(this.position+"-wrapper"),i=document.getElementById(this.position+"-action");"top-right"===this.position||"top-left"===this.position?t.appendChild(i):t.insertBefore(i,t.childNodes[0])},showTooltip:function(t){var i=this;t&&this.actions.length&&this.fixedTooltip&&setTimeout(function(){i.$refs.actions.forEach(function(t){i.toggle&&t._tooltip.show()})},700)}},watch:{position:function(t){var i=this;this.setPosition(),this.$nextTick(function(){i.moveTransition(),i.tooltipPos()})},toggle:function(t){this.showTooltip(t)}},mounted:function(){this.moveTransition()},created:function(){this.setPosition()}},r=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:t.away,expression:"away"}],staticClass:"fab-wrapper",style:[t.pos,{zIndex:t.zIndex},{position:t.positionType}],attrs:{id:t.position+"-wrapper"}},[o("div",{staticClass:"actions-container",style:t.listPos,attrs:{id:t.position+"-action"}},[o("transition",{attrs:{name:"fab-actions-appear","enter-active-class":t.transitionEnter,"leave-active-class":t.transitionLeave}},[o("ul",{directives:[{name:"show",rawName:"v-show",value:t.toggle,expression:"toggle"}],staticClass:"fab-list"},[t._l(t.actions,function(i){return[o("transition",{attrs:{"enter-active-class":"animated quick zoomIn","leave-active-class":"animated quick zoomOut"}},[i.tooltip?[t.toggle?o("li",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{content:i.tooltip,placement:t.tooltipPosition,classes:"fab-tooltip",trigger:t.tooltipTrigger},expression:"{ content: action.tooltip, placement: tooltipPosition, classes: 'fab-tooltip', trigger: tooltipTrigger}"}],ref:"actions",refInFor:!0,staticClass:"pointer",style:{"background-color":i.color||t.bgColor},on:{click:function(o){t.toParent(i.name)}}},[t._t("icon",[o("i",{class:[t.actionIconSize,"material-icons"]},[t._v(t._s(i.icon))])],{action:i})],2):t._e()]:[t.toggle?o("li",{staticClass:"pointer",style:{"background-color":i.color||t.bgColor},on:{click:function(o){t.toParent(i.name)}}},[t._t("icon",[o("i",{class:[t.actionIconSize,"material-icons"]},[t._v(t._s(i.icon))])],{action:i})],2):t._e()]],2)]})],2)])],1),t.rippleShow?[t.mainTooltip?[o("div",{directives:[{name:"ripple",rawName:"v-ripple",value:"light"==t.rippleColor?"rgba(255, 255, 255, 0.35)":"",expression:"rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''"},{name:"tooltip",rawName:"v-tooltip",value:{content:t.mainTooltip,placement:t.tooltipPosition,classes:"fab-tooltip"},expression:"{ content: mainTooltip, placement: tooltipPosition, classes: 'fab-tooltip' }"}],staticClass:"fab-main pointer",style:{"background-color":t.bgColor,padding:t.paddingAmount},on:{click:function(i){t.toggle=!t.toggle}}},[o("i",{class:[t.mainIconSize,{rotate:t.toggle},"material-icons main"]},[t._v(t._s(t.mainIcon))]),o("i",{class:[t.mainIconSize,{rotate:t.toggle},"material-icons close"]},[t._v("add")])])]:[o("div",{directives:[{name:"ripple",rawName:"v-ripple",value:"light"==t.rippleColor?"rgba(255, 255, 255, 0.35)":"",expression:"rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''"}],staticClass:"fab-main pointer",style:{"background-color":t.bgColor,padding:t.paddingAmount},on:{click:function(i){t.toggle=!t.toggle}}},[o("i",{class:[t.mainIconSize,{rotate:t.toggle},"material-icons main"]},[t._v(t._s(t.mainIcon))]),o("i",{class:[t.mainIconSize,{rotate:t.toggle},"material-icons close"]},[t._v("add")])])]]:[t.mainTooltip?[o("div",{staticClass:"fab-main pointer",style:{"background-color":t.bgColor,padding:t.paddingAmount},attrs:{"v-tooltip":{content:t.mainTooltip,placement:t.tooltipPosition,classes:"fab-tooltip"}}},[o("i",{staticClass:"material-icons md-36 main",class:{rotate:t.toggle}},[t._v(t._s(t.mainIcon))]),o("i",{staticClass:"material-icons md-36 close",class:{rotate:t.toggle}},[t._v("add")])])]:[o("div",{staticClass:"fab-main pointer",style:{"background-color":t.bgColor,padding:t.paddingAmount}},[o("i",{staticClass:"material-icons md-36 main",class:{rotate:t.toggle}},[t._v(t._s(t.mainIcon))]),o("i",{staticClass:"material-icons md-36 close",class:{rotate:t.toggle}},[t._v("add")])])]]],2)},p=[],d=o("XyMi");function u(t){o("q0eq"),o("1KHk")}var m=!1,f=u,v="data-v-3f198167",g=null,h=Object(d["a"])(c,r,p,m,f,v,g),b=h.exports,C=o("Zzkc");e["default"].component("upload",a["default"]);var _="https://github.com/PygmySlowLoris",y="https://github.com/PygmySlowLoris/vue-fab",x={hex:"#194d33",hsl:{h:150,s:.5,l:.2,a:1},hsv:{h:150,s:.66,v:.3,a:1},rgba:{r:25,g:77,b:51,a:1},a:1},w={name:"app",components:{fab:b,"chrome-picker":C["Chrome"]},data:function(){return{repoUrl:y,teamUrl:_,positions:["bottom-right","bottom-left","top-right","top-left"],positionTypes:["fixed","absolute"],tooltipEvents:["hover","fixed"],sizes:["small","medium","large"],position:"bottom-right",positionType:"fixed",tooltipEvent:"hover",iconSizes:"medium",colors:x,mainIcon:"add",mainTooltip:"Hello",firstIcon:"cached",firstTooltip:"cached",secondIcon:"add_alert",secondTooltip:"add_alert"}},computed:{fixedTooltip:function(){return"fixed"===this.tooltipEvent}},methods:{alert:function(t){function i(i){return t.apply(this,arguments)}return i.toString=function(){return t.toString()},i}(function(t){if(null!=t){for(var i=[],o=0;o<t.length;o++)i.push(t[o].name);alert(i.join())}else alert("You have clicked me :)")})}},T=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{attrs:{id:"app"}},[o("link",{attrs:{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.min.css"}}),o("link",{attrs:{href:"https://fonts.googleapis.com/icon?family=Material+Icons",rel:"stylesheet"}}),o("a",{attrs:{href:t.repoUrl}},[o("img",{staticStyle:{position:"absolute",top:"0",right:"0",border:"0"},attrs:{src:"https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67",alt:"Fork me on GitHub","data-canonical-src":"https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"}})]),t._m(0),o("section",{staticClass:"section",staticStyle:{"padding-top":".5rem"}},[o("div",{staticClass:"container"},[o("div",{staticClass:"columns"},[o("div",{staticClass:"column is-8 is-offset-2"},[o("div",{staticClass:"box formated"},[t._m(1),o("div",{staticClass:"content"},[o("div",{staticClass:"columns"},[o("div",{staticClass:"column is-4",staticStyle:{display:"flex","justify-content":"center"}},[o("div",{staticClass:"field is-pulled-left"},[o("label",{staticClass:"label"},[t._v("Color")]),o("p",{staticClass:"control"},[o("chrome-picker",{model:{value:t.colors,callback:function(i){t.colors=i},expression:"colors"}})],1)])]),o("div",{staticClass:"column"},[o("div",{staticClass:"field is-horizontal"},[o("div",{staticClass:"field-body"},[o("div",{staticClass:"field has-text-left"},[o("label",{staticClass:"label"},[t._v("Position")]),o("p",{staticClass:"control is-expanded"},[o("span",{staticClass:"select is-fullwidth"},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.position,expression:"position"}],on:{change:function(i){var o=Array.prototype.filter.call(i.target.options,function(t){return t.selected}).map(function(t){var i="_value"in t?t._value:t.value;return i});t.position=i.target.multiple?o:o[0]}}},t._l(t.positions,function(i){return o("option",[t._v(t._s(i))])}))])])]),o("div",{staticClass:"field has-text-left"},[o("label",{staticClass:"label"},[t._v("Position Type")]),o("p",{staticClass:"control is-expandend"},[o("span",{staticClass:"select is-fullwidth"},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.positionType,expression:"positionType"}],on:{change:function(i){var o=Array.prototype.filter.call(i.target.options,function(t){return t.selected}).map(function(t){var i="_value"in t?t._value:t.value;return i});t.positionType=i.target.multiple?o:o[0]}}},t._l(t.positionTypes,function(i){return o("option",[t._v(t._s(i))])}))])])]),o("div",{staticClass:"field has-text-left"},[o("label",{staticClass:"label"},[t._v("Size")]),o("p",{staticClass:"control is-expandend"},[o("span",{staticClass:"select is-fullwidth"},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.iconSizes,expression:"iconSizes"}],on:{change:function(i){var o=Array.prototype.filter.call(i.target.options,function(t){return t.selected}).map(function(t){var i="_value"in t?t._value:t.value;return i});t.iconSizes=i.target.multiple?o:o[0]}}},t._l(t.sizes,function(i){return o("option",[t._v(t._s(i))])}))])])]),o("div",{staticClass:"field has-text-left"},[o("label",{staticClass:"label"},[t._v("Tooltip event")]),o("p",{staticClass:"control is-expandend"},[o("span",{staticClass:"select is-fullwidth"},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.tooltipEvent,expression:"tooltipEvent"}],on:{change:function(i){var o=Array.prototype.filter.call(i.target.options,function(t){return t.selected}).map(function(t){var i="_value"in t?t._value:t.value;return i});t.tooltipEvent=i.target.multiple?o:o[0]}}},t._l(t.tooltipEvents,function(i){return o("option",[t._v(t._s(i))])}))])])])])]),o("label",{staticClass:"label",staticStyle:{display:"flex","align-items":"center","padding-right":"1rem"}},[t._v("\n                                            Main Icon & Tooltip\n                                        ")]),o("div",{staticClass:"field is-horizontal"},[o("div",{staticClass:"field-body"},[o("div",{staticClass:"field"},[o("p",{staticClass:"control"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.mainIcon,expression:"mainIcon"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.mainIcon},on:{input:function(i){i.target.composing||(t.mainIcon=i.target.value)}}})])]),o("div",{staticClass:"field"},[o("p",{staticClass:"control"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.mainTooltip,expression:"mainTooltip"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.mainTooltip},on:{input:function(i){i.target.composing||(t.mainTooltip=i.target.value)}}})])])])]),o("label",{staticClass:"label",staticStyle:{display:"flex","align-items":"center","padding-right":"1rem"}},[t._v("\n                                            First Icon & Tooltip\n                                        ")]),o("div",{staticClass:"field is-horizontal"},[o("div",{staticClass:"field-body"},[o("div",{staticClass:"field"},[o("p",{staticClass:"control"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.firstIcon,expression:"firstIcon"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.firstIcon},on:{input:function(i){i.target.composing||(t.firstIcon=i.target.value)}}})])]),o("div",{staticClass:"field"},[o("p",{staticClass:"control"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.firstTooltip,expression:"firstTooltip"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.firstTooltip},on:{input:function(i){i.target.composing||(t.firstTooltip=i.target.value)}}})])])])]),o("label",{staticClass:"label",staticStyle:{display:"flex","align-items":"center","padding-right":"1rem"}},[t._v("\n                                            Second Icon & Tooltip\n                                        ")]),o("div",{staticClass:"field is-horizontal"},[o("div",{staticClass:"field-body"},[o("div",{staticClass:"field"},[o("p",{staticClass:"control"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.secondIcon,expression:"secondIcon"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.secondIcon},on:{input:function(i){i.target.composing||(t.secondIcon=i.target.value)}}})])]),o("div",{staticClass:"field"},[o("p",{staticClass:"control"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.secondTooltip,expression:"secondTooltip"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.secondTooltip},on:{input:function(i){i.target.composing||(t.secondTooltip=i.target.value)}}})])])])])])]),o("div",{staticClass:"columns"},[o("div",{staticClass:"column has-text-centered"},[o("a",{attrs:{href:t.repoUrl}},[t._v("Installation & Code usage")])])])])])])])])]),o("footer",{staticClass:"footer"},[o("div",{staticClass:"container"},[o("div",{staticClass:"content has-text-centered"},[o("p",[o("strong",[t._v("Floating Action Button Vue Component")]),t._v(" by "),o("a",{attrs:{href:t.teamUrl}},[t._v("Pygmy Team")]),t._v(".\n                    ")]),t._m(2)])])]),o("fab",{attrs:{position:t.position,"icon-size":t.iconSizes,"position-type":t.positionType,"bg-color":t.colors.hex,"main-icon":t.mainIcon,"main-tooltip":t.mainTooltip,actions:[{name:"alertMe",icon:t.firstIcon,tooltip:t.firstTooltip,color:"#d11014"},{name:"alertMe",icon:t.secondIcon,tooltip:t.secondTooltip},{name:"alertMe",icon:"file_upload",tooltip:"Upload"}],"fixed-tooltip":t.fixedTooltip},on:{alertMe:t.alert},scopedSlots:t._u([{key:"icon",fn:function(t){var i=t.action;return"Upload"==i.tooltip?[o("upload",{attrs:{action:i}})]:void 0}}])})],1)},I=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("section",{staticClass:"hero"},[e("div",{staticClass:"hero-body",staticStyle:{padding:"1rem 0"}},[e("div",{staticClass:"container"},[e("div",{staticClass:"columns"},[e("div",{staticClass:"column is-8 is-offset-3",staticStyle:{display:"flex","align-items":"center"}},[e("div",{staticClass:"is-pulled-left"},[e("img",{attrs:{width:"350px",src:o("QVe3")}})]),e("div",{staticClass:"is-pulled-left",staticStyle:{"text-align":"left"}},[e("h1",{staticClass:"title text-medium-grey",staticStyle:{"margin-bottom":".5rem"}},[t._v("\n                                    Floating Action Button\n                                ")]),e("hr",{staticClass:"is-marginless"}),e("h2",{staticClass:"subtitle text-light-grey",staticStyle:{"margin-top":".5rem"}},[t._v("\n                                    A Vue Component\n                                    "),e("span",{staticClass:"is-pulled-right"},[e("a",{staticClass:"github-button",attrs:{href:"https://github.com/PygmySlowLoris/vue-fab","data-icon":"octicon-star","data-size":"large","aria-label":"Star PygmySlowLoris/vue-fab on GitHub"}},[t._v("Star")])])])])])])])])])},function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{staticClass:"heading"},[o("div",{staticClass:"columns"},[o("div",{staticClass:"column"},[o("i",{staticClass:"material-icons top-left"},[t._v("code")]),o("span",{staticClass:"is-pulled-right"},[o("b",[t._v("Example")])])])])])},function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("p",[o("small",[t._v("Used dependencies for this demo: "),o("a",{attrs:{href:"http://bulma.io"}},[t._v("bulma")]),t._v(" | "),o("a",{attrs:{href:"https://github.com/xiaokaike/vue-color"}},[t._v("vue-color")])])])}];function S(t){o("fGss")}var k=!1,z=S,P="data-v-5158d3f2",E=null,N=Object(d["a"])(w,T,I,k,z,P,E),q=N.exports;new e["default"]({el:"#app",render:t=>t(q)})},q0eq:function(t,i){},qDgq:function(t,i){t.exports={props:["action"],methods:{change:function(t){return this.$parent.$emit(this.action.name,t.target.files),this.$parent.toggle=!1}}}}},[0]);
//# sourceMappingURL=app.93dab2dd.js.map