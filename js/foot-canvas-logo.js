App.plugins.CanvasLogo = {
	init: function () {
		var canvass = document.querySelectorAll('canvas.al-logo');

		for (var i = 0; i < canvass.length; i++) {
			(function () {
				var canvas = canvass[i];
				var ctx = canvas.getContext('2d');
			})();
		}
	}
};
