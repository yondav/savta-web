const { dirScopes } = require('./scopes.config');

const scopes = ['repo'].concat(dirScopes('./src'));

module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'scope-enum': [2, 'always', scopes],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'config',
        'docs',
        'feat',
        'fix',
        'performance',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
