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

-- Add geolocation data to users table
-- add city, region, country, language_code, language_name, timezone to users table
ALTER TABLE `users`
  ADD `city` varchar(100) COLLATE 'latin1_swedish_ci' NULL,
  ADD `region` varchar(100) COLLATE 'latin1_swedish_ci' NULL,
  ADD `country` varchar(100) COLLATE 'latin1_swedish_ci' NULL,
  ADD `language_code` varchar(10) COLLATE 'latin1_swedish_ci' NULL,
  ADD `language_name` varchar(100) COLLATE 'latin1_swedish_ci' NULL,
  ADD `timezone` varchar(100) COLLATE 'latin1_swedish_ci' NULL;

ALTER TABLE `users`
  ADD `follow_up_count` INT DEFAULT 0; 