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
