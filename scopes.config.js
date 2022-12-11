const { readdirSync: readDirectory } = require('fs');

exports.dirScopes = path =>
  readDirectory(path, { withFileTypes: true }).map(dir => dir.name.split('.')[0]);
