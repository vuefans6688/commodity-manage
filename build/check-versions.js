const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    let mode = versionRequirements[i]
    if (!semver.satisfies(mode.currentVersion, mode.versionRequirement)) {
      warnings.push(mode.name + ': ' +
        chalk.red(mode.currentVersion) + ' should be ' +
        chalk.green(mode.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    for (let i = 0; i < warnings.length; i++) {
      let warning = warnings[i]
      console.log('  ' + warning)
    }
    process.exit(1)
  }
}
