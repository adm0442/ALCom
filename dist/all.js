!function e(t,n,o){function i(a,s){if(!n[a]){if(!t[a]){var d="function"==typeof require&&require;if(!s&&d)return d(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[a]={exports:{}};t[a][0].call(c.exports,function(e){var n=t[a][1][e];return i(n?n:e)},c,c.exports,e,t,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,t,n){(function(e){(function(){var n,o,i;"undefined"!=typeof performance&&null!==performance&&performance.now?t.exports=function(){return performance.now()}:"undefined"!=typeof e&&null!==e&&e.hrtime?(t.exports=function(){return(n()-i)/1e6},o=e.hrtime,n=function(){var e;return e=o(),1e9*e[0]+e[1]},i=n()):Date.now?(t.exports=function(){return Date.now()-i},i=Date.now()):(t.exports=function(){return(new Date).getTime()-i},i=(new Date).getTime())}).call(this)}).call(this,e("_process"))},{_process:12}],2:[function(e,t,n){(function(n){for(var o=e("performance-now"),i="undefined"==typeof window?n:window,r=["moz","webkit"],a="AnimationFrame",s=i["request"+a],d=i["cancel"+a]||i["cancelRequest"+a],l=0;!s&&l<r.length;l++)s=i[r[l]+"Request"+a],d=i[r[l]+"Cancel"+a]||i[r[l]+"CancelRequest"+a];if(!s||!d){var c=0,f=0,u=[],h=1e3/60;s=function(e){if(0===u.length){var t=o(),n=Math.max(0,h-(t-c));c=n+t,setTimeout(function(){var e=u.slice(0);u.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c)}catch(n){setTimeout(function(){throw n},0)}},Math.round(n))}return u.push({handle:++f,callback:e,cancelled:!1}),f},d=function(e){for(var t=0;t<u.length;t++)u[t].handle===e&&(u[t].cancelled=!0)}}t.exports=function(e){return s.call(i,e)},t.exports.cancel=function(){d.apply(i,arguments)},t.exports.polyfill=function(){i.requestAnimationFrame=s,i.cancelAnimationFrame=d}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"performance-now":1}],3:[function(e,t,n){t.exports=function(e,t){function n(){T=S=L=k=B=M=j}function o(e,t){for(key in t)t.hasOwnProperty(key)&&(e[key]=t[key])}function i(e){return parseFloat(e)||0}function r(){R={top:t.pageYOffset,left:t.pageXOffset}}function a(){return t.pageXOffset!=R.left?(r(),void L()):void(t.pageYOffset!=R.top&&(r(),d()))}function s(e){setTimeout(function(){t.pageYOffset!=R.top&&(R.top=t.pageYOffset,d())},0)}function d(){for(var e=E.length-1;e>=0;e--)l(E[e])}function l(e){if(e.inited){var t=R.top<=e.limit.start?0:R.top>=e.limit.end?2:1;e.mode!=t&&m(e,t)}}function c(){for(var e=E.length-1;e>=0;e--)if(E[e].inited){var t=Math.abs(y(E[e].clone)-E[e].docOffsetTop),n=Math.abs(E[e].parent.node.offsetHeight-E[e].parent.height);if(t>=2||n>=2)return!1}return!0}function f(e){isNaN(parseFloat(e.computed.top))||e.isCell||(e.inited=!0,e.clone||g(e),"absolute"!=e.parent.computed.position&&"relative"!=e.parent.computed.position&&(e.parent.node.style.position="relative"),l(e),e.parent.height=e.parent.node.offsetHeight,e.docOffsetTop=y(e.clone))}function u(e){var t=!0;e.clone&&w(e),o(e.node.style,e.css);for(var n=E.length-1;n>=0;n--)if(E[n].node!==e.node&&E[n].parent.node===e.parent.node){t=!1;break}t&&(e.parent.node.style.position=e.parent.css.position),e.mode=-1}function h(){for(var e=E.length-1;e>=0;e--)f(E[e])}function p(){for(var e=E.length-1;e>=0;e--)u(E[e])}function m(e,t){var n=e.node.style;switch(t){case 0:n.position="absolute",n.left=e.offset.left+"px",n.right=e.offset.right+"px",n.top=e.offset.top+"px",n.bottom="auto",n.width="auto",n.marginLeft=0,n.marginRight=0,n.marginTop=0;break;case 1:n.position="fixed",n.left=e.box.left+"px",n.right=e.box.right+"px",n.top=e.css.top,n.bottom="auto",n.width="auto",n.marginLeft=0,n.marginRight=0,n.marginTop=0;break;case 2:n.position="absolute",n.left=e.offset.left+"px",n.right=e.offset.right+"px",n.top="auto",n.bottom=0,n.width="auto",n.marginLeft=0,n.marginRight=0}e.mode=t}function g(e){e.clone=document.createElement("div");var t=e.node.nextSibling||e.node,n=e.clone.style;n.height=e.height+"px",n.width=e.width+"px",n.marginTop=e.computed.marginTop,n.marginBottom=e.computed.marginBottom,n.marginLeft=e.computed.marginLeft,n.marginRight=e.computed.marginRight,n.padding=n.border=n.borderSpacing=0,n.fontSize="1em",n.position="static",n.cssFloat=e.computed.cssFloat,e.node.parentNode.insertBefore(e.clone,t)}function w(e){e.clone.parentNode.removeChild(e.clone),e.clone=void 0}function v(e){var t=getComputedStyle(e),n=e.parentNode,o=getComputedStyle(n),r=e.style.position;e.style.position="relative";var a={top:t.top,marginTop:t.marginTop,marginBottom:t.marginBottom,marginLeft:t.marginLeft,marginRight:t.marginRight,cssFloat:t.cssFloat},s={top:i(t.top),marginBottom:i(t.marginBottom),paddingLeft:i(t.paddingLeft),paddingRight:i(t.paddingRight),borderLeftWidth:i(t.borderLeftWidth),borderRightWidth:i(t.borderRightWidth)};e.style.position=r;var d={position:e.style.position,top:e.style.top,bottom:e.style.bottom,left:e.style.left,right:e.style.right,width:e.style.width,marginTop:e.style.marginTop,marginLeft:e.style.marginLeft,marginRight:e.style.marginRight},l=b(e),c=b(n),f={node:n,css:{position:n.style.position},computed:{position:o.position},numeric:{borderLeftWidth:i(o.borderLeftWidth),borderRightWidth:i(o.borderRightWidth),borderTopWidth:i(o.borderTopWidth),borderBottomWidth:i(o.borderBottomWidth)}},u={node:e,box:{left:l.win.left,right:A.clientWidth-l.win.right},offset:{top:l.win.top-c.win.top-f.numeric.borderTopWidth,left:l.win.left-c.win.left-f.numeric.borderLeftWidth,right:-l.win.right+c.win.right-f.numeric.borderRightWidth},css:d,isCell:"table-cell"==t.display,computed:a,numeric:s,width:l.win.right-l.win.left,height:l.win.bottom-l.win.top,mode:-1,inited:!1,parent:f,limit:{start:l.doc.top-s.top,end:c.doc.top+n.offsetHeight-f.numeric.borderBottomWidth-e.offsetHeight-s.top-s.marginBottom}};return u}function y(e){for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;return t}function b(e){var n=e.getBoundingClientRect();return{doc:{top:n.top+t.pageYOffset,left:n.left+t.pageXOffset},win:n}}function x(){q=setInterval(function(){!c()&&L()},500)}function C(){clearInterval(q)}function D(){W&&(document[O]?C():x())}function T(){W||(r(),h(),t.addEventListener("scroll",a),t.addEventListener("wheel",s),t.addEventListener("resize",L),t.addEventListener("orientationchange",L),e.addEventListener(N,D),x(),W=!0)}function L(){if(W){p();for(var e=E.length-1;e>=0;e--)E[e]=v(E[e].node);h()}}function k(){t.removeEventListener("scroll",a),t.removeEventListener("wheel",s),t.removeEventListener("resize",L),t.removeEventListener("orientationchange",L),e.removeEventListener(N,D),C(),W=!1}function B(){k(),p()}function M(){for(B();E.length;)E.pop()}function S(e){for(var t=E.length-1;t>=0;t--)if(E[t].node===e)return;var n=v(e);E.push(n),W?f(n):T()}function F(e){for(var t=E.length-1;t>=0;t--)E[t].node===e&&(u(E[t]),E.splice(t,1))}e||(e=document),t||(t=window);var R,q,E=[],W=!1,A=e.documentElement,j=function(){},O="hidden",N="visibilitychange";void 0!==e.webkitHidden&&(O="webkitHidden",N="webkitvisibilitychange"),t.getComputedStyle||n();for(var I=["","-webkit-","-moz-","-ms-"],Q=document.createElement("div"),z=I.length-1;z>=0;z--){try{Q.style.position=I[z]+"sticky"}catch(_){}""!=Q.style.position&&n()}return r(),{stickies:E,add:S,remove:F,init:T,rebuild:L,pause:k,stop:B,kill:M}}},{}],4:[function(e,t,n){(function(e){!function(){"use strict";var t="undefined"!=typeof window?window.jQuery:"undefined"!=typeof e?e.jQuery:null;t("pre code").each(function(){var e=t(this);e.addClass("prettyprint")})}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(e,t,n){!function(){"use strict";var e=document.getElementById("featured-portfolio");if(e){var t=e.getElementsByTagName("article"),n=0,o=t.length,i=1;t[n].classList.add("active"),e.classList.add("loaded");var r=function(){var e=n;n=n+1==o?0:n+1,t[n].style.zIndex=++i,t[n].classList.add("active"),setTimeout(function(){t[e].classList.remove("active")},1e3)},a=document.createElement("a");a.innerHTML="",a.title="Next",a.href="#",a.className="next icon-arrow-down icon--round icon--round--white icon--round--ghost",e.appendChild(a),a.addEventListener("click",function(e){e.preventDefault(),r()})}}()},{}],6:[function(e,t,n){(function(e){!function(){"use strict";var t="undefined"!=typeof window?window.jQuery:"undefined"!=typeof e?e.jQuery:null;t.fn.liveFilter=function(e,n){var o=t(e),i=t(this),r=t.extend({multiple:!1,relation:"or"},n),a=function(){var e=[];i.filter(".active").each(function(){var n=t(this);e.push("."+t.trim(n.html()))});var n="or"===r.relation?e.join(","):e.join("");o.removeClass("hidden"),e.length&&o.each(function(){var e=t(this);e.is(n)||e.addClass("hidden")})};i.on("click",function(e){var n=t(this);e.preventDefault(),r.multiple===!1?n.is(".active")?i.removeClass("active"):(i.removeClass("active"),n.addClass("active")):n.toggleClass("active"),a()})},t("#projects").length?t("#posts-intro").find("ul.tags a").liveFilter("#projects article"):t("#portfolios").length&&t("#posts-intro").find("ul.tags a").liveFilter("#portfolios article")}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,t,n){(function(e){!function(){"use strict";var t="undefined"!=typeof window?window.jQuery:"undefined"!=typeof e?e.jQuery:null;t(function(){t("html").addClass("loaded")})}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,t,n){(function(t){!function(){"use strict";var n="undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null,o=e("raf"),i=0,r=0,a=200,s=n("html"),d=function(){var e=n(document).scrollTop(),t=n(document).height();Math.abs(r-e)>0&&(e>r?s.removeClass("scrolling-up scrolling-up-far").addClass("scrolling-down has-scrolled-down"):s.removeClass("scrolling-down scrolling-down-far").addClass("scrolling-up has-scrolled-up"),r=e),Math.abs(i-e)>a&&(e>i?s.removeClass("scrolling-up-far").addClass("scrolling-down-far has-scrolled-down-far"):s.removeClass("scrolling-down-far").addClass("scrolling-up-far has-scrolled-up-far"),i=e),e>t/2?s.addClass("scrolling-down-halfway"):s.removeClass("scrolling-down-halfway"),e?s.addClass("has-scrolled").removeClass("at-top"):s.addClass("at-top").removeClass("has-scrolled scrolling-down has-scrolled-down scrolling-down-far has-scrolled-down-far scrolling-up has-scrolled-up scrolling-up-far has-scrolled-up-far"),o(d)};d()}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{raf:2}],9:[function(e,t,n){(function(e){!function(){"use strict";var t="undefined"!=typeof window?window.jQuery:"undefined"!=typeof e?e.jQuery:null;t.fn.smoothScroll=function(e){var n=t.extend({offset:{top:0}},e);return this.on("click",function(e){e.preventDefault();var o=t(this),i=o.attr("href"),r=i.substr(i.indexOf("#")),a=t(r);if(a.length){var s=a.offset().top-n.offset.top;t(document.documentElement).animate({scrollTop:s+"px"},400),t(document.body).animate({scrollTop:s+"px"},400),window.history.pushState&&window.history.pushState("",document.title,window.location.pathname+window.location.search+i)}})},t('a[href="#contact"]').smoothScroll({offset:{top:t(window).width()>799?52:0}})}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(e,t,n){(function(t){!function(){"use strict";var n="undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null,o=e("stickyfill")(),i=function(){var e=n(window).width();o.kill(),n(".sticky").each(function(){o.add(this)}),e>759&&n(".sticky--bp-medium").each(function(){o.add(this)}),o.init()};i(),n(window).on("resize",function(){i()})}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{stickyfill:3}],11:[function(e,t,n){!function(){"use strict";var e={canvas:!1,ctx:!1,dim:!1,init:function(e){this.canvas=document.createElement("canvas");for(var t=!1,n=0;n<e.children.length;n++)if("IMG"==e.children[n].tagName.toUpperCase()){e.insertBefore(this.canvas,e.children[n].nextSibling),t=!0;break}t||e.insertBefore(this.canvas,e.childNodes[0]),this.dim=this.canvas.getBoundingClientRect(),this.ctx=this.canvas.getContext("2d"),this.canvas.width=this.dim.width,this.canvas.height=this.dim.height,this.physics()},physics:function(){var e=Box2D.Dynamics.b2World,t=Box2D.Dynamics.b2DebugDraw,n=Box2D.Common.Math.b2Vec2,o=Box2D.Dynamics.b2Body,i=Box2D.Dynamics.b2BodyDef,r=(Box2D.Dynamics.b2Fixture,Box2D.Dynamics.b2FixtureDef),a=Box2D.Collision.Shapes.b2PolygonShape,s=Box2D.Collision.Shapes.b2CircleShape,d=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame,l=25,c=30,f=this.dim.width,u=this.dim.height,h=new e(new n(0,l),!0),p=new t;p.SetSprite(this.ctx),p.SetDrawScale(30),p.SetFillAlpha(.3),p.SetLineThickness(1),p.SetFlags(t.e_shapeBit|t.e_jointBit),h.SetDebugDraw(p);var m=function(e,t,n,a,s){var d=new i,l=new r;d.type="undefined"!=typeof s?s:o.b2_dynamicBody,d.position.x=e,d.position.y=t,l.shape=a,l.density=4,l.friction=.5,l.restitution=.1;var c=h.CreateBody(d),f=c.CreateFixture(l);return n&&c.SetAngularVelocity(n),{bodyDef:d,fixtureDef:l,body:c,fixture:f}},g=function(e,t,n,o,i,r){var s=new a;return s.SetAsBox(n,o),m(e,t,i,s,r)},w=function(e,t,n,o,i){return m(e,t,o,new s(n),i)},v=(g(0,u/c+1,f/c*3,1,0,o.b2_staticBody),u/c),y=function(e,t,n,i){for(var e=e||5,t=t||1,r=[],a=0;e>a;a++)for(var s=0;e-a>s;s++){var d=s*t+a*(t/2)+n,l=-(a*t-i);r.push(g(d,l,t/2,t/2,0,o.b2_dynamicBody))}return r};if(Math.round(Math.random())){var b=10,x=1,C=(y(b,x,f/c/2+x/2-x*b/2,v-1),[]);setInterval(function(){var e=Math.round(Math.random())?-5:f/c+5,t=w(e,Math.random()*(v/2)+v/2,1,0,o.b2_dynamicBody);C.push(t),e>0?t.body.ApplyImpulse(new n(-3e3,0),t.body.GetWorldCenter()):t.body.ApplyImpulse(new n(3e3,0),t.body.GetWorldCenter())},5e3)}else{var D=[],T=1.5,L=1.5;D.push(g(f/c/2+(4*Math.random()-2),-10,Math.random()*T+.5,Math.random()*L+.5,20*Math.random()-10)),setInterval(function(){2==Math.round(2*Math.random())?D.push(w(f/c/2+(4*Math.random()-2),-5,Math.random()*T+.5,20*Math.random()-10)):D.push(g(f/c/2+(4*Math.random()-2),-5,Math.random()*T+.5,Math.random()*L+.5,20*Math.random()-10))},5e3)}var k=function(){h.Step(1/60,3,3),h.DrawDebugData(),h.ClearForces(),d(k)};d(k)},waves:function(){var e=this,t=e.dim.height/20,n=e.dim.height-2*t,o=-1,i=(new Date).getTime(),r=0,a=0;e.ctx.lineWidth=1;var s=function(){r=((new Date).getTime()-i)/1e3,i=(new Date).getTime(),n+=1*r*o,a+=100*r,0+t>n?o=1:n>e.dim.height-t&&(o=-1),e.ctx.clearRect(0,0,e.dim.width,e.dim.height),e.ctx.moveTo(0,e.dim.height/2+n);for(var d=0;d<e.dim.width;d++){var l=t*(Math.sin((a+d)*Math.PI/180)*((Math.sin(1.5*d*Math.PI/180)+1)/1.5));l+=n,e.ctx.beginPath(),e.ctx.moveTo(d,l),e.ctx.strokeStyle="rgba(0, 70, 90, 1)",e.ctx.lineTo(d,l+e.ctx.lineWidth),e.ctx.closePath(),e.ctx.stroke(),e.ctx.beginPath(),e.ctx.moveTo(d,l+e.ctx.lineWidth),e.ctx.strokeStyle="rgba(0, 35, 45, .4)",e.ctx.lineTo(d,e.dim.height),e.ctx.closePath(),e.ctx.stroke()}var c=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame;c(s)},d=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame;d(s)}},t=document.createElement("script");t.src="/wp-content/themes/alcom/src/js/lib/Box2dWeb-2.1.a.3.min.js",document.body.appendChild(t),t.addEventListener("load",function(){var t=document.querySelector("#post header")||document.querySelector("#project header")||document.querySelector("#four-o-four header")||document.querySelector("#posts-intro");if(t){for(var n=0;n<t.children.length;n++)if("IMG"==t.children[n].tagName.toUpperCase()){t=!1;break}t&&window.innerWidth>800&&e.init(t)}})}()},{}],12:[function(e,t,n){function o(){c&&s&&(c=!1,s.length?l=s.concat(l):f=-1,l.length&&i())}function i(){if(!c){var e=setTimeout(o);c=!0;for(var t=l.length;t;){for(s=l,l=[];++f<t;)s&&s[f].run();f=-1,t=l.length}s=null,c=!1,clearTimeout(e)}}function r(e,t){this.fun=e,this.array=t}function a(){}var s,d=t.exports={},l=[],c=!1,f=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new r(e,t)),1!==l.length||c||setTimeout(i,0)},r.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=a,d.addListener=a,d.once=a,d.off=a,d.removeListener=a,d.removeAllListeners=a,d.emit=a,d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},{}]},{},[4,5,6,7,8,9,10,11]);
//# sourceMappingURL=all.js.map
