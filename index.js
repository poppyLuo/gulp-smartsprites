/**
 * @file: smartSprite
 * @author: luowenwen02
 * @since 2016-03-15
 */

'use strict';

var path = require('path');
var cp = require('child_process');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var log = gutil.log;

var osPlatform = require('os').platform().toLowerCase();

function gulpSmartsprites(opt, cb) {
    if (!opt.rootPath || !opt.outputPath) {
        throw new PluginError('gulp-smartsprites', 'rootPath or outputPath is null.');
    }
    var stdout = opt.stdout !== undefined ? opt.stdout : true;
    var stderr = opt.stderr !== undefined ? opt.stderr : true;

    var cmdPath = '';

    if (osPlatform == 'win32') {
        cmdPath = opt.smartspritePath || path.resolve( __dirname + '/smartsprites-0.2.9/smartsprites.cmd');
    }
    else {
        cmdPath = opt.smartspritePath || path.resolve( __dirname + '/smartsprites-0.2.9/smartsprites.sh');

    }
    var rootPath = path.resolve(opt.rootPath);
    var outputPath = path.resolve(opt.outputPath);
    var suffix = opt.cssFileSuffix || '""';
    var isSpriteIE6 = opt.isSpriteIE6 || 'false';
    var logLevel = opt.logLevel || 'WARN';

    var command = cmdPath
        + ' --root-dir-path "' + rootPath
        + '" --log-level "' + logLevel
        + '" --output-dir-path "' + outputPath
        + '" --css-file-suffix ' + suffix;

    // 添加 ie6 sprint
    if (isSpriteIE6) {
        command += ' --sprite-png-ie6';
    }
    cp.exec(command, function (error, stdout, stderr) {
        if (error) {
            throw new PluginError('gulp-smartsprites:', 'error:' + error);
        }
        else if (stderr) {
            throw new PluginError('gulp-smartsprites:', 'stderr:' + stderr);
        }
        else {
            log('stdout:' + stdout);
            if (opt.callback && Object.prototype.toString.call(opt.callback) === 'object Function') {
                opt.callback();
            }
            cb();
        }
    });
}

module.exports = gulpSmartsprites;
