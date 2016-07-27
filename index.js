var createHash = require('crypto').createHash,
  minimatch = require('minimatch');

function createSubresourceIntegrity({
  pattern = '*.{css,js}',
  algorithm = 'sha512',
  minimatchOptions = {matchBase: true}
} = {}) {
  switch (algorithm) {
    case 'sha512':
    case 'sha384':
    case 'sha256':
      break;
    default:
      throw new Error('algorithm: ' + algorithm +
        ' is invalid. Should be sha256, sha384 or sha512');
  }

  if (!pattern) {
    throw new Error('pattern is empty');
  }

  if (minimatchOptions !== Object(minimatchOptions)) {
    throw new Error('minimatchOptions should be an Object');
  }

  return function subresourceIntegrity(files, ms, done) {
    ms._metadata.subresource = Object.keys(files)
    .filter(minimatch.filter(pattern, minimatchOptions))
    .reduce((subresource, name) => {
      subresource[name] = algorithm + '-' +
        createHash(algorithm).update(files[name].contents).digest('base64');
      return subresource;
    }, {});

    done();
  };
};

module.exports = createSubresourceIntegrity;
