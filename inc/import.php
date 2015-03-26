<?php
# add_action('wp_ajax_h5b_import', 'h5b_import');
# add_action('wp_ajax_nopriv_h5b_import', 'h5b_import');

include_once get_stylesheet_directory() . '/inc/Markdown.php';
include_once get_stylesheet_directory() . '/inc/NiceString.php';

function h5b_import () {
	header('Content-type: text/plain');

	global $wpdb;

	# Set some stuff
	$oldDB			= 'ante_alcom';
	$postType2Table	= array(
		'post'				=> 'articles', 
		'page'				=> 'pages', 
		'jquery_plugins'	=> 'jquery_plugins'
	);

	if (!isset($_GET['post_type']) or !array_key_exists($_GET['post_type'], $postType2Table)) {
		die('Bad ?post_type');
	}

	$postType = $_GET['post_type'];

	# jQuery Plugin Files
	if ($postType == 'jquery_plugins') {
		foreach (glob(TEMPLATEPATH . '/js/*.js') as $path) {
			$raw = file_get_contents($path);

			if (strpos($raw, '/***') === 0) {
				echo $raw;
			}
		}
	}
	# Database Content
	else {
		# Switch to old DB and get rows
		$wpdb->select($oldDB);

		$rows = $wpdb->get_results('SELECT * FROM ' . $postType2Table[$postType]);

		foreach ($rows as $row) {
			# Insert post
			$wpdb->select(DB_NAME);

			echo "\n # Inserting \"{$row->title}\"";

			$params = array(
				'post_type'		=> $postType, 
				'post_title'	=> $row->title, 
				'post_content'	=> NiceString::makeNice($row->content, 3, false, false, true), 
				'post_name'		=> $row->url_str, 
				'post_status'	=> 'publish'
			);

			if ($postType == 'post') {
				$params['post_date'] = $row->pub_date;
			}

			$newID = wp_insert_post($params);

			# Insert tags and comments
			if ($postType == 'post') {
				# Tags
				$wpdb->select($oldDB);

				$tmp	= $wpdb->get_results('SELECT * FROM article_tags LEFT JOIN tags USING(tags_id) WHERE articles_id = ' . $row->articles_id);
				$tags	= array();

				foreach ($tmp as $tag) {
					$tags[] = $tag->title;
				}

				if (count($tags)) {
					$wpdb->select(DB_NAME);

					wp_set_post_terms($newID, $tags, 'post_tag');

					echo " ...with tags: " . implode(', ', $tags);
				}

				# Comments
				$wpdb->select($oldDB);

				$comments	= $wpdb->get_results('SELECT * FROM comments WHERE articles_id = ' . $row->articles_id);
				$tmp		= array();

				$wpdb->select(DB_NAME);

				foreach ($comments as $comment) {
					$tmp[] = substr($comment->content, 0, 15) . '...';

					wp_insert_comment(array(
						'comment_post_ID'		=> $newID, 
						'comment_author'		=> $comment->author, 
						'comment_author_email'	=> $comment->email, 
						'comment_author_url'	=> $comment->website, 
						'comment_author_ip'		=> $comment->ip, 
						'comment_content'		=> NiceString::makeNice($comment->content, 4, false, false, false), 
						'comment_date'			=> $comment->pub_date, 
						'comment_approved'		=> 1
					));
				}

				if (count($tmp)) {
					echo " ... and comments: " . implode(', ', $tmp);
				}
			}
		}
	}

	# Switch DB back
	$wpdb->select(DB_NAME);

	die("\n\nDone! :D");
}
?>
