module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'docs',
        'chore',
        'style',
        'build',
        'test',
        'revert',
        'perf',
        'ci'
      ]
    ]
  }
}
