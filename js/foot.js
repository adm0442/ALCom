/**
 * Main JS App
 * Add all your code to this object for it to run onload.
 *
 * If you want to add code that only runs when a certain part of the page
 * is visible, for example #recent-comments, add a new MODULE 
 * with App.modules.RecentComments = {init: function () {}};
 * Note that the module name HAS to correspond to the ID of the
 * element it's tied to. So if you have #header specific code
 * you add it to App.modules.Header, #login-screen: App.modules.LoginScreen and so on.
 *
 * DEPRACATED: 
 * If you want to add code that runs on every page load create
 * a new plugin with App.plugins.MyPlugin = {init: function () {}};
 *
 * Instead just create your own object; ImageZoom = {init: function () ... }; and then call it from the (global) Header-module
 */
App = {
	modules: [], 

	// Init
	init: function() {
		this.initModules();
	}, 

	// Run every module that is currently on the page's init function
	// If you dynamically add or remove modules you can manually run them
	// with App.modules.TheModuleYouJustAdded.init();
	initModules: function() {
		// Run through all modules
		for (var module in this.modules) {
			// Work out the HTML-ID based on the module-name (RecentArticles == recent-articles)
			var id = module.replace(/([A-Z])/g, '-$1').toLowerCase();

			id = id.substring(0, 1) == '-' ? id.substring(1) : id;

			var mod = document.getElementById(id);

			// Only run modules that are used and don't run ajax-run-modules
			if (mod && typeof(this.modules[module].init) == 'function') {
				this.modules[module].init(mod);
			}
		}
	}
};
var AjaxForms = {
	init: function (selector) {
		var selector = selector || 'form.ajax';
		var forms = document.querySelectorAll(selector);

		for (var i = 0; i < forms.length; i++) {
			this.ajaxForm(forms[i]);
		}
	}, 

	ajaxForm: function (form) {
		var self = this;

		form.addEventListener('submit', function (e) {
			var form = this;

			e.preventDefault();

			if (form.classList.contains('loading')) {
				return;
			}

			// Remove error/success classes - set loading
			form.classList.remove('error');
			form.classList.remove('success');
			form.classList.add('loading');

			// Remove potential old message
			var oldMessage = form.parentNode.querySelector('p.message');

			if (oldMessage) {
				oldMessage.parentNode.removeChild(oldMessage);
			}

			// Remove potential old error messsages
			var errorMessages = form.querySelectorAll('strong.error');

			for (var i = 0; i < errorMessages.length; i++) {
				errorMessages[i].parentNode.removeChild(errorMessages[i]);
			}

			// Check potential captcha
			var captcha = document.querySelector('div.captcha');

			if (captcha && typeof(grecaptcha) != 'undefined') {
				if (!grecaptcha.getResponse(captcha.getAttribute('data-captcha-widget-id'))) {
					var errorMsg = document.createElement('strong');

					errorMsg.classList.add('error');
					errorMsg.innerHTML = 'Please verify that you are human';

					captcha.parentNode.appendChild(errorMsg);

					form.classList.remove('loading');
					form.classList.add('error');

					return;
				}
			}

			// AJAX the form away
			SimpleAjax.xhr({
				method:		form.method, 
				url:		form.action, 
				data:		self.serialize(form), 
				callback:	function (data) {
					var data = JSON.parse(data);

					form.classList.remove('loading');

					// Success! Do cool stuff
					if (data.success) {
						form.classList.add('success');
						form.reset();
					}
					// The backend did not return success
					else {
						form.classList.add('error');
					}

					// Reset potential captcha
					if (captcha && typeof(grecaptcha) != 'undefined') {
						grecaptcha.reset(captcha.getAttribute('data-captcha-widget-id'));
					}

					// The backend returned a message - display it
					if (data.msg && data.msg.length) {
						var newMessage = document.createElement('p');

						newMessage.classList.add('message');
						newMessage.classList.add((data.success ? 'success' : 'error'));

						newMessage.innerHTML = '<strong>' + data.msg + '</strong>';

						form.parentNode.insertBefore(newMessage, form);
					}

					// The backend returned errors - display them
					if (data.errors) {
						for (var fieldName in data.errors) {
							var strong = document.createElement('strong');
							var field = fieldName == 'captcha' ? form.querySelector('div.captcha') : form.querySelector('[name="' + fieldName + '"]');

							strong.classList.add('error');
							strong.innerHTML = data.errors[fieldName];

							if (field) {
								field.parentNode.insertBefore(strong, field.nextSibling);
							}
						}
					}
				}
			});
		});
	}, 

	// https://code.google.com/p/form-serialize/
	serialize: function (form) {
		if (!form || form.nodeName !== "FORM") {
			return;
		}

		var i, j, q = [];

		for (i = form.elements.length - 1; i >= 0; i = i - 1) {
			if (form.elements[i].name === "") {
				continue;
			}

			switch (form.elements[i].nodeName) {
				case 'INPUT':
					switch (form.elements[i].type) {
						case 'text':
						case 'hidden':
						case 'password': 
						case 'search': 
						case 'email': 
						case 'url': 
						case 'tel': 
						case 'number': 
						case 'date': 
						case 'month': 
						case 'week': 
						case 'time': 
						case 'datetime': 
						case 'datetime-local': 
						case 'color': 
						case 'button':
						case 'reset':
						case 'submit':
							q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;

						case 'checkbox':
						case 'radio':
							if (form.elements[i].checked) {
								q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
							}
						break;

						case 'file':
						break;
					}
				break;			 

				case 'TEXTAREA':
					q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;

				case 'SELECT':
					switch (form.elements[i].type) {
						case 'select-one':
							q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;

						case 'select-multiple':
							for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
								if (form.elements[i].options[j].selected) {
									q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
								}
							}
						break;
					}
				break;

				case 'BUTTON':
					switch (form.elements[i].type) {
						case 'reset':
						case 'submit':
						case 'button':
							q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					}
				break;
			}
		}

		return q.join("&");
	}
};
var HoverExpand = {
	init: function () {
		var codes = document.querySelectorAll('pre code');

		for (var i = 0; i < codes.length; i++) {
			var code = codes[i];

			code.parentNode.style.width = (code.offsetWidth + 50) + 'px'; // + 50 = give it some room for potential padding etc, doesn't really matter

			// Make sure it doesn't grow wider than the screen
			var rect = code.getBoundingClientRect();
			var winSize = this.getWinSize();

			code.parentNode.style.maxWidth = (winSize.width - rect.left - 70) + 'px';

			// For styling (and prettyprint!)
			codes[i].parentNode.classList.add('hover-expand');
			codes[i].parentNode.classList.add('prettyprint');
		}
	}, 

	// http://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
	getWinSize: function () {
		var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight|| e.clientHeight|| g.clientHeight;

		return {
			width: x, 
			height: y
		};
	}
};
/**
 * ImageZoom 1.0
 *
 * Run on an element and all links pointing to images
 * inside that element will "zoom out" of the link.
 *
 * @param	HTMLElement		wrap: the wrapping element, if you want all img links affected just run it on document.body
 * @param	String			duration: transition duration, default .1s
 */
