ALTER TABLE `users` ADD `folder_name` text NULL;
ALTER TABLE `users`
ADD `first_name` varchar(50) COLLATE 'latin1_swedish_ci' NULL,
ADD `last_name` varchar(50) COLLATE 'latin1_swedish_ci' NULL AFTER `first_name`;
ALTER TABLE `users`
ADD `avatar_url` text COLLATE 'latin1_swedish_ci' NULL;


-- A role is free text named by the site (see the frontend's role profiles on
-- the analytics platform), not one of three fixed words: "space_manager" alone
-- does not fit varchar(10). libs/tenant.js widens this at boot on an existing
-- database (COLUMN_WIDENINGS); keep the two in sync.
ALTER TABLE `users`
ADD `role` varchar(32) COLLATE 'latin1_swedish_ci' NOT NULL DEFAULT 'user';
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

-- ─────────────────────────────────────────────────────────────────────────────
-- Phase 3A — Multi-tenant support (managed by CADViewer Analytic)
-- A tenant = one customer of the CADViewer Analytic platform, identified on
-- every request by an X-Tenant-Key header. Folders, users, cache and analytics
-- config are partitioned per tenant. See libs/tenant.js.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS `tenants` (
  `id`               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug`             VARCHAR(63)  NOT NULL,
  `name`             VARCHAR(255) NULL,
  -- SHA-256 hex of the tenant API key (the plaintext key is returned once at
  -- creation and never stored).
  `api_key_hash`     VARCHAR(64)  NOT NULL,
  -- Per-tenant analytics agent on the CADViewer Analytic platform.
  `analytics_url`    TEXT NULL,
  `analytics_api_key` TEXT NULL,
  -- Per-tenant config overrides (quotas, retention, frontendUrl…), JSON text.
  `config_json`      LONGTEXT NULL,
  `is_enabled`       TINYINT NOT NULL DEFAULT 1,
  `created_at`       DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tenants_slug` (`slug`),
  UNIQUE KEY `uq_tenants_api_key_hash` (`api_key_hash`)
);

-- Attach every user to a tenant. Nullable during migration; enforced at write
-- time (signup/create) once the tenant middleware is live.
ALTER TABLE `users`
  ADD `tenant_id` INT UNSIGNED NULL;

CREATE INDEX `idx_users_tenant` ON `users` (`tenant_id`);

-- Email must be unique WITHIN a tenant, not globally: two customers may reuse
-- the same email under different tenants. (The base dump has no unique on email.)
ALTER TABLE `users`
  ADD UNIQUE KEY `uq_users_tenant_email` (`tenant_id`, `email`);

-- ─────────────────────────────────────────────────────────────────────────────
-- Opaque per-tenant storage key
-- The tenant slug is public (it is the frontend subdomain) and every folder was
-- keyed by it, so anyone knowing the slug could read a tenant's public content
-- (/content/<slug>/...). A random storage_key replaces the slug as the folder
-- root so the content path is no longer enumerable from the subdomain.
-- Nullable + fallback to slug in code keeps pre-migration tenants working.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE `tenants`
  ADD COLUMN IF NOT EXISTS `storage_key` VARCHAR(64) NULL;
-- Unique when set (multiple NULLs are allowed in MariaDB unique indexes).
ALTER TABLE `tenants`
  ADD UNIQUE KEY IF NOT EXISTS `uq_tenants_storage_key` (`storage_key`);

-- ─────────────────────────────────────────────────────────────────────────────
-- Agent targets — resolve a frontend app's analyticsTarget → (analytics agent
-- URL, API key). One row per deployed Cloud app (target = the app id, globally
-- unique). Written by the analytic platform via POST /tenant-admin/agent-targets
-- and read by /ai/proxy. Keeps the cav_ key server-side (never in the frontend
-- bundle). tenant_id scopes admin writes; /ai/proxy resolves by target alone.
-- ─────────────────────────────────────────────────────────────────────────────
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

-- ─────────────────────────────────────────────────────────────────────────────
-- Per-frontend partition
-- A tenant may run several frontends (apps) and they used to share everything:
-- a drawing uploaded on one appeared in the folder panel of the others. Each
-- app now owns its files under `apps/<name>/` inside the tenant's roots, and
-- its accounts. `app_folder` is the app's subdomain; NULL means tenant-wide
-- (content and accounts that predate the split).
--
-- libs/tenant.js ensureSchema() applies all of this automatically at boot —
-- this file stays the readable record of what it does.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE `agent_targets`
  ADD COLUMN IF NOT EXISTS `app_folder` VARCHAR(64) NULL;

ALTER TABLE `users`
  ADD COLUMN IF NOT EXISTS `app_folder` VARCHAR(64) NULL;

CREATE INDEX IF NOT EXISTS `idx_users_app` ON `users` (`tenant_id`, `app_folder`);

-- The same address must be free to hold an account on two frontends of one
-- tenant, so the uniqueness rule gains the app. Added before the narrower key
-- is dropped, so the table is never without one.
ALTER TABLE `users`
  ADD UNIQUE KEY IF NOT EXISTS `uq_users_tenant_app_email` (`tenant_id`, `app_folder`, `email`);
ALTER TABLE `users`
  DROP INDEX IF EXISTS `uq_users_tenant_email`;
