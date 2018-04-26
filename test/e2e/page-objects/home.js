/**
 * Created by webber-ling on 4/19/2018.
 */

"use strict";
const ec = protractor.ExpectedConditions;
let util_windows = require('../common/utilities/util_windows');
let futil_windows = new util_windows();
let common_obj = require('../common/common_obj');
let fcommon_obj = new common_obj();
let common_page = require('./common/common_page');
let pcommon_page = new common_page();

const home_page = function () {

    /////////////////////////               page elements            ////////////////////////////////////

    this._Title = element(by.cssContainingText('h1', 'My Homepage'));
    this._Client = element(by.css('[title="Click to switch client."]'));
    this._Reports = element(by.css('[name=reportList]'));
    this._Reports_Country = element(by.css('[name=sccountryList]'));
    this._Reports_BenefitPrevalence_Country = element(by.css('[name=countryList]'));
    this._Reports_BenefitPrevalence_Chart = element(by.css('[id=homeChart]'));
    this._Reports_BenchmarkingPosition_TBL = element(by.css('[id=tbl_Benchmarking]'));
    this._Reports_RenewalStatus_TBL = element(by.css('[id=tbl_RenewalStd]'));

    /////////////////////////               page functions            ////////////////////////////////////

    this.__verifyInfo = function (client = '') {
        if (client !== '')
            fcommon_obj.__isElementDisplayedContainingText(this._Client, client, '_Client');
    };


    this.__setup_Right = function (reports = '', country = '', bBenefitPrevalence = true) {
        fcommon_obj.__selectByText('_Reports', this._Reports, reports);
        if(bBenefitPrevalence)
            fcommon_obj.__selectByText(country, this._Reports_BenefitPrevalence_Country, country);
        else
            fcommon_obj.__selectByText(country, this._Reports_Country, country);

        // fcommon_obj.__click(country, element.all(by.css('[name$=countryList]')).filter(function (elem, index) {
        //     return elem.isDisplayed().then(function (visible) {
        //         // __log(name + ': ' + index + ' visible: ' + visible);
        //         return visible === true;
        //     });
        // }).first());

    };


    this.__setup_Left = function (planName='', clickGo=false, clickSearch4Plan=false, clickAddUser=false, clickAddPlan=false) {


    };

    this.__setup_Top = function (linkName) {
        fcommon_obj.__click(linkName, element(by.cssContainingText('span', linkName)));
    };


};
module.exports = home_page;