var ImageZoom = {
	init: function (wrap, duration) {
		var wrap		= wrap || document.body;
		var duration	= duration || '.1s';

		// http://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
		var getWinSize = function () {
			var w = window,
				d = document,
				e = d.documentElement,
				g = d.getElementsByTagName('body')[0],
				x = w.innerWidth || e.clientWidth || g.clientWidth,
				y = w.innerHeight|| e.clientHeight|| g.clientHeight;

			return {
				width: x, 
				height: y
			};
		};

		var isIMGLink = function (el) {
			return el && el.tagName && el.tagName.toUpperCase() == 'A' && el.href && el.href.match(/\.(png|gif|jpg|jpeg)$/);
		};

		wrap.addEventListener('click', function (e) {
			// Make sure a link pointing to an image was clicked
			var clicked = e.target;

			if (!isIMGLink(clicked)) {
				var child = clicked;

				while (child.parentNode) {
					if (isIMGLink(child.parentNode)) {
						clicked = child.parentNode;

						break;
					}

					child = child.parentNode;
				}
			}

			if (!isIMGLink(clicked)) {
				return;
			}

			// An img link was clicked - go on
			e.preventDefault();

			var link			= clicked;
			var img				= link.getElementsByTagName('img');
				img				= img.length ? img[0] : link; // Use the link as the source "img" if there is no img
			var targetIMG		= document.createElement('img');
				targetIMG.src	= link.getAttribute('href');
			var targetIMGSize	= {};
			var imgSize			= {};

			document.body.appendChild(targetIMG);

			// Initial styling
			targetIMG.style.position	= 'absolute';
			targetIMG.style.zIndex		= '99';
			targetIMG.style.maxHeight	= '90%';
			targetIMG.style.maxWidth	= '90%';
			targetIMG.style.transition	= 'all ' + duration + ' ease-out';

			// Position target on top
			var positionOnTop = function () {
				targetIMG.style.display		= 'block';
				targetIMG.style.left		= imgSize.left + 'px';
				targetIMG.style.top			= document.body.scrollTop + imgSize.top + 'px';
				targetIMG.style.width		= imgSize.width + 'px';
				targetIMG.style.height		= imgSize.height + 'px';
				targetIMG.style.boxShadow	= '0 0 0 rgba(0, 0, 0, .4)';
			};

			// Position target center
			var positionCenter = function () {
				var winSize = getWinSize();
				var newTargetIMGSize = {width: targetIMGSize.width, height: targetIMGSize.height};

				targetIMG.style.display		= 'block';
				targetIMG.style.left		= (winSize.width - newTargetIMGSize.width) / 2 + 'px';
				targetIMG.style.top			= document.body.scrollTop + (winSize.height - newTargetIMGSize.height) / 2 + 'px';
				targetIMG.style.width		= newTargetIMGSize.width + 'px';
				targetIMG.style.height		= newTargetIMGSize.height + 'px';
				targetIMG.style.boxShadow	= '0 0 60px rgba(0, 0, 0, .4)';
			};

			// When target has loaded
			var goOn = function () {
				imgSize = img.getBoundingClientRect();
				targetIMGSize = targetIMG.getBoundingClientRect();

				positionOnTop();

				img.style.visibility = 'hidden';

				setTimeout(function () {
					positionCenter();
				}, 50);
			};

			// Check if already cached (TODO: needed?)
			if (targetIMG.complete) {
				goOn();
			}
			else {
				targetIMG.addEventListener('load', function () {
					goOn();
				});
			}

			// Close the img
			targetIMG.addEventListener('click', function () {
				positionOnTop();

				setTimeout(function () {
					img.style.visibility = 'visible';
					targetIMG.style.display = 'none';
				}, 50);
			});
		});
	}
};

