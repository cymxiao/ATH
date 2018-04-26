/**
 * Created by webber-ling on 4/18/2018.
 */


"use strict";
const ec = protractor.ExpectedConditions;
let util_windows = require('../common/utilities/util_windows');
let futil_windows = new util_windows();
let common_obj = require('../common/common_obj');
let fcommon_obj = new common_obj();
let common_page = require('./common/common_page');
let pcommon_page = new common_page();

const login_page = function () {

    /////////////////////////               page elements            ////////////////////////////////////

    this._EmailAddress = element(by.css('[name=Username]'));
    this._Continue = element(by.css('[id=clickMe]'));

    /////////////////////////               page functions            ////////////////////////////////////

    this.__login = function(email){
        fcommon_obj.__setText('_EmailAddress', this._EmailAddress, email);
        fcommon_obj.__click('_Continue', this._Continue);
    };


    this.__wait4PageReady = function() {
        pcommon_page.__wait4PageReady('SSO', this._EmailAddress);
    };


    this.__wait4LicenseAgreement = function() {


        let el = element(by.cssContainingText('strong', 'Mercer Globe™'));
        browser.wait(ec.visibilityOf(el), 300000).then(function () {
        });

        fcommon_obj.__click('License Agreement Content - Mercer Globe', el);

        for(let i=0;i<60;i++)
            browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
        //element(by.cssContainingText('strong', 'Mercer Globe™')).sendKeys(protractor.Key.PAGE_DOWN);

        pcommon_page.__wait4PageReady('_License_Accept', this._License_Accept);
    };



    this.__logout = function(){

        fcommon_obj.__click('_Logout', pcommon_page._Logout);

    };


};
module.exports = login_page;
