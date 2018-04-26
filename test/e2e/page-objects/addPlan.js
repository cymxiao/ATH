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

const addPlan_page = function () {

    /////////////////////////               page elements            ////////////////////////////////////

    this._AddMultiplePlans = element(by.cssContainingText('button', 'Add Multiple Plans'));
    this._PlanProgram = element(by.css('[id="planProgramSelection"]'));
    this._PlanCurrency = element(by.css('[id="planCurrencySelection"]'));
    this._RegularPlan = element(by.cssContainingText('label', 'Regular Plan')).element(by.css('[name="planType"]'));
    this._NoCompanyBenefitProvided = element(by.cssContainingText('label', 'No Company Benefit Provided')).element(by.css('[name="planType"]'));
    this._PlanName = element(by.css('[id="planNameValue"]'));
    this._AddPlan_Continue = element(by.css('[id="planEntityInfo"]')).element(by.cssContainingText('button', 'Continue'));


    /////////////////////////               page functions            ////////////////////////////////////



};
module.exports = addPlan_page;