if (typeof(jQuery) != 'undefined') {
	jQuery.fn.imageZoom = function (delay) {
		return this.each(function () {
			ImageZoom.init(this, delay);
		});
	};
}
/**
 * A couple of nice features for input[type=range] 
 * - until it's supported with CSS in all browsers
 *
 * You can change the colors of the input from your child theme with
 * App.plugins.InputRangeUtils.rangeLeftColor = 'red'; for example
 */
var InputRangeUtils = {
	// Init
	init: function () {
		this.values();
		this.colors();
	}, 

	// Appends a span to the label containing the value of the range input
	// Can be prefixed or suffixed by adding a data-value-prefix="$" or data-value-suffix=" years" for example
	values: function () {
		var inputs = document.querySelectorAll('input[type=range]');

		for (var i = 0; i < inputs.length; i++) {
			(function () {
				var input	= inputs[i];
				var label	= document.querySelector('label[for="' + input.id + '"]');
				var prefix	= input.getAttribute('data-value-prefix') ? input.getAttribute('data-value-prefix') : '';
				var suffix	= input.getAttribute('data-value-suffix') ? input.getAttribute('data-value-suffix') : '';
				var minTxt	= input.getAttribute('data-min-text') ? input.getAttribute('data-min-text') : false;
				var maxTxt	= input.getAttribute('data-max-text') ? input.getAttribute('data-max-text') : false;
				var value	= document.createElement('span');

				value.classList.add('value');
				label.appendChild(value);

				var updateValue = function () {
					var niceVal = typeof(number_format) == 'undefined' ? input.value : number_format(input.value, 0, ',', ' ');
						niceVal	= prefix + niceVal + suffix;

					niceVal = (input.value == input.getAttribute('max') && maxTxt) ? maxTxt : niceVal;
					niceVal = (input.value == input.getAttribute('min') && minTxt) ? minTxt : niceVal;

					value.innerHTML = niceVal;
				};

				updateValue();

				input.addEventListener('input', updateValue);
				input.addEventListener('change', updateValue);
			})();
		}
	}, 

	// Gives the left and right side of the input different colors (done with CSS for IE11)
	colors: function (leftColor, rightColor) {
		var leftColor = leftColor || '#06c';
		var rightColor = rightColor || '#888';
		var inputs = document.querySelectorAll('input[type=range]');

		for (var i = 0; i < inputs.length; i++) {
			(function () {
				var input = inputs[i];

				var updateColor = function () {
					var val = (input.value - input.getAttribute('min')) / (input.getAttribute('max') - input.getAttribute('min'));
						val *= 100;

					input.style.backgroundImage = 'linear-gradient(90deg, ' + leftColor + ' 0%, ' + leftColor + ' ' + val + '%, ' + rightColor + ' ' + val + '%, ' + rightColor + ' 100%)';
				};

				updateColor();

				input.addEventListener('input', updateColor);
				input.addEventListener('change', updateColor);
			})();
		}
	}
};
var LiveFilter = {
	init: function (tags, items) {
		var self = this;

		for (var i = 0; i < tags.length; i++) {
			tags[i].addEventListener('click', function (e) {
				e.preventDefault();
				this.classList.toggle('active');

				self.update(tags, items);
			});
		}
	}, 

	update: function (tags, items) {
		var selectedTags = [];

		for (var i = 0; i < tags.length; i++) {
			if (tags[i].classList.contains('active')) {
				selectedTags.push(tags[i].innerHTML);
			}
		}

		for (var i = 0; i < items.length; i++) {
			var hidden = false;

			for (var j = 0; j < selectedTags.length; j++) {
				if (!items[i].classList.contains(selectedTags[j].trim())) {
					hidden = true;
				}
			}

			if (hidden) {
				items[i].classList.add('hidden');
			}
			else {
				items[i].classList.remove('hidden');
			}
		}
	}
};
/**
 * LiveSearch 1.0
 *
 * TODO
 */
