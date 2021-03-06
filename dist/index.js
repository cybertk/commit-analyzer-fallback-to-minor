'use strict';

var _require = require('conventional-changelog/lib/git');

var parseRawCommit = _require.parseRawCommit;


module.exports = function (pluginConfig, _ref, cb) {
  var commits = _ref.commits;

  var type = null;

  commits.map(function (commit) {
    return parseRawCommit(commit.hash + '\n' + commit.message);
  }).filter(function (commit) {
    return !!commit;
  }).every(function (commit) {
    if (commit.breaks.length) {
      type = 'major';
      return false;
    }

    if (commit.type === 'feat') type = 'minor';

    if (!type && commit.type === 'fix') type = 'patch';

    return true;
  });

  if (!type) type = 'minor';

  cb(null, type);
};