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

const searchPlans_page = function () {

    /////////////////////////               page elements            ////////////////////////////////////

    this._AddPlan = element(by.cssContainingText('button', 'Add Plan'));
    this._TBL = element(by.css('[id=searchMainGrid]'));
    this._SearchOptions_Country = element(by.cssContainingText('button', 'Country'));
    this._FinancingData = element(by.cssContainingText('button', 'Financing Data'));
    this._Restore = element(by.cssContainingText('button', 'Restore'));
    this._Archive = element(by.cssContainingText('button', 'Archive'));
    this._DeletePlans = element(by.cssContainingText('button', 'Delete Plans'));


    /////////////////////////               page functions            ////////////////////////////////////

    this.__searchCountry = function(country='', clickSearch=false){


        if(country!==''){
            fcommon_obj.__click('_SearchOptions_Country_Dropdown', this._SearchOptions_Country);
            selectSearchItem(country);
            fcommon_obj.__clickButton_Common('Confirm');
        }

        if(clickSearch)
            fcommon_obj.__clickButton_Common('Search');
    };


    this.__verifySearchSelection = function(option='', value=''){
        let classID = '';
        switch (option) {
            case 'Program':
                classID='option-item option-elementProgram';
                break;
            case 'Region':
                classID='option-item option-elementTier1';
                break;
            case 'Country':
                classID='option-item option-elementTierCountry';
                break;
            case 'SBG':
                classID='option-item option-elementTier2';
                break;
            case 'SBU':
                classID='option-item option-elementTier3';
                break;
            case 'Legal Entity':
                classID='option-item option-elementTier4';
                break;
            default:
                throw new Error('Incorrect input option name [' + option + ']');
                break;
        }
        fcommon_obj.__isElementDisplayedContainingText(element(by.css('[class="' + classID + '"]')), value, option);

    };

    this.__TBL_SelectByPlanName = function(plan){

        this._TBL.element(by.tagName('tbody')).all(by.tagName('tr')).then(function (rows) {
            for(let i=0;i<rows.length;i++){
                rows[i].all(by.tagName('td')).get(5).getText().then(function(txt){
                    //if (txt.indexOf(plan) >= 0){
                    if (txt===plan){
                        fcommon_obj.__click('', element(by.css('[id=searchMainGrid]')).element(by.tagName('tbody')).all(by.tagName('tr')).get(i).all(by.tagName('td')).get(0).element(by.css('[type=checkbox]')));
                        expect(true).toBe(element(by.css('[id=searchMainGrid]')).element(by.tagName('tbody')).all(by.tagName('tr')).get(i).all(by.tagName('td')).get(0).element(by.css('[type=checkbox]')).isSelected());
                    }

                });
            }


        });


    };


    this.__TBL_OpenPlanByPlanName = function(plan){

        this._TBL.element(by.tagName('tbody')).all(by.tagName('tr')).then(function (rows) {
            for(let i=0;i<rows.length;i++){
                rows[i].all(by.tagName('td')).get(5).getText().then(function(txt){
                    //if (txt.indexOf(plan) >= 0){
                    if (txt===plan){
                        fcommon_obj.__click(plan, element(by.css('[id=searchMainGrid]')).element(by.tagName('tbody')).all(by.tagName('tr')).get(i).all(by.tagName('td')).get(5).element(by.css('[name=detail]')));
                    }

                });
            }


        });


    };

    let selectSearchItem = function(name){
        fcommon_obj.__click(name, element(by.css('[title=' + name+ ']')));
    };



};
module.exports = searchPlans_page;
