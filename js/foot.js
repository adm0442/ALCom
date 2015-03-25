App={init:function(){this.initPlugins();this.initModules()},initPlugins:function(){for(var plugin in this.plugins){if(typeof(this.plugins[plugin].init)=='function'){this.plugins[plugin].init()}}},initModules:function(){for(var module in this.modules){var id=module.replace(/([A-Z])/g,'-$1').toLowerCase();id=id.substring(0,1)=='-'?id.substring(1):id;var mod=document.getElementById(id);if(mod&&typeof(this.modules[module].init)=='function'){this.modules[module].init(mod)}}},modules:[],plugins:[]};var imageZoom=function(wrap,duration){var wrap=wrap||document.body;var duration=duration||'.1s';var getWinSize=function(){var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;return{width:x,height:y}};var isIMGLink=function(el){return el&&el.tagName&&el.tagName.toUpperCase()=='A'&&el.href&&el.href.match(/\.(png|gif|jpg|jpeg)$/)};wrap.addEventListener('click',function(e){var clicked=e.target;if(!isIMGLink(clicked)){var child=clicked;while(child.parentNode){if(isIMGLink(child.parentNode)){clicked=child.parentNode;break}child=child.parentNode}}if(!isIMGLink(clicked)){return}e.preventDefault();var link=clicked;var img=link.getElementsByTagName('img');img=img.length?img[0]:link;var targetIMG=document.createElement('img');targetIMG.src=link.getAttribute('href');var targetIMGSize={};var imgSize={};document.body.appendChild(targetIMG);targetIMG.style.position='absolute';targetIMG.style.zIndex='99';targetIMG.style.maxHeight='90%';targetIMG.style.maxWidth='90%';targetIMG.style.transition='all '+duration+' ease-out';var positionOnTop=function(){targetIMG.style.display='block';targetIMG.style.left=imgSize.left+'px';targetIMG.style.top=document.body.scrollTop+imgSize.top+'px';targetIMG.style.width=imgSize.width+'px';targetIMG.style.height=imgSize.height+'px';targetIMG.style.boxShadow='0 0 0 rgba(0, 0, 0, .4)'};var positionCenter=function(){var winSize=getWinSize();var newTargetIMGSize={width:targetIMGSize.width,height:targetIMGSize.height};targetIMG.style.display='block';targetIMG.style.left=(winSize.width-newTargetIMGSize.width)/2+'px';targetIMG.style.top=document.body.scrollTop+(winSize.height-newTargetIMGSize.height)/2+'px';targetIMG.style.width=newTargetIMGSize.width+'px';targetIMG.style.height=newTargetIMGSize.height+'px';targetIMG.style.boxShadow='0 0 60px rgba(0, 0, 0, .4)'};var goOn=function(){imgSize=img.getBoundingClientRect();targetIMGSize=targetIMG.getBoundingClientRect();positionOnTop();img.style.visibility='hidden';setTimeout(function(){positionCenter()},50)};if(targetIMG.complete){goOn()}else{targetIMG.addEventListener('load',function(){goOn()})}targetIMG.addEventListener('click',function(){positionOnTop();setTimeout(function(){img.style.visibility='visible';targetIMG.style.display='none'},50)})})};if(typeof(jQuery)!='undefined'){jQuery.fn.imageZoom=function(delay){return this.each(function(){imageZoom(this,delay)})}}function number_format(number,decimals,dec_point,thousands_sep){number=(number+'').replace(/[^0-9+\-Ee.]/g,'');var n=!isFinite(+number)?0:+number,prec=!isFinite(+decimals)?0:Math.abs(decimals),sep=(typeof thousands_sep==='undefined')?',':thousands_sep,dec=(typeof dec_point==='undefined')?'.':dec_point,s='',toFixedFix=function(n,prec){var k=Math.pow(10,prec);return''+(Math.round(n*k)/k).toFixed(prec)};s=(prec?toFixedFix(n,prec):''+Math.round(n)).split('.');if(s[0].length>3){s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep)}if((s[1]||'').length<prec){s[1]=s[1]||'';s[1]+=new Array(prec-s[1].length+1).join('0')}return s.join(dec)}App.plugins.AddScrollClasses={init:function(){var lastST=0;var lastSTns=0;var sensitivity=100;window.addEventListener('scroll',function(e){var st=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop;if(st){document.body.classList.add('has-scrolled')}else{document.body.classList.remove('has-scrolled')}if(Math.abs(lastST-st)>sensitivity){if(st>lastST){document.body.classList.remove('scrolling-up-far');document.body.classList.add('scrolling-down-far')}else{document.body.classList.remove('scrolling-down-far');document.body.classList.add('scrolling-up-far')}lastST=st}if(Math.abs(lastSTns-st)>0){if(st>lastSTns){document.body.classList.remove('scrolling-up');document.body.classList.remove('scrolling-up-far');document.body.classList.add('scrolling-down')}else{document.body.classList.remove('scrolling-down');document.body.classList.remove('scrolling-down-far');document.body.classList.add('scrolling-up')}lastSTns=st}})}};App.plugins.InPageLinkScroll={offset:0,init:function(){var root=/firefox|trident/i.test(navigator.userAgent)?document.documentElement:document.body;var easeInOutCubic=function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b};document.body.addEventListener('click',function(e){var clicked=e.target;var href=clicked.tagName.toUpperCase()=='A'?clicked.getAttribute('href'):false;if(!href){return}var targetID=href.match(/#(.*?)$/);if(!(targetID&&targetID[1]&&targetID[1].length)){return}targetID=targetID[1];var startTime;var startPos=root.scrollTop;var endPos=document.getElementById(targetID).getBoundingClientRect().top;endPos-=App.plugins.InPageLinkScroll.offset;var maxScroll=root.scrollHeight-window.innerHeight;var scrollEndValue=startPos+endPos<maxScroll?endPos:maxScroll-startPos;var duration=900;var scroll=function(timestamp){startTime=startTime||timestamp;var elapsed=timestamp-startTime;var progress=easeInOutCubic(elapsed,startPos,scrollEndValue,duration);root.scrollTop=progress;elapsed<duration&&requestAnimationFrame(scroll)};requestAnimationFrame(scroll);e.preventDefault()})}};App.plugins.InputRangeUtils={rangeLeftColor:'#06c',rangeRightColor:'#888',init:function(){this.values();this.colors()},values:function(){var inputs=document.querySelectorAll('input[type=range]');for(var i=0;i<inputs.length;i++){(function(){var input=inputs[i];var label=document.querySelector('label[for="'+input.id+'"]');var prefix=input.getAttribute('data-value-prefix')?input.getAttribute('data-value-prefix'):'';var suffix=input.getAttribute('data-value-suffix')?input.getAttribute('data-value-suffix'):'';var value=document.createElement('span');value.classList.add('value');label.appendChild(value);var updateValue=function(){var niceVal=typeof(number_format)=='undefined'?input.value:number_format(input.value,0,',',' ');value.innerHTML=prefix+niceVal+suffix};updateValue();input.addEventListener('input',updateValue);input.addEventListener('change',updateValue)})()}},colors:function(){var self=this;var inputs=document.querySelectorAll('input[type=range]');for(var i=0;i<inputs.length;i++){(function(){var input=inputs[i];var updateColor=function(){var val=(input.value-input.getAttribute('min'))/(input.getAttribute('max')-input.getAttribute('min'));val*=100;input.style.backgroundImage='linear-gradient(90deg, '+self.rangeLeftColor+' 0%, '+self.rangeLeftColor+' '+val+'%, '+self.rangeRightColor+' '+val+'%, '+self.rangeRightColor+' 100%)'};updateColor();input.addEventListener('input',updateColor);input.addEventListener('change',updateColor)})()}}};var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];var shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function stackBlurImage(imageID,canvasID,radius,blurAlphaChannel){var img=typeof(imageID)=='string'?document.getElementById(imageID):imageID;var w=img.naturalWidth;var h=img.naturalHeight;var canvas=typeof(canvasID)=='string'?document.getElementById(canvasID):canvasID;canvas.style.width=w+"px";canvas.style.height=h+"px";canvas.width=w;canvas.height=h;var context=canvas.getContext("2d");context.clearRect(0,0,w,h);context.drawImage(img,0,0);if(isNaN(radius)||radius<1)return;if(blurAlphaChannel)stackBlurCanvasRGBA(canvasID,0,0,w,h,radius);else stackBlurCanvasRGB(canvasID,0,0,w,h,radius)}function stackBlurCanvasRGBA(id,top_x,top_y,width,height,radius){if(isNaN(radius)||radius<1)return;radius|=0;var canvas=typeof(id)=='string'?document.getElementById(id):id;var context=canvas.getContext("2d");var imageData;try{try{imageData=context.getImageData(top_x,top_y,width,height)}catch(e){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");imageData=context.getImageData(top_x,top_y,width,height)}catch(e){alert("Cannot access local image");throw new Error("unable to access local image data: "+e);return}}}catch(e){alert("Cannot access image");throw new Error("unable to access image data: "+e)}var pixels=imageData.data;var x,y,i,p,yp,yi,yw,r_sum,g_sum,b_sum,a_sum,r_out_sum,g_out_sum,b_out_sum,a_out_sum,r_in_sum,g_in_sum,b_in_sum,a_in_sum,pr,pg,pb,pa,rbs;var div=radius+radius+1;var w4=width<<2;var widthMinus1=width-1;var heightMinus1=height-1;var radiusPlus1=radius+1;var sumFactor=radiusPlus1*(radiusPlus1+1)/2;var stackStart=new BlurStack();var stack=stackStart;for(i=1;i<div;i++){stack=stack.next=new BlurStack();if(i==radiusPlus1)var stackEnd=stack}stack.next=stackStart;var stackIn=null;var stackOut=null;yw=yi=0;var mul_sum=mul_table[radius];var shg_sum=shg_table[radius];for(y=0;y<height;y++){r_in_sum=g_in_sum=b_in_sum=a_in_sum=r_sum=g_sum=b_sum=a_sum=0;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);a_out_sum=radiusPlus1*(pa=pixels[yi+3]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;a_sum+=sumFactor*pa;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack.a=pa;stack=stack.next}for(i=1;i<radiusPlus1;i++){p=yi+((widthMinus1<i?widthMinus1:i)<<2);r_sum+=(stack.r=(pr=pixels[p]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[p+1]))*rbs;b_sum+=(stack.b=(pb=pixels[p+2]))*rbs;a_sum+=(stack.a=(pa=pixels[p+3]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;a_in_sum+=pa;stack=stack.next}stackIn=stackStart;stackOut=stackEnd;for(x=0;x<width;x++){pixels[yi+3]=pa=(a_sum*mul_sum)>>shg_sum;if(pa!=0){pa=255/pa;pixels[yi]=((r_sum*mul_sum)>>shg_sum)*pa;pixels[yi+1]=((g_sum*mul_sum)>>shg_sum)*pa;pixels[yi+2]=((b_sum*mul_sum)>>shg_sum)*pa}else{pixels[yi]=pixels[yi+1]=pixels[yi+2]=0}r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;a_sum-=a_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;a_out_sum-=stackIn.a;p=(yw+((p=x+radius+1)<widthMinus1?p:widthMinus1))<<2;r_in_sum+=(stackIn.r=pixels[p]);g_in_sum+=(stackIn.g=pixels[p+1]);b_in_sum+=(stackIn.b=pixels[p+2]);a_in_sum+=(stackIn.a=pixels[p+3]);r_sum+=r_in_sum;g_sum+=g_in_sum;b_sum+=b_in_sum;a_sum+=a_in_sum;stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);a_out_sum+=(pa=stackOut.a);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;a_in_sum-=pa;stackOut=stackOut.next;yi+=4}yw+=width}for(x=0;x<width;x++){g_in_sum=b_in_sum=a_in_sum=r_in_sum=g_sum=b_sum=a_sum=r_sum=0;yi=x<<2;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);a_out_sum=radiusPlus1*(pa=pixels[yi+3]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;a_sum+=sumFactor*pa;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack.a=pa;stack=stack.next}yp=width;for(i=1;i<=radius;i++){yi=(yp+x)<<2;r_sum+=(stack.r=(pr=pixels[yi]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[yi+1]))*rbs;b_sum+=(stack.b=(pb=pixels[yi+2]))*rbs;a_sum+=(stack.a=(pa=pixels[yi+3]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;a_in_sum+=pa;stack=stack.next;if(i<heightMinus1){yp+=width}}yi=x;stackIn=stackStart;stackOut=stackEnd;for(y=0;y<height;y++){p=yi<<2;pixels[p+3]=pa=(a_sum*mul_sum)>>shg_sum;if(pa>0){pa=255/pa;pixels[p]=((r_sum*mul_sum)>>shg_sum)*pa;pixels[p+1]=((g_sum*mul_sum)>>shg_sum)*pa;pixels[p+2]=((b_sum*mul_sum)>>shg_sum)*pa}else{pixels[p]=pixels[p+1]=pixels[p+2]=0}r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;a_sum-=a_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;a_out_sum-=stackIn.a;p=(x+(((p=y+radiusPlus1)<heightMinus1?p:heightMinus1)*width))<<2;r_sum+=(r_in_sum+=(stackIn.r=pixels[p]));g_sum+=(g_in_sum+=(stackIn.g=pixels[p+1]));b_sum+=(b_in_sum+=(stackIn.b=pixels[p+2]));a_sum+=(a_in_sum+=(stackIn.a=pixels[p+3]));stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);a_out_sum+=(pa=stackOut.a);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;a_in_sum-=pa;stackOut=stackOut.next;yi+=width}}context.putImageData(imageData,top_x,top_y)}function stackBlurCanvasRGB(id,top_x,top_y,width,height,radius){if(isNaN(radius)||radius<1)return;radius|=0;var canvas=typeof(id)=='string'?document.getElementById(id):id;var context=canvas.getContext("2d");var imageData;try{try{imageData=context.getImageData(top_x,top_y,width,height)}catch(e){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");imageData=context.getImageData(top_x,top_y,width,height)}catch(e){alert("Cannot access local image");throw new Error("unable to access local image data: "+e);return}}}catch(e){alert("Cannot access image");throw new Error("unable to access image data: "+e)}var pixels=imageData.data;var x,y,i,p,yp,yi,yw,r_sum,g_sum,b_sum,r_out_sum,g_out_sum,b_out_sum,r_in_sum,g_in_sum,b_in_sum,pr,pg,pb,rbs;var div=radius+radius+1;var w4=width<<2;var widthMinus1=width-1;var heightMinus1=height-1;var radiusPlus1=radius+1;var sumFactor=radiusPlus1*(radiusPlus1+1)/2;var stackStart=new BlurStack();var stack=stackStart;for(i=1;i<div;i++){stack=stack.next=new BlurStack();if(i==radiusPlus1)var stackEnd=stack}stack.next=stackStart;var stackIn=null;var stackOut=null;yw=yi=0;var mul_sum=mul_table[radius];var shg_sum=shg_table[radius];for(y=0;y<height;y++){r_in_sum=g_in_sum=b_in_sum=r_sum=g_sum=b_sum=0;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}for(i=1;i<radiusPlus1;i++){p=yi+((widthMinus1<i?widthMinus1:i)<<2);r_sum+=(stack.r=(pr=pixels[p]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[p+1]))*rbs;b_sum+=(stack.b=(pb=pixels[p+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next}stackIn=stackStart;stackOut=stackEnd;for(x=0;x<width;x++){pixels[yi]=(r_sum*mul_sum)>>shg_sum;pixels[yi+1]=(g_sum*mul_sum)>>shg_sum;pixels[yi+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(yw+((p=x+radius+1)<widthMinus1?p:widthMinus1))<<2;r_in_sum+=(stackIn.r=pixels[p]);g_in_sum+=(stackIn.g=pixels[p+1]);b_in_sum+=(stackIn.b=pixels[p+2]);r_sum+=r_in_sum;g_sum+=g_in_sum;b_sum+=b_in_sum;stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=4}yw+=width}for(x=0;x<width;x++){g_in_sum=b_in_sum=r_in_sum=g_sum=b_sum=r_sum=0;yi=x<<2;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}yp=width;for(i=1;i<=radius;i++){yi=(yp+x)<<2;r_sum+=(stack.r=(pr=pixels[yi]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[yi+1]))*rbs;b_sum+=(stack.b=(pb=pixels[yi+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next;if(i<heightMinus1){yp+=width}}yi=x;stackIn=stackStart;stackOut=stackEnd;for(y=0;y<height;y++){p=yi<<2;pixels[p]=(r_sum*mul_sum)>>shg_sum;pixels[p+1]=(g_sum*mul_sum)>>shg_sum;pixels[p+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(x+(((p=y+radiusPlus1)<heightMinus1?p:heightMinus1)*width))<<2;r_sum+=(r_in_sum+=(stackIn.r=pixels[p]));g_sum+=(g_in_sum+=(stackIn.g=pixels[p+1]));b_sum+=(b_in_sum+=(stackIn.b=pixels[p+2]));stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=width}}context.putImageData(imageData,top_x,top_y)}function BlurStack(){this.r=0;this.g=0;this.b=0;this.a=0;this.next=null}App.modules.AddThis={init:function(mod){var path=window.location.pathname;var countURL=window.location.origin+path;var twitterHTML='<a href="https://twitter.com/share?via=conversionista&count=vertical&lang=en" class="twitter-share-button" data-counturl="'+countURL+'" data-url="'+countURL+'">Tweet</a>';var facebookHTML='<div class="fb-like" data-href="'+countURL+'" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>';var googlePlusHTML='<div class="g-plusone" data-size="tall" data-annotation="bubble" data-href='+countURL+'></div>';mod.innerHTML=twitterHTML+facebookHTML+googlePlusHTML;window.twttr=(function(d,s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,"script","twitter-wjs"));(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=624972374235609&version=v2.0";fjs.parentNode.insertBefore(js,fjs)}(document,'script','facebook-jssdk'));(function(){var po=document.createElement('script');po.type='text/javascript';po.async=true;po.src='https://apis.google.com/js/platform.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(po,s)})()}};App.modules.FeaturedPortfolio={init:function(){var mod=document.getElementById('featured-portfolio');var items=mod.getElementsByTagName('article');var i=0;var num=items.length;var zIndex=1;items[i].classList.add('active');mod.classList.add('loaded');var gotoNext=function(){var prev=i;i=(i+1==num?0:i+1);items[i].style.zIndex=++zIndex;items[i].classList.add('active');setTimeout(function(){items[prev].classList.remove('active')},1000)};var button=document.createElement('a');button.innerHTML='Next';button.href='#';button.classList.add('next');mod.appendChild(button);button.addEventListener('click',function(e){e.preventDefault();gotoNext()})}};App.modules.Header={init:function(){},wrapMenu:function(){var as=document.getElementById('header').querySelectorAll('div.widget_nav_menu a');for(var i=0;i<as.length;i++){as[i].innerHTML='<span>'+as[i].innerHTML+'</span>'}},clickableLIs:function(){var lis=document.getElementById('header').querySelectorAll('div.widget_nav_menu li');for(var i=0;i<lis.length;i++){lis[i].addEventListener('click',function(){this.getElementsByTagName('a')[0].click()})}}};App.modules.Portfolios={init:function(mod){App.plugins.TagFilter.start(document.getElementById('posts-intro').getElementsByTagName('ul')[0].getElementsByTagName('a'),mod.getElementsByTagName('article'))}};App.modules.Projects={init:function(mod){App.plugins.TagFilter.start(document.getElementById('posts-intro').getElementsByTagName('ul')[0].getElementsByTagName('a'),mod.getElementsByTagName('article'))}};App.plugins.BlurImages={init:function(){var images=document.querySelectorAll('img.blur');for(var i=0;i<images.length;i++){(function(){var image=images[i];var canvas=document.createElement('canvas');canvas.classList.add('blur');image.parentNode.insertBefore(canvas,image.nextSibling);stackBlurImage(image,canvas,40)})()}}};App.plugins.CanvasLogo={init:function(){var color='#fc3';var canvass=document.querySelectorAll('canvas.al-logo');for(var i=0;i<canvass.length;i++){(function(){var canvas=canvass[i];var ctx=canvas.getContext('2d');var width=canvas.width;var height=canvas.height;var thickness=Math.round(width/15);var startX=thickness/2;var startY=height;var endX=startX+width*.5;var endY=startY-height*.2;var peakX=startX+width*.25;var peakY=0;ctx.lineWidth=thickness;ctx.strokeStyle=color;ctx.beginPath();ctx.moveTo(startX,startY);ctx.quadraticCurveTo(peakX,peakY,endX,endY);ctx.stroke();ctx.quadraticCurveTo(startX+width*.5+width*.1,startY-height*.1,width,startY);ctx.stroke()})()}}};App.plugins.ImageZoom={init:function(){imageZoom(document.body)}};App.plugins.InPageLinkScroll.offset=window.innerWidth<800?0:50;App.plugins.TagFilter={init:function(){},start:function(tags,items){for(var i=0;i<tags.length;i++){}},show:function(tags){}};