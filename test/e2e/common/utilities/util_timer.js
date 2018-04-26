/**
 * Created by webber-ling on 6/23/2017.
 */
"use strict";

const util_xlsx = require('../../common/utilities/util_xlsx');
const futil_xlsx = new util_xlsx();
const common_obj = require('../../common/common_obj');
const fcommon_obj = new common_obj();

const util_timer = function () {

    let elapsed_time = 0;
    let start_time;
    let end_time;

    this.__start = function () {
        browser.controlFlow().execute(function () {
            start_time = new Date().getTime();
            // fcommon_obj.__log('time start:' + start_time);
        });
    };

    this.__stop = function (description = 'step name', iAdjustNum = 0) {
        browser.controlFlow().execute(function () {
            end_time = new Date().getTime();
            elapsed_time = end_time - start_time - iAdjustNum * 1000;

            fcommon_obj.__log('****** Step <' + description + '>:  elapsed time:' + elapsed_time / 1000);
        });

    };

    this.__stop2log = function (filename, sheetname, iRow, iCol, iAdjustNum = 0) {
        browser.controlFlow().execute(function () {
            end_time = new Date().getTime();
            elapsed_time = end_time - start_time - iAdjustNum * 1000;

            futil_xlsx.__writeCell_iRow_iCol(filename, sheetname, iRow, iCol, elapsed_time / 1000);
            fcommon_obj.__log('Step elapsed time:' + elapsed_time / 1000);

        });

    };

    const _returnYYYYMMDDHMS = function () {

        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yy = today.getFullYear();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;
        if (h < 10)
            h = '0' + h;
        if (m < 10)
            m = '0' + m;
        if (s < 10)
            s = '0' + s;

        const value = yy.toString() + mm.toString() + dd.toString() + '_' + h.toString() + m.toString() + s.toString();

        return value;

    };

    this.__returnYYYYMMDDHMS = function () {
        return _returnYYYYMMDDHMS();

    };

    this.__returnDDMMYYYY = function (connect = '') {

        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yy = today.getFullYear();

        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;

        const value = dd + connect + mm + connect + yy;

        return value;
    };

    this.__returnDDMMYYYY_NextMonth = function (connect = '') {

        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yy = today.getFullYear();

        if (mm === 12)
            mm = 1;
        else
            mm = mm + 1;

        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;

        const value = dd + connect + mm + connect + yy;

        return value;
    };

    this.__returnTodaysDay = function () {

        const today = new Date();
        const dd = today.getDate();

        const value = dd;

        return value.toString();
    };

    this.__returnTodaysMonth = function () {

        const today = new Date();
        let mm = today.getMonth() + 1;

        const value = mm;

        return value.toString();
    };

};
module.exports = util_timer;
