SELECT *
FROM forum_posts
INNER JOIN users
ON forum_posts.user_name = users.username;
