/**
 * Created by webber-ling on 6/2/2017.
 */
"use strict";

const shell = require('shelljs');
const fs = require('fs');
const path = require('path');


const util_windows = function () {

  this.__clear_cache = function () {
    "use strict";
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');

  };


  this.__runCmd = function (cmd) {

    console.log('RunCmd: ' + cmd);
    if (shell.exec(cmd).code !== 0) {
      shell.echo('Error running command line:' + cmd);
      shell.exit(1);
    }

  };

  /**
   * Function:    __captureScreen => take the whole desktop screenshot, like press printscreen key
   * Parm_1:      relativeDir_filename:   relative path of the screenshot to be stored based on current working dir
   * sample:
   *      futil_windows.__captureScreen('screenshots/uar39_CheckStandardBrowserSaveOpenFileDialog.png');
   *      futil_windows.__captureScreen('screenshots/test.png "Notepad"'); // caputure window caption contains
   * Created by webber-ling on 7/5/2017.
   */

  this.__captureScreen = function (relativeDir_filename) {

    const absolutePath_exe = path.resolve(__dirname, './screenCapture.exe');
    // let absolutePath_file = path.resolve(__dirname, relativeDir_filename);

    const absolutePath_file = path.resolve(__dirname, process.cwd() + '/' + relativeDir_filename);

    const actCmd = '"' + absolutePath_exe + '"' + ' ' + '"' + absolutePath_file + '"';

    this.__runCmd(actCmd);

  };

  this.__file_exists = function (file) {

    if (fs.existsSync(file)){
      console.log('exists: ' + file);
      return true;
    }
    else{
      console.log('NOT exists: ' + file);
      return false;
    }

  };

  /**
   * Function:    __file_delete => delete file
   * Parm_1:      file: file to be deleted
   * sample:
   *      futil_windows.__file_delete('./data/out/performance_test_res_qa.xlsx');
   *
   * Created by webber-ling on 6/27/2017.
   */
  this.__file_delete = function (file) {
    if (fs.exists(file)) {
      fs.unlink(file, function (err) {
        if (err) {
          console.log('### Function: __file_delete fail to delete file <' + file + '>');
          console.log(err);
        }
        else {
          console.log('File <' + file + '> successfully deleted!');
        }
      });
    }
  };

  /**
   * Function:    __file_copy => copy file
   * Parm_1:      sourcefile: source to be copied from
   * Parm_2:      destfile: dest file to be copied to
   * sample:
   *      futil_windows.__file_copy('./data/out/performance_test_res_template.xlsx', './data/out/performance_test_res_qa.xlsx');
   *
   * Created by webber-ling on 6/27/2017.
   */
  this.__file_copy = function (sourcefile, destfile) {
    fs.createReadStream(sourcefile).pipe(fs.createWriteStream(destfile));
    browser.sleep(browser.params.userSleep.medium);

  }

};
module.exports = util_windows;


