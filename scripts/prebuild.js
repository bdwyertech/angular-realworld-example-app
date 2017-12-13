#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const environmentFilesDirectory = path.join(__dirname, '../src/environments');
const targetEnvironmentTemplateFileName = 'environment.ts.template';
const targetEnvironmentFileName = 'environment.ts';

// Default Configuration Values
// NOTE: Only define non-critical values,
// the build should otherwise fail if not explicitly set
const defaultEnvValues = {
  PRODUCTION: false,
  API_URL: 'https://conduit.productionready.io/api',
};

// Load Template File
const environmentTemplate = fs.readFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentTemplateFileName),
  {encoding: 'utf-8'}
);

// Generate Output Data
const output = ejs.render(environmentTemplate, Object.assign({}, defaultEnvValues, process.env));
// Write the Environment File
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentFileName), output);

process.exit(0);
