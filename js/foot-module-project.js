App.modules.Project = {
	init: function (mod) {
		if (window.innerWidth > 800) {
			TrippyBG.init(mod.getElementsByTagName('header')[0]);
		}
	}
};