var LiveSearch = {
	init: function (input, conf) {
		var config = {
			url: conf.url || false, 
			appendTo: conf.appendTo || 'after', 
			data: conf.data || {}
		};

		var appendTo = appendTo || 'after';

		input.setAttribute('autocomplete', 'off');

		// Create search container
		var container = document.createElement('div');

		container.id = 'live-search-' + input.name;

		container.classList.add('live-search');

		// Append search container
		if (appendTo == 'after') {
			input.parentNode.classList.add('live-search-wrap');
			input.parentNode.insertBefore(container, input.nextSibling);
		}
		else {
			appendTo.appendChild(container);
		}

		// Hook up keyup on input
		input.addEventListener('keyup', function (e) {
			if (this.value != this.liveSearchLastValue) {
				this.classList.add('loading');

				var q = this.value;

				// Clear previous ajax request
				if (this.liveSearchTimer) {
					clearTimeout(this.liveSearchTimer);
				}

				// Build the URL
				var url = config.url + q;

				if (config.data) {
					if (url.indexOf('&') != -1 || url.indexOf('?') != -1) {
						url += '&' + LiveSearch.serialize(config.data);
					}
					else {
						url += '?' + LiveSearch.serialize(config.data);
					}
				}

				// Wait a little then send the request
				var self = this;

				this.liveSearchTimer = setTimeout(function () {
					if (q) {
						SimpleAjax.xhr({
							method: 'get', 
							url: url, 
							callback: function (data) {
								self.classList.remove('loading');
								container.innerHTML = data;
							}
						});
					}
					else {
						container.innerHTML = '';
					}
				}, 300);

				this.liveSearchLastValue = this.value;
			}
		});
	}, 

	// http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
	serialize: function (obj) {
		var str = [];

		for(var p in obj) {
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
			}
		}

		return str.join('&');
	}
};

