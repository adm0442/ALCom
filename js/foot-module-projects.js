App.modules.Projects = {
	init: function (mod) {
		App.plugins.TagFilter(
			document.getElementById('posts-intro').getElementsByTagName('ul')[0].getElementsByTagName('a'), 
			mod.getElementsByTagName('article')
		);
	}
};
