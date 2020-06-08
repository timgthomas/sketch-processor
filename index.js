#!/usr/bin/env node

require('dotenv').config();

const { existsSync, promises: fs } = require('fs');
const { argv } = require('yargs');

const storage = require(`./storage/${argv.storage}.js`);
const extract = require('./steps/extract.js');
const parse = require('./steps/parse.js');
const render = require('./steps/render.js');

(async function go(process) {
  let { templates, output } = argv;

  if (!templates) throw new Error('No templates path specified')
  if (!output) throw new Error('No output path specified')

  let tempOutputFile = './tmp/sketch.sketch';
  let tempOutputPath = './tmp/sketch-contents';

  // Ensure the temporary output directory exists.
  !existsSync('./tmp') && await fs.mkdir('./tmp');

  let steps = [
    { description: 'Retrieving Sketch file', fn: storage.bind(this, tempOutputFile) },
    { description: 'Extracting contents', fn: extract.bind(this, tempOutputFile, tempOutputPath) },
    { description: 'Parsing contents', fn: parse.bind(this, tempOutputPath) },
    { description: 'Rendering templates', fn: render.bind(this, templates, output) },
  ];

  let result;
  for (let { description, fn } of steps) {
    try {
      process.stdout.write(`${description}...`);
      result = await fn(result);
      process.stdout.write('done\n');
    } catch(ex) {
      process.stdout.write('error!\n');
      console.error('Alas, there was a problem:', ex.message);
      return;
    }
  }
}(process));
