const convertColor = require('color-convert');
const { promises: fs } = require('fs');

function convertToId(name) {
  return name.toLowerCase().replace('/', '--').replace(' - ', '--');
}

function parseColors(data) {
  return data.assets.colorAssets.map(({ name, color }) => {
    let channels = [ color.red * 255, color.green * 255, color.blue * 255 ];
    return {
      id: convertToId(name),
      name: name,
      hex: convertColor.rgb.hex(channels).toLowerCase(),
      hsl: convertColor.rgb.hsl(channels),
    };
  });
}

module.exports = async function(sketchContentsPath) {
  let rawData = await fs.readFile(`${sketchContentsPath}/document.json`);
  let sketchData = JSON.parse(rawData);
  return {
    colors: parseColors(sketchData),
  };
}
