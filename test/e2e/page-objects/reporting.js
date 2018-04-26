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

const reporting_page = function () {

    /////////////////////////               page elements            ////////////////////////////////////

    this._Refresh = element(by.cssContainingText('button', 'Refresh'));
    this._TBL_ReportQueue = element(by.css('[id=grdReportQueue]'));


    /////////////////////////               page functions            ////////////////////////////////////


    this.__wait4ReportComplete = function (description, totalCount, currentCount) {
        let self = this;

        if (currentCount < totalCount) {

            // for(let i=0;i<10;i++){
            //     this._TBL_ReportQueue.element(by.tagName('tbody')).all(by.tagName('tr')).then(function(rows){
            //        if(rows.length<=5)
            //            browser.sleep(1000);
            //     });
            // }///// wait for table fully loaded, not needed

            return this._TBL_ReportQueue.element(by.tagName('tbody')).all(by.tagName('tr')).then(function(rows){
                // for(let i=0;i<5;i++){
                    rows[0].all(by.tagName('td')).get(1).getText().then(function(txt){
                        if(txt===description){
                            element(by.css('[id=grdReportQueue]')).element(by.tagName('tbody')).all(by.tagName('tr')).get(0).all(by.tagName('td')).get(4).getText().then(function(status){
                                if(status!=='COMPLETED'){
                                    fcommon_obj.__log('loop in process: ' + currentCount);
                                    fcommon_obj.__click('_Refresh', element(by.cssContainingText('button', 'Refresh')));
                                    pcommon_page.__wait4Loading(null, true);
                                    self.__wait4ReportComplete(description, totalCount, currentCount+1);
                                }
                            });

                        }
                    })
                // }
            });

            // return el.isPresent().then(function (present) {
            //     if (!present) {
            //         fcommon_obj.__log('loop in process: ' + currentCount);
            //
            //         //// steps inside the loop - start
            //         browser.driver.navigate().refresh();
            //         pcommon_page.__wait4Loading(null, true);
            //         browser.sleep(2000);
            //         //// steps inside the loop - end
            //
            //         self.__wait4ReportComplete(description, totalCount, currentCount+1);
            //     }
            //     else{
            //         fcommon_obj.__log('loop completed:' + currentCount);
            //     }
            // })
        }
        else {
            fcommon_obj.__log('loop reach to max: ' + totalCount);
            throw new Error('Function  __wait4ReportComplete failed because condition NOT meet in time');

        }
    };

    this.__deleteReport = function (description) {
        this._TBL_ReportQueue.element(by.tagName('tbody')).all(by.tagName('tr')).then(function(rows){

            for(let i=0;i<rows.length;i++){
            rows[i].all(by.tagName('td')).get(1).getText().then(function(txt){
                if(txt===description){
                    fcommon_obj.__click('delete row: ' + i, element(by.css('[id=grdReportQueue]')).element(by.tagName('tbody')).all(by.tagName('tr')).get(i).all(by.tagName('td')).get(6).element(by.css('[alt=Edit]')));
                    fcommon_obj.__clickButton_Common('Delete');
                    // pcommon_page.__wait4Loading(element(by.cssContainingText('button', 'Refresh')), true);
                    // element(by.css('[id=grdReportQueue]')).element(by.tagName('tbody')).all(by.tagName('tr')).get(i).getText().then(function(txt){
                    //    expect(txt).not.toBe(description);
                    // });
                }
            })
            }

        });


    };

};
module.exports = reporting_page;