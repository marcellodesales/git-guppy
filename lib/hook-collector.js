/**
 * @module lib/InstalledHooksCollector
 */

var path = require("path");
var APP_DIR = path.dirname(require.main.filename);
var APP_PKG_JSON = require(APP_DIR + "/package.json");
var GUPPY_MODULE_TOKEN = "git-guppy-";

var all = [];

/**
 * Collect all the installed git-guppy libraries.
 */
function collectInstalledHookNames(dependencies) {
  // Collect in the given dependencies object
  var hooks = Object.keys(dependencies).
    filter(function(key) {
      return key.indexOf(GUPPY_MODULE_TOKEN) == 0;
    }).
    map(function(key) {
      return key.replace(GUPPY_MODULE_TOKEN, "");
    });

  // Concat the collecte keys and account for any repetition, if any
  all.push.apply(all, hooks).filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });;
}

// Collect from the devDependencies
if (APP_PKG_JSON.devDependencies) {
  collectInstalledHookNames(APP_PKG_JSON.devDependencies);
}

// Collect from the dependencies
if (APP_PKG_JSON.dependencies) {
  collectInstalledHookNames(APP_PKG_JSON.dependencies);
}

module.exports = all;
