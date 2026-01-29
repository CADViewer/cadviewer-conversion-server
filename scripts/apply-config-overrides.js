#!/usr/bin/env node
/**
 * Apply configuration overrides to CADViewer_config.json
 * 
 * Usage: node apply-config-overrides.js <config_file> <overrides_json>
 * 
 * Arguments:
 *   config_file   - Path to the CADViewer_config.json file
 *   overrides_json - JSON string of overrides to apply
 * 
 * Example:
 *   node apply-config-overrides.js CADViewer_config.json '{"enableFeature": true}'
 */

const fs = require('fs');
const path = require('path');

// Secrets to always scrub (set to empty string)
const SECRETS_TO_SCRUB = [
  'GROQ_API_KEY',
  'GROQ_MODEL',
  'GOOGLE_AI_API_KEY',
  'SNOWFLAKE_BASE_URL',
  'SNOWFLAKE_BEARER_TOKEN',
  'SNOWFLAKE_FUNCTION_TEST',
  'SNOWFLAKE_FUNCTION_PROD',
  'SNOWFLAKE_AGENT_DATABASE',
  'SNOWFLAKE_AGENT_SCHEMA',
  'SNOWFLAKE_AGENT_SCHEMA_',
  'SNOWFLAKE_AGENT_NAME',
  'SNOWFLAKE_AGENT_NAME_',
  'recaptchaSecretKey',
  'globalApplicationSasToken',
  'globalApplicationSasToken_',
  'globalBearerAutenticationToken'
];

function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = { ...source[key] };
      }
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

function scrubSecrets(config) {
  const result = { ...config };
  
  for (const secret of SECRETS_TO_SCRUB) {
    if (secret in result) {
      result[secret] = '';
    }
  }
  
  return result;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node apply-config-overrides.js <config_file> [overrides_json]');
    process.exit(1);
  }
  
  const configFile = args[0];
  const overridesJson = args[1] || '{}';
  
  // Read the config file
  if (!fs.existsSync(configFile)) {
    console.error(`Error: Config file not found: ${configFile}`);
    process.exit(1);
  }
  
  let config;
  try {
    const configContent = fs.readFileSync(configFile, 'utf8');
    config = JSON.parse(configContent);
  } catch (error) {
    console.error(`Error reading config file: ${error.message}`);
    process.exit(1);
  }
  
  // Parse overrides
  let overrides;
  try {
    overrides = JSON.parse(overridesJson);
  } catch (error) {
    console.error(`Error parsing overrides JSON: ${error.message}`);
    process.exit(1);
  }
  
  // First, scrub secrets
  console.log('Scrubbing secrets...');
  config = scrubSecrets(config);
  
  // Then apply overrides
  if (Object.keys(overrides).length > 0) {
    console.log('Applying config overrides:', JSON.stringify(overrides, null, 2));
    config = deepMerge(config, overrides);
  } else {
    console.log('No config overrides to apply.');
  }
  
  // Write back the config
  try {
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf8');
    console.log(`Config updated successfully: ${configFile}`);
  } catch (error) {
    console.error(`Error writing config file: ${error.message}`);
    process.exit(1);
  }
  
  // Show final config keys for verification
  console.log('Final config keys:', Object.keys(config).join(', '));
}

main();
