App={init:function(){this.initPlugins();this.initModules()},initPlugins:function(){for(var plugin in this.plugins){if(typeof(this.plugins[plugin].init)=='function'){this.plugins[plugin].init()}}},initModules:function(){for(var module in this.modules){var id=module.replace(/([A-Z])/g,'-$1').toLowerCase();id=id.substring(0,1)=='-'?id.substring(1):id;var mod=document.getElementById(id);if(mod&&typeof(this.modules[module].init)=='function'){this.modules[module].init(mod)}}},modules:[],plugins:[]};function number_format(number,decimals,dec_point,thousands_sep){number=(number+'').replace(/[^0-9+\-Ee.]/g,'');var n=!isFinite(+number)?0:+number,prec=!isFinite(+decimals)?0:Math.abs(decimals),sep=(typeof thousands_sep==='undefined')?',':thousands_sep,dec=(typeof dec_point==='undefined')?'.':dec_point,s='',toFixedFix=function(n,prec){var k=Math.pow(10,prec);return''+(Math.round(n*k)/k).toFixed(prec)};s=(prec?toFixedFix(n,prec):''+Math.round(n)).split('.');if(s[0].length>3){s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep)}if((s[1]||'').length<prec){s[1]=s[1]||'';s[1]+=new Array(prec-s[1].length+1).join('0')}return s.join(dec)}App.plugins.AddScrollClasses={init:function(){var lastST=0;var sensitivity=100;window.addEventListener('scroll',function(e){var st=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop;if(st){document.body.classList.add('has-scrolled')}else{document.body.classList.remove('has-scrolled')}if(Math.abs(lastST-st)>sensitivity){if(st>lastST){document.body.classList.remove('scrolling-up');document.body.classList.add('scrolling-down')}else{document.body.classList.remove('scrolling-down');document.body.classList.add('scrolling-up')}lastST=st}})}};App.plugins.InPageLinkScroll={offset:0,init:function(){var root=/firefox|trident/i.test(navigator.userAgent)?document.documentElement:document.body;var easeInOutCubic=function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b};document.body.addEventListener('click',function(e){var clicked=e.target;var href=clicked.tagName.toUpperCase()=='A'?clicked.getAttribute('href'):false;if(!href){return}var targetID=href.match(/#(.*?)$/);if(!(targetID[1]&&targetID[1].length)){return}targetID=targetID[1];var startTime;var startPos=root.scrollTop;var endPos=document.getElementById(targetID).getBoundingClientRect().top;endPos-=App.plugins.InPageLinkScroll.offset;var maxScroll=root.scrollHeight-window.innerHeight;var scrollEndValue=startPos+endPos<maxScroll?endPos:maxScroll-startPos;var duration=900;var scroll=function(timestamp){startTime=startTime||timestamp;var elapsed=timestamp-startTime;var progress=easeInOutCubic(elapsed,startPos,scrollEndValue,duration);root.scrollTop=progress;elapsed<duration&&requestAnimationFrame(scroll)};requestAnimationFrame(scroll);e.preventDefault()})}};App.plugins.InputRangeUtils={rangeLeftColor:'#06c',rangeRightColor:'#888',init:function(){this.values();this.colors()},values:function(){var inputs=document.querySelectorAll('input[type=range]');for(var i=0;i<inputs.length;i++){(function(){var input=inputs[i];var label=document.querySelector('label[for="'+input.id+'"]');var prefix=input.getAttribute('data-value-prefix')?input.getAttribute('data-value-prefix'):'';var suffix=input.getAttribute('data-value-suffix')?input.getAttribute('data-value-suffix'):'';var value=document.createElement('span');value.classList.add('value');label.appendChild(value);var updateValue=function(){var niceVal=typeof(number_format)=='undefined'?input.value:number_format(input.value,0,',',' ');value.innerHTML=prefix+niceVal+suffix};updateValue();input.addEventListener('input',updateValue);input.addEventListener('change',updateValue)})()}},colors:function(){var self=this;var inputs=document.querySelectorAll('input[type=range]');for(var i=0;i<inputs.length;i++){(function(){var input=inputs[i];var updateColor=function(){var val=(input.value-input.getAttribute('min'))/(input.getAttribute('max')-input.getAttribute('min'));val*=100;input.style.backgroundImage='linear-gradient(90deg, '+self.rangeLeftColor+' 0%, '+self.rangeLeftColor+' '+val+'%, '+self.rangeRightColor+' '+val+'%, '+self.rangeRightColor+' 100%)'};updateColor();input.addEventListener('input',updateColor);input.addEventListener('change',updateColor)})()}}};App.plugins.CanvasLogo={init:function(){var color='#fc3';var canvass=document.querySelectorAll('canvas.al-logo');for(var i=0;i<canvass.length;i++){(function(){var canvas=canvass[i];var ctx=canvas.getContext('2d');var width=canvas.width;var height=canvas.height;var thickness=Math.round(width/15);var startX=thickness/2;var startY=height;var endX=startX+width*.5;var endY=startY-height*.2;var peakX=startX+width*.25;var peakY=0;ctx.lineWidth=thickness;ctx.strokeStyle=color;ctx.beginPath();ctx.moveTo(startX,startY);ctx.quadraticCurveTo(peakX,peakY,endX,endY);ctx.stroke();ctx.quadraticCurveTo(startX+width*.5+width*.1,startY-height*.1,width,startY);ctx.stroke()})()}}};App.modules.FeaturedPortfolio={init:function(){var mod=document.getElementById('featured-portfolio');var items=mod.getElementsByTagName('article');var i=0;var num=items.length;var zIndex=1;items[i].classList.add('active');mod.classList.add('loaded');var gotoNext=function(){var prev=i;i=(i+1==num?0:i+1);items[i].style.zIndex=++zIndex;items[i].classList.add('active');setTimeout(function(){items[prev].classList.remove('active')},1000)};var button=document.createElement('a');button.innerHTML='Next';button.href='#';button.classList.add('next');mod.appendChild(button);button.addEventListener('click',function(e){e.preventDefault();gotoNext()})}};App.modules.Header={init:function(){var lis=document.getElementById('header').querySelectorAll('div.widget_nav_menu li');for(var i=0;i<lis.length;i++){lis[i].addEventListener('click',function(){this.getElementsByTagName('a')[0].click()})}}};App.plugins.InPageLinkScroll.offset=window.innerWidth<800?0:50;