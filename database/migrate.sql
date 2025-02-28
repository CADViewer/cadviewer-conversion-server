ALTER TABLE `users` ADD `folder_name` text NULL;
ALTER TABLE `users`
ADD `first_name` varchar(50) COLLATE 'latin1_swedish_ci' NULL,
ADD `last_name` varchar(50) COLLATE 'latin1_swedish_ci' NULL AFTER `first_name`;
ALTER TABLE `users`
ADD `avatar_url` text COLLATE 'latin1_swedish_ci' NULL;


ALTER TABLE `users`
ADD `role` varchar(10) COLLATE 'latin1_swedish_ci' NOT NULL DEFAULT 'user';
ALTER TABLE `users`
ADD `is_enabled` tinyint NOT NULL DEFAULT '1';

ALTER TABLE `users`
ADD `validation_token` text NULL;

-- Database migration change on 25/02/2025

ALTER TABLE `users`
ADD `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
ADD `updated_at` datetime NULL ON UPDATE CURRENT_TIMESTAMP AFTER `created_at`;

-- update all users created_at and updated_at to current timestamp
UPDATE `users` SET `created_at` = NOW(), `updated_at` = NOW();
