/**
 * Created by webber-ling on 4/20/2018.
 */
"use strict";
const ec = protractor.ExpectedConditions;
let util_windows = require('../common/utilities/util_windows');
let futil_windows = new util_windows();
let common_obj = require('../common/common_obj');
let fcommon_obj = new common_obj();
let common_page = require('./common/common_page');
let pcommon_page = new common_page();

const planDetails_page = function () {

    /////////////////////////               page elements            ////////////////////////////////////

    this._Bookmarks = element(by.cssContainingText('span', 'Bookmarks'));
    this._PlanName_Static = element(by.css('[class="plannamebody"]'));
    this._Add = element(by.cssContainingText('button', 'Add'));
    this._Delete = element.all(by.cssContainingText('button', 'Delete')).first();
    this._Copy = element(by.cssContainingText('button', 'Copy'));
    this._Edit = element(by.cssContainingText('button', 'Edit'));
    this._EditEntities = element(by.css('[title="Edit Entities"]'));
    this._PlanCurrency = element(by.css('[name="Detail.CurrentCurrency.planCurrency"]'));

    this._CopyPlan_PlanName = element(by.css('[id="planBasicInfo"]')).element(by.css('[id="planNameValue"]'));
    this._CopyPlan_Continue = element(by.css('[id="planEntityInfo"]')).element(by.cssContainingText('button', 'Continue'));

    this._DeletePlan_Delete =  element.all(by.cssContainingText('button', 'Delete')).get(4);

    /////////////////////////               page functions            ////////////////////////////////////

    // this.__debug = function(name){
    //     element.all(by.cssContainingText('button', name)).then(function (all) {
    //         fcommon_obj.__log('Button: ' + name + ' total instance: ' + all.length);
    //         for (let i = 0; i < all.length; i++) {
    //             all[i].isDisplayed().then(function (visible) {
    //                 fcommon_obj.__log(name + ': ' + i + ' visible: ' + visible);
    //             });
    //         }
    //     });
    // };


};
module.exports = planDetails_page;