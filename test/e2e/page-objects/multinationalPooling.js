/**
 * Created by webber-ling on 4/23/2018.
 */
"use strict";
const ec = protractor.ExpectedConditions;
let util_windows = require('../common/utilities/util_windows');
let futil_windows = new util_windows();
let common_obj = require('../common/common_obj');
let fcommon_obj = new common_obj();
let common_page = require('./common/common_page');
let pcommon_page = new common_page();

const multinationalPooling_page = function () {

    /////////////////////////               page elements            ////////////////////////////////////

    this._Information = element(by.cssContainingText('button', 'Information'));


    /////////////////////////               page functions            ////////////////////////////////////




};
module.exports = multinationalPooling_page;
