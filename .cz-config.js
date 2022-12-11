const { dirScopes } = require('./scopes.config.js');

const scopes = ['repo'].concat(dirScopes('./src'));

module.exports = {
  askForBreakingChangeFirst: true,
  types: [
    {
      value: 'build',
      name: 'build:\tAddition or update regards to build process',
    },
    {
      value: 'chore',
      name: 'chore:\tAddition or update regards to build process or auxiliary tools\n\t\tand libraries such as documentation generation',
    },
    {
      value: 'config',
      name: 'config:\tAddition or update regards to configuriion',
    },
    { value: 'docs', name: 'docs:\tAddition or update regards to documentation' },
    { value: 'feat', name: 'feat:\tFeature addition' },
    { value: 'fix', name: 'fix:\tBug fix' },
    {
      name: 'performance:\tAddition or update to improve performance',
      value: 'performance',
    },
    {
      value: 'refactor',
      name: 'refactor:\tCode change that neither fixes a bug nor adds a feature',
    },
    { value: 'revert', name: 'revert:\tRevert to a commit' },
    {
      value: 'style',
      name: 'style:\tAddition or update regards to styles, ui or ux',
    },
    {
      value: 'test',
      name: 'test:Addition or update regards to tests cases',
    },
  ],
  scopes,

  // scopeOverrides: {
  //   fix: [{ name: 'merge' }, { name: 'style' }, { name: 'test' }, { name: 'hotfix' }],
  // },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  // skipQuestions: ['footer', 'breaking'],
  subjectLimit: 100,
};
