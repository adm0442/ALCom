App.modules.Portfolios = {
	init: function (mod) {
		if (document.getElementById('posts-intro')) {
			LiveFilter.init(
				document.getElementById('posts-intro').getElementsByTagName('ul')[0].getElementsByTagName('a'), 
				mod.getElementsByTagName('article')
			);
		}
	}
};
