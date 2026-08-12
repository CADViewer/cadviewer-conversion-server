-- Phase 3A — Multi-tenant support (managed by CADViewer Analytic)

CREATE TABLE IF NOT EXISTS `tenants` (
  `id`               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug`             VARCHAR(63)  NOT NULL,
  `name`             VARCHAR(255) NULL,
  `api_key_hash`     VARCHAR(64)  NOT NULL,
  `analytics_url`    TEXT NULL,
  `analytics_api_key` TEXT NULL,
  `config_json`      LONGTEXT NULL,
  `is_enabled`       TINYINT NOT NULL DEFAULT 1,
  `created_at`       DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tenants_slug` (`slug`),
  UNIQUE KEY `uq_tenants_api_key_hash` (`api_key_hash`)
);

ALTER TABLE `users`
  ADD `tenant_id` INT UNSIGNED NULL;

CREATE INDEX `idx_users_tenant` ON `users` (`tenant_id`);

ALTER TABLE `users`
  ADD UNIQUE KEY `uq_users_tenant_email` (`tenant_id`, `email`);

ALTER TABLE `tenants`
  ADD COLUMN IF NOT EXISTS `storage_key` VARCHAR(64) NULL;
ALTER TABLE `tenants`
  ADD UNIQUE KEY IF NOT EXISTS `uq_tenants_storage_key` (`storage_key`);

CREATE TABLE IF NOT EXISTS `agent_targets` (
  `target`            VARCHAR(128) NOT NULL,
  `tenant_id`         INT UNSIGNED NULL,
  `analytics_url`     TEXT NOT NULL,
  `analytics_api_key` TEXT NOT NULL,
  `created_at`        DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`        DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`target`),
  KEY `idx_agent_targets_tenant` (`tenant_id`)
);
