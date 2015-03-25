App.modules.Projects = {
	init: function (mod) {
		if (document.getElementById('posts-intro')) {
			App.plugins.TagFilter.start(
				document.getElementById('posts-intro').getElementsByTagName('ul')[0].getElementsByTagName('a'), 
				mod.getElementsByTagName('article')
			);
		}
	}
};
