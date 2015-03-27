App={init:function(){this.initModules()},initModules:function(){for(var module in this.modules){var id=module.replace(/([A-Z])/g,'-$1').toLowerCase();id=id.substring(0,1)=='-'?id.substring(1):id;var mod=document.getElementById(id);if(mod&&typeof(this.modules[module].init)=='function'){this.modules[module].init(mod)}}},modules:[]};var AjaxForms={init:function(selector){var selector=selector||'form.ajax';var forms=document.querySelectorAll(selector);for(var i=0;i<forms.length;i++){this.ajaxForm(forms[i])}},ajaxForm:function(form){var self=this;form.addEventListener('submit',function(e){var form=this;e.preventDefault();form.classList.remove('error');form.classList.remove('success');form.classList.add('loading');var oldMessage=form.parentNode.querySelector('p.message');if(oldMessage){oldMessage.parentNode.removeChild(oldMessage)}var errorMessages=form.querySelectorAll('strong.error');for(var i=0;i<errorMessages.length;i++){errorMessages[i].parentNode.removeChild(errorMessages[i])}var captcha=document.querySelector('div.captcha');if(captcha&&typeof(grecaptcha)!='undefined'){if(!grecaptcha.getResponse(captcha.getAttribute('data-captcha-widget-id'))){var errorMsg=document.createElement('strong');errorMsg.classList.add('error');errorMsg.innerHTML='Please verify that you are human';captcha.parentNode.appendChild(errorMsg);return}}SimpleAjax.xhr({method:form.method,url:form.action,data:self.serialize(form),callback:function(data){var data=JSON.parse(data);form.classList.remove('loading');if(data.success){form.classList.add('success');form.reset()}else{form.classList.add('error')}if(captcha&&typeof(grecaptcha)!='undefined'){grecaptcha.reset(captcha.getAttribute('data-captcha-widget-id'))}if(data.msg&&data.msg.length){var newMessage=document.createElement('p');newMessage.classList.add('message');newMessage.classList.add((data.success?'success':'error'));newMessage.innerHTML='<strong>'+data.msg+'</strong>';form.parentNode.insertBefore(newMessage,form)}if(data.errors){for(var fieldName in data.errors){var strong=document.createElement('strong');var field=fieldName=='captcha'?form.querySelector('div.captcha'):form.querySelector('[name="'+fieldName+'"]');strong.classList.add('error');strong.innerHTML=data.errors[fieldName];if(field){field.parentNode.insertBefore(strong,field.nextSibling)}}}}})})},serialize:function(form){if(!form||form.nodeName!=="FORM"){return}var i,j,q=[];for(i=form.elements.length-1;i>=0;i=i-1){if(form.elements[i].name===""){continue}switch(form.elements[i].nodeName){case'INPUT':switch(form.elements[i].type){case'text':case'hidden':case'password':case'search':case'email':case'url':case'tel':case'number':case'date':case'month':case'week':case'time':case'datetime':case'datetime-local':case'color':case'button':case'reset':case'submit':q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case'checkbox':case'radio':if(form.elements[i].checked){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value))}break;case'file':break}break;case'TEXTAREA':q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case'SELECT':switch(form.elements[i].type){case'select-one':q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case'select-multiple':for(j=form.elements[i].options.length-1;j>=0;j=j-1){if(form.elements[i].options[j].selected){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].options[j].value))}}break}break;case'BUTTON':switch(form.elements[i].type){case'reset':case'submit':case'button':q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break}break}}return q.join("&")}};var Captchas=function(){var captchas=document.querySelectorAll('div.captcha');for(var i=0;i<captchas.length;i++){var widgetID=grecaptcha.render(captchas[i],{sitekey:'6Ld0FQQTAAAAADAb-WQKUveGUHFP6IAYjuIWthBv'});captchas[i].setAttribute('data-captcha-widget-id',widgetID)}};var HoverExpand={init:function(){var codes=document.querySelectorAll('pre code');for(var i=0;i<codes.length;i++){codes[i].parentNode.style.width=(codes[i].offsetWidth+25)+'px';codes[i].parentNode.classList.add('hover-expand');codes[i].parentNode.classList.add('prettyprint')}}};var ImageZoom={init:function(wrap,duration){var wrap=wrap||document.body;var duration=duration||'.1s';var getWinSize=function(){var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;return{width:x,height:y}};var isIMGLink=function(el){return el&&el.tagName&&el.tagName.toUpperCase()=='A'&&el.href&&el.href.match(/\.(png|gif|jpg|jpeg)$/)};wrap.addEventListener('click',function(e){var clicked=e.target;if(!isIMGLink(clicked)){var child=clicked;while(child.parentNode){if(isIMGLink(child.parentNode)){clicked=child.parentNode;break}child=child.parentNode}}if(!isIMGLink(clicked)){return}e.preventDefault();var link=clicked;var img=link.getElementsByTagName('img');img=img.length?img[0]:link;var targetIMG=document.createElement('img');targetIMG.src=link.getAttribute('href');var targetIMGSize={};var imgSize={};document.body.appendChild(targetIMG);targetIMG.style.position='absolute';targetIMG.style.zIndex='99';targetIMG.style.maxHeight='90%';targetIMG.style.maxWidth='90%';targetIMG.style.transition='all '+duration+' ease-out';var positionOnTop=function(){targetIMG.style.display='block';targetIMG.style.left=imgSize.left+'px';targetIMG.style.top=document.body.scrollTop+imgSize.top+'px';targetIMG.style.width=imgSize.width+'px';targetIMG.style.height=imgSize.height+'px';targetIMG.style.boxShadow='0 0 0 rgba(0, 0, 0, .4)'};var positionCenter=function(){var winSize=getWinSize();var newTargetIMGSize={width:targetIMGSize.width,height:targetIMGSize.height};targetIMG.style.display='block';targetIMG.style.left=(winSize.width-newTargetIMGSize.width)/2+'px';targetIMG.style.top=document.body.scrollTop+(winSize.height-newTargetIMGSize.height)/2+'px';targetIMG.style.width=newTargetIMGSize.width+'px';targetIMG.style.height=newTargetIMGSize.height+'px';targetIMG.style.boxShadow='0 0 60px rgba(0, 0, 0, .4)'};var goOn=function(){imgSize=img.getBoundingClientRect();targetIMGSize=targetIMG.getBoundingClientRect();positionOnTop();img.style.visibility='hidden';setTimeout(function(){positionCenter()},50)};if(targetIMG.complete){goOn()}else{targetIMG.addEventListener('load',function(){goOn()})}targetIMG.addEventListener('click',function(){positionOnTop();setTimeout(function(){img.style.visibility='visible';targetIMG.style.display='none'},50)})})}};if(typeof(jQuery)!='undefined'){jQuery.fn.imageZoom=function(delay){return this.each(function(){ImageZoom.init(this,delay)})}}var InputRangeUtils={init:function(){this.values();this.colors()},values:function(){var inputs=document.querySelectorAll('input[type=range]');for(var i=0;i<inputs.length;i++){(function(){var input=inputs[i];var label=document.querySelector('label[for="'+input.id+'"]');var prefix=input.getAttribute('data-value-prefix')?input.getAttribute('data-value-prefix'):'';var suffix=input.getAttribute('data-value-suffix')?input.getAttribute('data-value-suffix'):'';var minTxt=input.getAttribute('data-min-text')?input.getAttribute('data-min-text'):false;var maxTxt=input.getAttribute('data-max-text')?input.getAttribute('data-max-text'):false;var value=document.createElement('span');value.classList.add('value');label.appendChild(value);var updateValue=function(){var niceVal=typeof(number_format)=='undefined'?input.value:number_format(input.value,0,',',' ');niceVal=prefix+niceVal+suffix;niceVal=(input.value==input.getAttribute('max')&&maxTxt)?maxTxt:niceVal;niceVal=(input.value==input.getAttribute('min')&&minTxt)?minTxt:niceVal;value.innerHTML=niceVal};updateValue();input.addEventListener('input',updateValue);input.addEventListener('change',updateValue)})()}},colors:function(leftColor,rightColor){var leftColor=leftColor||'#06c';var rightColor=rightColor||'#888';var inputs=document.querySelectorAll('input[type=range]');for(var i=0;i<inputs.length;i++){(function(){var input=inputs[i];var updateColor=function(){var val=(input.value-input.getAttribute('min'))/(input.getAttribute('max')-input.getAttribute('min'));val*=100;input.style.backgroundImage='linear-gradient(90deg, '+leftColor+' 0%, '+leftColor+' '+val+'%, '+rightColor+' '+val+'%, '+rightColor+' 100%)'};updateColor();input.addEventListener('input',updateColor);input.addEventListener('change',updateColor)})()}}};var LiveFilter={init:function(tags,items){var self=this;for(var i=0;i<tags.length;i++){tags[i].addEventListener('click',function(e){e.preventDefault();this.classList.toggle('active');self.update(tags,items)})}},update:function(tags,items){var selectedTags=[];for(var i=0;i<tags.length;i++){if(tags[i].classList.contains('active')){selectedTags.push(tags[i].innerHTML)}}for(var i=0;i<items.length;i++){var hidden=false;for(var j=0;j<selectedTags.length;j++){if(!items[i].classList.contains(selectedTags[j].trim())){hidden=true}}if(hidden){items[i].classList.add('hidden')}else{items[i].classList.remove('hidden')}}}};var LiveSearch={init:function(input,url,appendTo){var appendTo=appendTo||'after';input.setAttribute('autocomplete','off');var container=document.createElement('div');container.id='live-search-'+input.name;container.classList.add('live-search');if(appendTo=='after'){input.parentNode.classList.add('live-search-wrap');input.parentNode.insertBefore(container,input.nextSibling)}else{appendTo.appendChild(container)}input.addEventListener('keyup',function(e){if(this.value!=this.liveSearchLastValue){this.classList.add('loading');var q=this.value;if(this.liveSearchTimer){clearTimeout(this.liveSearchTimer)}this.liveSearchTimer=setTimeout(function(){if(q){SimpleAjax.xhr({method:'get',url:url+q,callback:function(data){container.innerHTML=data}})}else{container.innerHTML=''}},300);this.liveSearchLastValue=this.value}})}};if(typeof(jQuery)!='undefined'){jQuery.fn.liveSearch=function(url,appendTo){return this.each(function(){LiveSearch.init(this,url,appendTo)})}}function number_format(number,decimals,dec_point,thousands_sep){number=(number+'').replace(/[^0-9+\-Ee.]/g,'');var n=!isFinite(+number)?0:+number,prec=!isFinite(+decimals)?0:Math.abs(decimals),sep=(typeof thousands_sep==='undefined')?',':thousands_sep,dec=(typeof dec_point==='undefined')?'.':dec_point,s='',toFixedFix=function(n,prec){var k=Math.pow(10,prec);return''+(Math.round(n*k)/k).toFixed(prec)};s=(prec?toFixedFix(n,prec):''+Math.round(n)).split('.');if(s[0].length>3){s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep)}if((s[1]||'').length<prec){s[1]=s[1]||'';s[1]+=new Array(prec-s[1].length+1).join('0')}return s.join(dec)}var ScrollClasses={init:function(){var lastST=0;var lastSTns=0;var sensitivity=100;window.addEventListener('scroll',function(e){var st=document.body.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop;if(st){document.body.classList.add('has-scrolled')}else{document.body.classList.remove('has-scrolled')}if(Math.abs(lastST-st)>sensitivity){if(st>lastST){document.body.classList.remove('scrolling-up-far');document.body.classList.add('scrolling-down-far')}else{document.body.classList.remove('scrolling-down-far');document.body.classList.add('scrolling-up-far')}lastST=st}if(Math.abs(lastSTns-st)>0){if(st>lastSTns){document.body.classList.remove('scrolling-up');document.body.classList.remove('scrolling-up-far');document.body.classList.add('scrolling-down')}else{document.body.classList.remove('scrolling-down');document.body.classList.remove('scrolling-down-far');document.body.classList.add('scrolling-up')}lastSTns=st}})}};var SimpleAjax={xhr:function(conf,updateID){var config={method:conf.method||'get',url:conf.url,data:conf.data||'',callback:conf.callback||function(data){if(updateID){document.getElementById(updateID).innerHTML=data}}};var xhr=new XMLHttpRequest();var onReadyStateChange=function(){if(xhr.readyState==4){config.callback(xhr.responseText)}};if(config.method.toUpperCase()=='POST'){xhr.open('POST',config.url,true);xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');xhr.onreadystatechange=onReadyStateChange;xhr.send(config.data)}else{xhr.open('GET',config.url+(config.data?'?'+config.data:''),true);xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');xhr.onreadystatechange=onReadyStateChange;xhr.send(null)}}};var SmoothScrolling={init:function(offset){var offset=offset||0;var root=/firefox|trident/i.test(navigator.userAgent)?document.documentElement:document.body;var easeInOutCubic=function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b};document.body.addEventListener('click',function(e){var clicked=e.target;var href=clicked.tagName.toUpperCase()=='A'?clicked.getAttribute('href'):false;if(!href){return}var targetID=href.match(/#(.*?)$/);if(!(targetID&&targetID[1]&&targetID[1].length)){return}targetID=targetID[1];var startTime;var startPos=root.scrollTop;var endPos=document.getElementById(targetID).getBoundingClientRect().top;endPos-=offset;var maxScroll=root.scrollHeight-window.innerHeight;var scrollEndValue=startPos+endPos<maxScroll?endPos:maxScroll-startPos;var duration=900;var scroll=function(timestamp){startTime=startTime||timestamp;var elapsed=timestamp-startTime;var progress=easeInOutCubic(elapsed,startPos,scrollEndValue,duration);root.scrollTop=progress;elapsed<duration&&requestAnimationFrame(scroll)};requestAnimationFrame(scroll);e.preventDefault()})}};App.modules.SocialMediaButtons={init:function(mod){var path=window.location.pathname;var countURL=window.location.origin+path;var twitterHTML='<a href="https://twitter.com/share?via=conversionista&count=vertical&lang=en" class="twitter-share-button" data-counturl="'+countURL+'" data-url="'+countURL+'">Tweet</a>';var facebookHTML='<div class="fb-like" data-href="'+countURL+'" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>';var googlePlusHTML='<div class="g-plusone" data-size="tall" data-annotation="bubble" data-href='+countURL+'></div>';mod.innerHTML=twitterHTML+facebookHTML+googlePlusHTML;window.twttr=(function(d,s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,"script","twitter-wjs"));(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=624972374235609&version=v2.0";fjs.parentNode.insertBefore(js,fjs)}(document,'script','facebook-jssdk'));(function(){var po=document.createElement('script');po.type='text/javascript';po.async=true;po.src='https://apis.google.com/js/platform.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(po,s)})()}};var CanvasLogo={init:function(selector){var selector=selector||'canvas.al-logo';var color='#fc3';var canvass=document.querySelectorAll(selector);for(var i=0;i<canvass.length;i++){(function(){var canvas=canvass[i];var ctx=canvas.getContext('2d');var width=canvas.width;var height=canvas.height;var thickness=Math.round(width/15);var startX=thickness/2;var startY=height;var endX=startX+width*.5;var endY=startY-height*.2;var peakX=startX+width*.25;var peakY=0;ctx.lineWidth=thickness;ctx.strokeStyle=color;ctx.beginPath();ctx.moveTo(startX,startY);ctx.quadraticCurveTo(peakX,peakY,endX,endY);ctx.stroke();ctx.quadraticCurveTo(startX+width*.5+width*.1,startY-height*.1,width,startY);ctx.stroke()})()}}};App.modules.FeaturedPortfolio={init:function(mod){var items=mod.getElementsByTagName('article');var i=0;var num=items.length;var zIndex=1;items[i].classList.add('active');mod.classList.add('loaded');var gotoNext=function(){var prev=i;i=(i+1==num?0:i+1);items[i].style.zIndex=++zIndex;items[i].classList.add('active');setTimeout(function(){items[prev].classList.remove('active')},1000)};var button=document.createElement('a');button.innerHTML='Next';button.href='#';button.classList.add('next');mod.appendChild(button);button.addEventListener('click',function(e){e.preventDefault();gotoNext()})}};App.modules.Header={init:function(mod){ScrollClasses.init();AjaxForms.init('form.ajax');ImageZoom.init(document.body);InputRangeUtils.values();InputRangeUtils.colors();SmoothScrolling.init((window.innerWidth<800?0:50));HoverExpand.init()},wrapMenu:function(mod){var as=mod.querySelectorAll('div.widget_nav_menu a');for(var i=0;i<as.length;i++){as[i].innerHTML='<span>'+as[i].innerHTML+'</span>'}},clickableLIs:function(mod){var lis=mod.querySelectorAll('div.widget_nav_menu li');for(var i=0;i<lis.length;i++){lis[i].addEventListener('click',function(){this.getElementsByTagName('a')[0].click()})}}};App.modules.Portfolios={init:function(mod){if(document.getElementById('posts-intro')){LiveFilter.init(document.getElementById('posts-intro').getElementsByTagName('ul')[0].getElementsByTagName('a'),mod.getElementsByTagName('article'))}}};App.modules.Projects={init:function(mod){if(document.getElementById('posts-intro')){LiveFilter.init(document.getElementById('posts-intro').getElementsByTagName('ul')[0].getElementsByTagName('a'),mod.getElementsByTagName('article'))}}};