if (typeof(jQuery) != 'undefined') {
	jQuery.fn.liveSearch = function (conf) {
		return this.each(function () {
			LiveSearch.init(this, conf);
		});
	};
}
function number_format(number, decimals, dec_point, thousands_sep) {
  //  discuss at: http://phpjs.org/functions/number_format/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: davook
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Michael White (http://getsprink.com)
  // bugfixed by: Benjamin Lupton
  // bugfixed by: Allan Jensen (http://www.winternet.no)
  // bugfixed by: Howard Yeend
  // bugfixed by: Diogo Resende
  // bugfixed by: Rival
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  //  revised by: Luke Smith (http://lucassmith.name)
  //    input by: Kheang Hok Chin (http://www.distantia.ca/)
  //    input by: Jay Klehr
  //    input by: Amir Habibi (http://www.residence-mixte.com/)
  //    input by: Amirouche
  //   example 1: number_format(1234.56);
  //   returns 1: '1,235'
  //   example 2: number_format(1234.56, 2, ',', ' ');
  //   returns 2: '1 234,56'
  //   example 3: number_format(1234.5678, 2, '.', '');
  //   returns 3: '1234.57'
  //   example 4: number_format(67, 2, ',', '.');
  //   returns 4: '67,00'
  //   example 5: number_format(1000);
  //   returns 5: '1,000'
  //   example 6: number_format(67.311, 2);
  //   returns 6: '67.31'
  //   example 7: number_format(1000.55, 1);
  //   returns 7: '1,000.6'
  //   example 8: number_format(67000, 5, ',', '.');
  //   returns 8: '67.000,00000'
  //   example 9: number_format(0.9, 0);
  //   returns 9: '1'
  //  example 10: number_format('1.20', 2);
  //  returns 10: '1.20'
  //  example 11: number_format('1.20', 4);
  //  returns 11: '1.2000'
  //  example 12: number_format('1.2000', 3);
  //  returns 12: '1.200'
  //  example 13: number_format('1 000,50', 2, '.', ' ');
  //  returns 13: '100 050.00'
  //  example 14: number_format(1e-8, 8, '.', '');
  //  returns 14: '0.00000001'

  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}var RenderCaptchas = function () {
	var captchas = document.querySelectorAll('div.captcha');

	for (var i = 0; i < captchas.length; i++) {
		var widgetID = grecaptcha.render(captchas[i], {
			sitekey: RECAPTCHA_SITE_KEY
		});

		captchas[i].setAttribute('data-captcha-widget-id', widgetID);
	}
};
/**
 * Adds classes to the body element reflecting the user's current scroll behaviour
 * e.g. "has-scrolled", "scrolling-up" or "scrolling-down".
 * These are used for styling purposes in some themes.
 */
var ScrollClasses = {
	init: function () {
		var lastST = 0;
		var lastSTns = 0; // Last scroll top (no sensitivity)
		var sensitivity = 100;

		window.addEventListener('scroll', function (e) {
			var st = document.body.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;

			// Check if at top
			if (st) {
				document.body.classList.add('has-scrolled');
			}
			else {
				document.body.classList.remove('has-scrolled');
			}

			// Check direction
			if (Math.abs(lastST - st) > sensitivity) {
				if (st > lastST) {
					document.body.classList.remove('scrolling-up-far');
					document.body.classList.add('scrolling-down-far');
				}
				else {
					document.body.classList.remove('scrolling-down-far');
					document.body.classList.add('scrolling-up-far');
				}

				lastST = st;
			}

			if (Math.abs(lastSTns - st) > 0) {
				if (st > lastSTns) {
					document.body.classList.remove('scrolling-up');
					document.body.classList.remove('scrolling-up-far');
					document.body.classList.add('scrolling-down');
				}
				else {
					document.body.classList.remove('scrolling-down');
					document.body.classList.remove('scrolling-down-far');
					document.body.classList.add('scrolling-up');
				}

				lastSTns = st;
			}
		});
	}
};
var SimpleAjax = {
	xhr: function (conf, updateID) {
		// Create config
		var config = {
			method:		conf.method || 'get', 
			url:		conf.url, 
			data:		conf.data || '', 
			callback:	conf.callback || function (data) {
				if (updateID) {
					document.getElementById(updateID).innerHTML = data;
				}
			}
		};

		// Create ajax request object
		var xhr = new XMLHttpRequest();

		// This runs when request is complete
		var onReadyStateChange = function () {
			if (xhr.readyState == 4) {
				config.callback(xhr.responseText);
			}
		};

		// Send the request
		if (config.method.toUpperCase() == 'POST') {
			xhr.open('POST', config.url, true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.onreadystatechange = onReadyStateChange;
			xhr.send(config.data);
		}
		else {
			xhr.open('GET', config.url + (config.data ? '?' + config.data : ''), true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.onreadystatechange = onReadyStateChange;
			xhr.send(null);
		}
	}
};
/**
 * Hooks click event's too all in page links to smoothly scroll down
 * The scrolling code is from: http://www.cssscript.com/smooth-scroll-to-animation-with-anchor-scrolling-js-library/
 */
var SmoothScrolling = {
	init: function (offset) {
		var offset = offset || 0;

		var root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body;
		var easeInOutCubic = function(t, b, c, d) {
			if ((t/=d/2) < 1) {
				return c/2*t*t*t + b;
			}

			return c/2*((t-=2)*t*t + 2) + b;
		};

		document.body.addEventListener('click', function (e) {
			var clicked = e.target;
			var href = clicked.tagName.toUpperCase() == 'A' ? clicked.getAttribute('href') : false;

			if (!href) {
				return;
			}

			var targetID = href.match(/#(.*?)$/);

			if (!(targetID && targetID[1] && targetID[1].length)) {
				return;
			}

			targetID = targetID[1];

			var startTime;
			var startPos = root.scrollTop;
			var endPos = document.getElementById(targetID).getBoundingClientRect().top;
				endPos -= offset;
			var maxScroll = root.scrollHeight - window.innerHeight;
			var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos;
			var duration = 900;

			var scroll = function (timestamp) {
				startTime = startTime || timestamp;

				var elapsed = timestamp - startTime;
				var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration);

				root.scrollTop = progress;
				elapsed < duration && requestAnimationFrame(scroll);
			};   

			requestAnimationFrame(scroll);
			e.preventDefault();
		});
	}
};
App.modules.SocialMediaButtons = {
	init: function (mod) {
		var path		= window.location.pathname;
		var countURL	= window.location.origin + path;

		// Twitter
		var twitterHTML = '<a href="https://twitter.com/share?via=conversionista&count=vertical&lang=en" class="twitter-share-button" data-counturl="' 
				+ countURL 
				+ '" data-url="' 
				+ countURL 
				+ '">Tweet</a>';

		// Facebook
		var facebookHTML = '<div class="fb-like" data-href="' 
				+ countURL 
				+ '" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>';

		// Google+
		var googlePlusHTML = '<div class="g-plusone" data-size="tall" data-annotation="bubble" data-href=' 
				+ countURL 
				+ '></div>';

		mod.innerHTML = twitterHTML + facebookHTML + googlePlusHTML;

		// Twitter
		window.twttr = (function (d, s, id) {
			var t, js, fjs = d.getElementsByTagName(s)[0];

			if (d.getElementById(id)) return;

			js = d.createElement(s); 
			js.id = id; 
			js.src= "https://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);

			return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
		}(document, "script", "twitter-wjs"));

		// Facebook
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];

			if (d.getElementById(id)) return;

			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=624972374235609&version=v2.0";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		// Google+
		(function() {
			var po = document.createElement('script');

			po.type = 'text/javascript';
			po.async = true;
			po.src = 'https://apis.google.com/js/platform.js';

			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(po, s);
		})();
	}
};
var CanvasLogo = {
	init: function (selector) {
		var selector = selector || 'canvas.al-logo';
		var color = '#fc3';
		var canvass = document.querySelectorAll(selector);

		for (var i = 0; i < canvass.length; i++) {
			(function () {
				var canvas = canvass[i];
				var ctx = canvas.getContext('2d');

				var width = canvas.width;
				var height = canvas.height;

				var thickness = Math.round(width / 15);
				var startX = thickness / 2;
				var startY = height;
				var endX = startX + width * .5; // The A should be about half the width
				var endY = startY - height * .2; // The curve into the L should be roughly a fifth of the entire height
				var peakX = startX + width * .25;
				var peakY = 0;

				ctx.lineWidth = thickness;
				ctx.strokeStyle = color;

				// Draw the first bend
				ctx.beginPath();
				ctx.moveTo(startX, startY);
				ctx.quadraticCurveTo(peakX, peakY, endX, endY);
				ctx.stroke();

				// Draw the second bend
				ctx.quadraticCurveTo(startX + width * .5 + width * .1, startY - height * .1, width, startY);
				ctx.stroke();
			})();
		}
	}
};
var TrippyBG = {
	canvas: false, 
	ctx: false, 
	dim: false, 

	init: function (mod) {
		// Create the canvas
		this.canvas = document.createElement('canvas');

		// Add to requested element
		// If the element has a direct child img - add the canvas AFTER the img
		var inserted = false;

		for (var i = 0; i < mod.children.length; i++) {
			if (mod.children[i].tagName.toUpperCase() == 'IMG') {
				mod.insertBefore(this.canvas, mod.children[i].nextSibling);
				inserted = true;
				break;
			}
		}

		if (!inserted) {
			mod.insertBefore(this.canvas, mod.childNodes[0]);
		}

		this.dim = this.canvas.getBoundingClientRect();
		this.ctx = this.canvas.getContext('2d');

		// Set its width to its rendered width
		this.canvas.width = this.dim.width;
		this.canvas.height = this.dim.height;

		// Do some waves
		this.waves();

	//	this.physics();
	}, 

	physics: function () {
		
	}, 

	waves: function () {
		var self = this;

		// Start drawing waves at this height
		var waveHeight = self.dim.height / 20;
		var offset = self.dim.height - waveHeight * 2;
		var direction = -1;
		var time = new Date().getTime();
		var dt = 0;
		var i = 0;

		// Start drawing
		self.ctx.lineWidth = 1;

		var drawWaves = function () {
			dt = (new Date().getTime() - time) / 1000;
			time = new Date().getTime();

			offset += (1 * dt) * direction;
			i += (100 * dt);

			if (offset < (0 + waveHeight)) {
				direction = 1;
			}
			else if (offset > (self.dim.height - waveHeight)) {
				direction = -1;
			}

			self.ctx.clearRect(0, 0, self.dim.width, self.dim.height);
			self.ctx.moveTo(0, self.dim.height / 2 + offset);

			for (var x = 0; x < self.dim.width; x++) {
				var yPos = waveHeight * (Math.sin((i + x) * Math.PI / 180) * ((Math.sin(((x * 1.5)) * Math.PI / 180) + 1) / 1.5));
					yPos += offset;

				self.ctx.beginPath();
				self.ctx.moveTo(x, yPos);
				self.ctx.strokeStyle = 'rgba(0, 70, 90, 1)';
				self.ctx.lineTo(x, yPos + self.ctx.lineWidth);
				self.ctx.closePath();
				self.ctx.stroke();

				self.ctx.beginPath();
				self.ctx.moveTo(x, yPos + self.ctx.lineWidth);
				self.ctx.strokeStyle = 'rgba(0, 35, 45, .4)';
				self.ctx.lineTo(x, self.dim.height);
				self.ctx.closePath();
				self.ctx.stroke();
			}

			var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;

			raf(drawWaves);
		};

		var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;

		raf(drawWaves);
	}
};
App.modules.FeaturedPortfolio = {
	init: function (mod) {
		// Grab all items
		var items = mod.getElementsByTagName('article');
		var i = 0;
		var num = items.length;
		var zIndex = 1;

		// Set the first one to active now
		items[i].classList.add('active');
		mod.classList.add('loaded');

		// Goes to the next slide
		var gotoNext = function () {
			var prev = i;

			i = (i + 1 == num ? 0 : i + 1);

			items[i].style.zIndex = ++zIndex;
			items[i].classList.add('active');

			setTimeout(function () {
				items[prev].classList.remove('active');
			}, 1000);
		};

		// Create a button for going to the next slide
		var button = document.createElement('a');

		button.innerHTML = 'Next';
		button.href = '#';
		button.classList.add('next');

		mod.appendChild(button);

		button.addEventListener('click', function (e) {
			e.preventDefault();

			gotoNext();
		});
	}
};
App.modules.Header = {
	init: function (mod) {
		// Adds "has-scrolled", "scrolling-down" etc to <html> (for styling purposes)
		ScrollClasses.init();

		// Hijaxes all form.ajax
		AjaxForms.init('form.ajax');

		// Zooms all img-links 
		ImageZoom.init(document.body);

		// Some nice utlities for input[type=range]
		InputRangeUtils.values(); // Display value of input next to label
		InputRangeUtils.colors(); // Different colors on left/right side

		// Live Ajax Search
	//	LiveSearch.init(document.querySelector('input[name=s]'), '/?s=', 'after');

		// Smoothly scroll #in-page-links
		SmoothScrolling.init((window.innerWidth < 800 ? 0 : 50));

		// Expand codeblocks on hover
		HoverExpand.init();

		// Theme stuff
	//	BlurImages.init('img.blur');
	//	CanvasLogo.init('canvas.al-logo');

		this.trippyBG();

	//	this.clickableLIs(mod);
	//	this.wrapMenu(mod);
	}, 

	trippyBG: function () {
		// Add heros here
		var appendTo =	document.querySelector('#post header') ||
						document.querySelector('#project header') ||
						document.querySelector('#four-o-four header') ||
						document.querySelector('#posts-intro');

		if (appendTo) {
			// Don't run waves on heros with images
			for (var i = 0; i < appendTo.children.length; i++) {
				if (appendTo.children[i].tagName.toUpperCase() == 'IMG') {
					appendTo = false;
					break;
				}
			}

			// Don't run in lo res
			if (appendTo && window.innerWidth > 800) {
				TrippyBG.init(appendTo);
			}
		}
	}, 

	// Not in use, attempts at making the whole menu item clickable ... :/
	wrapMenu: function (mod) {
		var as = mod.querySelectorAll('div.widget_nav_menu a');

		for (var i = 0; i < as.length; i++) {
			as[i].innerHTML = '<span>' + as[i].innerHTML + '</span>';
		}
	}, 

	clickableLIs: function (mod) {
		var lis = mod.querySelectorAll('div.widget_nav_menu li');

		for (var i = 0; i < lis.length; i++) {
			lis[i].addEventListener('click', function () {
				this.getElementsByTagName('a')[0].click();
			});
		}
	}
};
App.modules.Portfolios = {
	init: function (mod) {
		var intro = document.getElementById('posts-intro');
		var list = intro.getElementsByTagName('ul');

		if (list.length) {
			LiveFilter.init(
				list[0].getElementsByTagName('a'), 
				mod.getElementsByTagName('article')
			);
		}
	}
};
App.modules.Projects = {
	init: function (mod) {
		var intro = document.getElementById('posts-intro');
		var list = intro.getElementsByTagName('ul');

		if (list.length) {
			LiveFilter.init(
				list[0].getElementsByTagName('a'), 
				mod.getElementsByTagName('article')
			);
		}
	}
};
