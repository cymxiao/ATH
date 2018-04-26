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

const selectClient_page = function () {

    /////////////////////////               page elements            ////////////////////////////////////

    this._Client_txt = element(by.css('[class="ui-autocomplete-input ui-widget ui-widget-content ui-corner-left"]'));
    this._Client = element(by.css('[name=clientId]'));
    this._Continue = element(by.css('[type=submit]'));

    /////////////////////////               page functions            ////////////////////////////////////

    this.__setup = function(client, clickContinue=true){
        // fcommon_obj.__click('_Client', this._Client);
        // fcommon_obj.__selectByText('_Client', this._Client, client);

        fcommon_obj.__click('_Client_txt', this._Client_txt);
        fcommon_obj.__setText('_Client_txt', this._Client_txt, client);
        fcommon_obj.__click(client, element(by.cssContainingText('strong', client)), 10, 5);
        this._Client_txt.sendKeys(protractor.Key.TAB);

        if(clickContinue)
            fcommon_obj.__click('_Continue', this._Continue);
    };



};
module.exports = selectClient_page;
