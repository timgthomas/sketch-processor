const Abstract = require('abstract-sdk');
const { existsSync, promises: fs } = require('fs');

module.exports = async function({ accessToken, projectId }, filename) {
  if (!accessToken || !projectId) throw new Error('No Abstract credentials were specified')

  let abstractClient = new Abstract.Client({ accessToken, transportMode: 'cli' });
  let files = await abstractClient.files.list({ projectId, branchId: 'master', sha: 'latest' });
  let [ { id: fileId } ] = files;

  existsSync(filename) && await fs.unlink(filename);
  await abstractClient.files.raw({ projectId, branchId: 'master', sha: 'latest', fileId }, { filename });
}
