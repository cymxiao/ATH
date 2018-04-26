/**
 * Created by webber-ling on 7/3/2017.
 */

"use strict";

const ec = protractor.ExpectedConditions;
const dateformat = require('dateformat');
const common_obj = require('../../common/common_obj');
const fcommon_obj = new common_obj();
const common_page = require('../../page-objects/common/common_page');
const pcommon_page = new common_page();


const common_test = function () {

    this.__failStubTest = function (text = 'write test') {
        // this test is designed always to fail - will be used to ensure all test stubs default to failure
        // this is only 1 line of code but it ensures all stub tests fail in the same way
        expect('1').toEqual(text);
    };

    this.__passTestAsNotATest = function (text = 'not a test so always passes') {
        // use this when tests can be passed as the phrase has already been effectively passed earlier in the script
        // this is only 1 line of code but it ensures all such tests pass in the same way

        expect(text).toEqual(text);
    };




};
module.exports = common_test;
