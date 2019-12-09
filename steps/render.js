const { promises: fs } = require('fs');
const handlebars = require('handlebars');
const path = require('path');
const recurse = require('recursive-readdir');
const rimraf = require('rimraf');

module.exports = async function(templatesPath, outputPath, data) {
  let files = await recurse(templatesPath);

  for (let file of files) {
    let contents = await fs.readFile(file, 'utf8');
    let filePath = path.join(outputPath, path.relative(templatesPath, file));
    let fileDirectory = filePath.substr(0, filePath.lastIndexOf('/'));

    await fs.mkdir(fileDirectory, { recursive: true });
    await fs.writeFile(filePath.replace(/.hbs$/, ''), handlebars.compile(contents)(data));
  }
};
