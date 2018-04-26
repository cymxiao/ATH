/**
 * Created by webber-ling on 7/14/2017.
 */
"use strict";
const ec = protractor.ExpectedConditions;
const dateformat = require('dateformat');
const path = require('path');
const common_obj = require('../../common/common_obj');
const fcommon_obj = new common_obj();
const util_windows = require('../../common/utilities/util_windows');
const futil_windows = new util_windows();


const common_page = function () {

    /////////////////////////               page elements            ////////////////////////////////////

    this.ps_edge_DownloadToolbar_Close = '1136 698';

    this._Save = element(by.cssContainingText('button', 'Save'));

    this._Export_PlansByProgram = element(by.css('[class="ExportDialog ui-dialog-content ui-widget-content"]')).all(by.css('[name=AllProgramsByCountryReport]')).get(0);
    this._Export_PlansByCountry = element(by.css('[class="ExportDialog ui-dialog-content ui-widget-content"]')).all(by.css('[name=AllProgramsByCountryReport]')).get(1);

    this._Export_No = element(by.css('[class="ExportDialog ui-dialog-content ui-widget-content"]')).all(by.css('[name=SendToQueue]')).get(0);
    this._Export_Yes = element(by.css('[class="ExportDialog ui-dialog-content ui-widget-content"]')).all(by.css('[name=SendToQueue]')).get(1);
    this._Export_Yes_ReportName = element(by.css('[name=textboxfilename]'));

    this._Export_ForImport = element(by.css('[class="ExportDialog ui-dialog-content ui-widget-content"]')).element(by.css('[id=ReportcheckForImport]')).element(by.css('[id=Importcheck]'));
    this._Export_IncludeStatutory = element(by.css('[class="ExportDialog ui-dialog-content ui-widget-content"]')).element(by.css('[id=ReportcheckSTPractice]')).element(by.css('[id=STPracticecheck]'));


    /////////////////////////               page functions            ////////////////////////////////////

    this.__setup = function (clickExport = false) {

        if (clickExport)
            fcommon_obj.__clickButton_Common('Export');

    };

    this.__switchPage = function(name){
        fcommon_obj.__click(name, element(by.css('[id=breadcrumb]')).all(by.cssContainingText('a', name)).filter(function (elem, index) {
            return elem.isDisplayed().then(function (visible) {
                // __log(name + ': ' + index + ' visible: ' + visible);
                return visible === true;
            });
        }).first());
    };


    this.__setup_Export = function (clickPlansByProgram = false, clickPlansByCountry = false, clickNo = false, clickYes = false, fileName = '', bForImport = false, bIncludeStatutory = false, clickConinue = true) {

        if(clickPlansByProgram)
            fcommon_obj.__click('_Export_PlansByProgram', this._Export_PlansByProgram);
        if(clickPlansByCountry)
            fcommon_obj.__click('_Export_PlansByCountry', this._Export_PlansByCountry);
        if(clickNo)
            fcommon_obj.__click('_Export_No', this._Export_No);
        if(clickYes){
            fcommon_obj.__click('_Export_Yes', this._Export_Yes);
            fcommon_obj.__setText('_Export_Yes_ReportName', this._Export_Yes_ReportName, fileName);
        }


        if(bForImport){
            fcommon_obj.__click('_Export_ForImport', this._Export_ForImport);
            fcommon_obj.__isCheckBoxChecked(this._Export_ForImport, '_Export_ForImport', true);
        }
        if(bIncludeStatutory){
            fcommon_obj.__click('_Export_IncludeStatutory', this._Export_IncludeStatutory);
            fcommon_obj.__isCheckBoxChecked(this._Export_IncludeStatutory, '_Export_IncludeStatutory', true);
        }


        if (clickConinue)
            fcommon_obj.__clickButton_Common('Continue');

    };

    this.__wait4Loading = function (el, bCheckLoading = true) {

        let iLoadingAppear = 0;
        let iLoadingDisappear = 0;

        // for(let i=1;i<=iteration;i++){

        // browser.sleep(1000);

        // let loader =  element.all(by.cssContainingText('div', 'Loading...')).get(0);
        let loader = element.all(by.css('[class="bg-win-common-thinking"]')).get(0);

        if (bCheckLoading) {
            browser.wait(ec.visibilityOf(loader), 300000).then(function () {
                console.log('..... Loading Start.....: ' + ++iLoadingAppear);
            });

            browser.wait(ec.invisibilityOf(loader), 300000).then(function () {
                console.log('..... Loading Complete.....: ' + ++iLoadingDisappear);
            });
        }

        // browser.wait(ec.elementToBeClickable(this._BottomMenu_PrivacyPolicy), 50000, 'page not ready');
        if (el != null)
            browser.wait(ec.elementToBeClickable(el), 300000, 'page not ready');


        browser.sleep(3000);
        // }


    };

    this.__Plan_SelectCountry = function (country, gridIndex = 1) {

        // element.all(by.css('[class="mercer-grid"]')).then(function(all){
        //   fcommon_obj.__log(all.length);
        //   for(let i=0;i<all.length;i++){
        //     all[i].isDisplayed().then(function(visible){
        //       fcommon_obj.__log(i + ': ' + visible);
        //     });
        //   }
        // });

        let mercerGrid_index = gridIndex;

        fcommon_obj.__isElementEnabled(element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')), '__copyPlan_SelectCountry');

        element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).then(function (rows) {
            for (let i = 0; i < rows.length; i++) {
                rows[i].all(by.tagName('td')).get(2).getText().then(function (txt) {
                    // fcommon_obj.__log(i+ ' ' + txt);
                    if (txt === country) {
                        fcommon_obj.__click(country, element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).get(i).all(by.tagName('td')).get(1).element(by.css('[type=checkbox]')));
                        fcommon_obj.__isCheckBoxChecked(element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).get(i).all(by.tagName('td')).get(1).element(by.css('[type=checkbox]')), country, true);
                    }
                });
            }


        });
        fcommon_obj.__click('Continue', element(by.css('[id="planEntityInfo"]')).element(by.cssContainingText('button', 'Continue')));
    };

    

    this.__Plan_SelectEntityByName = function (entity, gridIndex = 3) {

        let mercerGrid_index = gridIndex;


        // element.all(by.css('[class="mercer-grid"]')).then(function(all){
        //   fcommon_obj.__log(all.length);
        //   for(let i=0;i<all.length;i++){
        //     all[i].isDisplayed().then(function(visible){
        //       fcommon_obj.__log(i + ': ' + visible);
        //     });
        //
        //       all[i].all(by.tagName('tr')).all(by.tagName('td')).then(function(cols){
        //           fcommon_obj.__log(i + ': ' + cols.length);
        //       });
        //   }
        // });

        // element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).all(by.tagName('tr')).get(0).all(by.tagName('th')).then(function(col){
        //     for(let i=0;i<col.length;i++){
        //         col[i].getText().then(function(txt){
        //             console.log(i + ': ' + txt)
        //         })
        //     }
        // });

        browser.sleep(3000);
        for (let i = 0; i < 10; i++) {
            element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).then(function (rows) {
                if (rows.length < 2)
                    browser.sleep(browser.params.userSleep.short);
            });

        } // wait for table data refreshing

        element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).then(function (rows) {
            fcommon_obj.__log('total: ' + rows.length);
            for (let i = 0; i < rows.length; i++) {
                // rows[i].getText().then(function(txt){
                //     fcommon_obj.__log(i + ' ' + txt);
                // });
                rows[i].all(by.tagName('td')).get(6).getText().then(function (txt) {
                    fcommon_obj.__log(i + ' ' + txt);
                    if (txt === entity) {
                        fcommon_obj.__click(entity, element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).get(i).all(by.tagName('td')).get(1).element(by.css('[type=checkbox]')));
                        fcommon_obj.__isCheckBoxChecked(element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).get(i).all(by.tagName('td')).get(1).element(by.css('[type=checkbox]')), entity, true);
                    }
                });
            }


        });
    };

    this.__Plan_SelectEntityByIndex = function (index = 0, gridIndex = 3) {

        let mercerGrid_index = gridIndex;
        browser.sleep(browser.params.userSleep.medium);

        for (let i = 0; i < 10; i++) {
            element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).then(function (rows) {
                if (rows.length < 2)
                    browser.sleep(browser.params.userSleep.short);
            });

        } // wait for table data refreshing
        element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).then(function (rows) {

            rows[index].all(by.tagName('td')).get(6).getText().then(function (txt) {
                // fcommon_obj.__log(i + ' ' + txt);
                if (txt === entity) {
                    fcommon_obj.__click(index, element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).get(index).all(by.tagName('td')).get(1).element(by.css('[type=checkbox]')));
                    fcommon_obj.__isCheckBoxChecked(element.all(by.css('[class="mercer-grid"]')).get(mercerGrid_index).element(by.tagName('tbody')).all(by.tagName('tr')).get(index).all(by.tagName('td')).get(1).element(by.css('[type=checkbox]')), index, true);
                }
            });
        });
    };

    // element.all(by.cssContainingText('button', 'Cancel')).then(function(all){
    //   fcommon_obj.__log(all.length);
    //   for(let i=0;i<all.length;i++){
    //     all[i].isDisplayed().then(function(visible){
    //       fcommon_obj.__log(i + ': ' + visible);
    //     });
    //   }
    // });


};
module.exports = common_page;
