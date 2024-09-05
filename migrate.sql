ALTER TABLE `users`
ADD `first_name` varchar(50) COLLATE 'latin1_swedish_ci' NULL,
ADD `last_name` varchar(50) COLLATE 'latin1_swedish_ci' NULL AFTER `first_name`;
ALTER TABLE `users`
ADD `avatar_url` text COLLATE 'latin1_swedish_ci' NULL;


ALTER TABLE `users`
ADD `role` varchar(10) COLLATE 'latin1_swedish_ci' NOT NULL DEFAULT 'user';
ALTER TABLE `users`
ADD `is_enabled` tinyint NOT NULL DEFAULT '1';