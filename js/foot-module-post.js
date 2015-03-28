App.modules.Post = {
	init: function (mod) {
		if (window.innerWidth > 800) {
			var header = mod.getElementsByTagName('header')[0];

			if (!header.getElementsByTagName('img').length) {
				TrippyBG.init(header);
			}
		}
	}
};
