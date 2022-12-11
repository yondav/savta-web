module.exports = {
  '*.{ts,tsx}': [
    'eslint --fix --max-warnings 3',
    // 'tsc --excludeDirectories --noEmit',
  ], // modify for max warnings when ready
};
