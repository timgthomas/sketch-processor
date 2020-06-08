const { existsSync, promises: fs } = require('fs');
let { argv } = require('yargs');

module.exports = async function(filename) {
  let sourceFile = argv.input;

  if (!sourceFile) throw new Error('No input file was specified')

  existsSync(filename) && await fs.unlink(filename);
  await fs.copyFile(sourceFile, filename);
}
