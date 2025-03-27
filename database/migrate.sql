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
/*
{
  "ip": "98.97.79.164",
  "is_eu": false,
  "city": "Lagos",
  "region": "Lagos",
  "region_code": "LA",
  "region_type": "state",
  "country_name": "Nigeria",
  "country_code": "NG",
  "continent_name": "Africa",
  "continent_code": "AF",
  "latitude": 6.454070091247559,
  "longitude": 3.394670009613037,
  "postal": null,
  "calling_code": "234",
  "flag": "https://ipdata.co/flags/ng.png",
  "emoji_flag": "🇳🇬",
  "emoji_unicode": "U+1F1F3 U+1F1EC",
  "asn": {
    "asn": "AS14593",
    "name": "Space Exploration Technologies Corporation",
    "domain": null,
    "route": "98.97.78.0/23",
    "type": "business"
  },
  "languages": [
    {
      "name": "English",
      "native": "English",
      "code": "en"
    }
  ],
  "currency": {
    "name": "Nigerian Naira",
    "code": "NGN",
    "symbol": "₦",
    "native": "₦",
    "plural": "Nigerian nairas"
  },
  "time_zone": {
    "name": "Africa/Lagos",
    "abbr": "WAT",
    "offset": "+0100",
    "is_dst": false,
    "current_time": "2025-03-24T14:26:53+01:00"
  },
  "threat": {
    "is_tor": false,
    "is_icloud_relay": false,
    "is_proxy": false,
    "is_datacenter": false,
    "is_anonymous": false,
    "is_known_attacker": false,
    "is_known_abuser": false,
    "is_threat": false,
    "is_bogon": false,
    "blocklists": []
  },
  "count": "24"
}
*/
-- add city, region, country, language_code, language_name, timezone to users table
ALTER TABLE `users`
  ADD `city` varchar(100) COLLATE 'latin1_swedish_ci' NULL,
  ADD `region` varchar(100) COLLATE 'latin1_swedish_ci' NULL,
  ADD `country` varchar(100) COLLATE 'latin1_swedish_ci' NULL,
  ADD `language_code` varchar(10) COLLATE 'latin1_swedish_ci' NULL,
  ADD `language_name` varchar(100) COLLATE 'latin1_swedish_ci' NULL,
  ADD `timezone` varchar(100) COLLATE 'latin1_swedish_ci' NULL;