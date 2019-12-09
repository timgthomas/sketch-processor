const AdmZip = require('adm-zip');
const fs = require('fs');
const rimraf = require('rimraf');

module.exports = async function(inputFile, outputPath) {
  let sketchFile = new AdmZip(inputFile);
  fs.existsSync(outputPath) && rimraf.sync(outputPath);
  sketchFile.extractAllTo(outputPath);
}
