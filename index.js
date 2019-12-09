#!/usr/bin/env node

require('dotenv').config();

const saveFile = require('./steps/save.js');
const extract = require('./steps/extract.js');
const parse = require('./steps/parse.js');
const render = require('./steps/render.js');

(async function go(process) {
  let [ templatesPath, outputPath ] = process.argv.slice(2);

  let tempOutputFile = './tmp/sketch.sketch';
  let tempOutputPath = './tmp/sketch-contents';
  let abstractOptions = {
    accessToken: process.env.ABSTRACT_ACCESS_TOKEN,
    projectId: process.env.ABSTRACT_PROJECT_ID,
  };

  let steps = [
    { description: 'Retrieving Sketch file', fn: saveFile.bind(this, abstractOptions, tempOutputFile) },
    { description: 'Extracting contents', fn: extract.bind(this, tempOutputFile, tempOutputPath) },
    { description: 'Parsing contents', fn: parse.bind(this, tempOutputPath) },
    { description: 'Rendering templates', fn: render.bind(this, templatesPath, outputPath) },
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
