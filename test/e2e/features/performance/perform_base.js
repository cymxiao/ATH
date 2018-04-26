/**
 * Created by webber-ling on 3/6/2018.
 */

"use strict";

let fs = require('fs');
let ec = protractor.ExpectedConditions;
const dateformat = require('dateformat');
let util_windows = require('../../common/utilities/util_windows');
let futil_windows = new util_windows();
let util_timer = require('../../common/utilities/util_timer');
let futil_timer = new util_timer();
let util_xlsx = require('../../common/utilities/util_xlsx');
let futil_xlsx = new util_xlsx();
let common_obj = require('../../common/common_obj');
let fcommon_obj = new common_obj();
let common_page = require('../../page-objects/common/common_page');
let pcommon_page = new common_page();
let common_test = require('../common/common_test');
let fcommon_test = new common_test();
let login = require('../../page-objects/login');
let plogin = new login();
let selectClient = require('../../page-objects/selectClient');
let pselectClient = new selectClient();
let home = require('../../page-objects/home');
let phome = new home();
let searchPlans = require('../../page-objects/searchPlans');
let psearchPlans = new searchPlans();
let reporting = require('../../page-objects/reporting');
let preporting = new reporting();
let planDetails = require('../../page-objects/planDetails');
let pplanDetails = new planDetails();
let addPlan = require('../../page-objects/addPlan');
let paddPlan = new addPlan();
let multinationalPooling = require('../../page-objects/multinationalPooling');
let pmultinationalPooling = new multinationalPooling();


const resIndex = {
    "Client": 1, "Plan": 2, "Scenario": 3, "TimeZone": 4, "Site": 5, "Server": 6, "PCName": 7,
    "Tester": 8, "User_Type": 9, "TestStart": 10, "TestEnd": 11, "StepDes": 12, "Step_14": 13,
    "Step_15": 14, "Step_16": 15, "Step_17": 16, "Step_18": 17, "Step_19": 18, "Step_20": 19,
    "Step_21": 20, "Step_22": 21, "Step_23": 22, "Step_24": 23, "Step_25": 24, "Step_26": 25,
    "Step_27": 26, "Step_28": 27, "Step_29": 28, "Step_30": 29, "Step_31": 30, "Step_32": 31,
    "Step_33": 32, "Step_34": 33, "Step_35": 34, "Step_36": 35, "Step_37": 36, "Step_38": 37,
    "Step_39": 38, "Step_40": 39, "Step_41": 40, "Step_42": 41, "Step_43": 42, "Step_44": 43,
    "Step_45": 44, "Step_46": 45, "Step_47": 46, "Step_48": 47,
};

const export_ReportName = 'TestReport_' + futil_timer.__returnYYYYMMDDHMS();
const copyPlan_PlanName = 'CopyPlanName_' + futil_timer.__returnYYYYMMDDHMS();
const addPlan_PlanName = 'AddPlanName_' + futil_timer.__returnYYYYMMDDHMS();

beforeAll(function () {
    fcommon_obj.__log('------------ before all');
});
afterAll(function () {
    fcommon_obj.__log('------------ after all');
});

const perform_base = function () {

    this.__run = function (i, td) {

        describe('Secnario: Performance Test', function () {


            it('', function () {
                console.log('=========== Iteration <' + i + '> starts');

            });

            it('-----------  Dataset => Country <' + /*td.Res_Sheet*/ +'> -----------  User Type: <' + /*td.User_Type*/ +'>  -----------', function () {
                _logBasicInfo(i, td);
            });

            it('Step_01 - Login', function () {

                futil_timer.__start();
                plogin.__login(td.Email_Address);
                pselectClient.__setup(td.Client);
                pcommon_page.__wait4Loading(phome._Title, false);
                phome.__verifyInfo(td.Client);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_14, i, 3);

            });

            it('Step_02 - Homepage report - Benefit Prevalence/select one country', function () {

                futil_timer.__start();
                phome.__setup_Right('Benefit Prevalence', td.Country_BenefitPrevalence);
                pcommon_page.__wait4Loading(phome._Reports_BenefitPrevalence_Chart, false);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_15, i, 3);

            });

            it('Step_03 - Homepage report - Benchmarking  position', function () {
                futil_timer.__start();
                phome.__setup_Right('Benchmarking Position');
                pcommon_page.__wait4Loading(phome._Reports_BenchmarkingPosition_TBL, false);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_16, i, 3);
            });

            it('Step_04 - Homepage report - Benchmarking  position/select one country', function () {
                futil_timer.__start();
                phome.__setup_Right('Benchmarking Position', td.Country_BenchmarkingPosition, false);
                pcommon_page.__wait4Loading(phome._Reports_BenchmarkingPosition_TBL, false);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_17, i, 3);
            });

            it('Step_05 - Homepage report - Renewal Status', function () {
                futil_timer.__start();
                phome.__setup_Right('Renewal Status');
                pcommon_page.__wait4Loading(phome._Reports_RenewalStatus_TBL, false);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_18, i, 3);
            });

            it('Step_06 - Homepage report - Renewal Status/select one country', function () {
                futil_timer.__start();
                phome.__setup_Right('Renewal Status', td.Country_RenewalStatus, false);
                pcommon_page.__wait4Loading(phome._Reports_RenewalStatus_TBL, false);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_19, i, 3);
            });

            it('Step_07 - Clicking from Home page to Search plans page', function () {
                futil_timer.__start();
                phome.__setup_Top('My Plans');
                pcommon_page.__wait4Loading(psearchPlans._SearchOptions_Country, false);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_20, i, 3);
            });

            it('Step_08 - Searching for 1 country', function () {

                psearchPlans.__searchCountry(td.Country_Search);
                psearchPlans.__verifySearchSelection('Country', td.Country_Search);
                futil_timer.__start();
                psearchPlans.__searchCountry('', true);
                pcommon_page.__wait4Loading(psearchPlans._AddPlan, true);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_21, i, 3);
            });

            it('Step_09 - Send one country to the report queue - time when View is ready', function () {

                psearchPlans.__TBL_SelectByPlanName(td.Plan);
                pcommon_page.__setup(true);

                futil_timer.__start();
                pcommon_page.__setup_Export(false, false, false, true, export_ReportName, false, false, true);
                fcommon_obj.__clickButton_Common('Go To Report Queue');
                fcommon_obj.__switchBrowser(preporting._Refresh, 1, 'Reporting');
                preporting.__wait4ReportComplete(export_ReportName, 50, 1);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_22, i, 3);
            });

            it('Step_10 - Deleting a report', function () {
                preporting.__deleteReport(export_ReportName);
                futil_timer.__start();
                pcommon_page.__wait4Loading(preporting._Refresh, true);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_23, i, 3);
            });

            it('Step_11 - Opening a plan', function () {
                fcommon_obj.__switchBrowser(psearchPlans._AddPlan, 0, 'Search Plans');
                psearchPlans.__TBL_OpenPlanByPlanName(td.Plan);
                futil_timer.__start();
                pcommon_page.__wait4Loading(pplanDetails._EditEntities, false);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_24, i, 3);
            });

            it('Step_12 - Saving a plan', function () {
                fcommon_obj.__click('Edit', pplanDetails._Edit);
                fcommon_obj.__selectByIndex('_PlanCurrency first item', pplanDetails._PlanCurrency, 1);
                futil_timer.__start();
                fcommon_obj.__clickButton_Common('Save');
                pcommon_page.__wait4Loading(pplanDetails._EditEntities, false);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_25, i, 3);
            });

            it('Step_13 - Copying a plan', function () {
                fcommon_obj.__click('_Copy', pplanDetails._Copy);
                pcommon_page.__Plan_SelectCountry(td.Country_BenefitPrevalence);
                pcommon_page.__Plan_SelectEntityByName('Australia Aerospace');
                fcommon_obj.__setText('_CopyPlan_PlanName', pplanDetails._CopyPlan_PlanName, copyPlan_PlanName);

                futil_timer.__start();
                fcommon_obj.__clickButton_Common('Save');
                fcommon_obj.__wait4ElementInvisible(pplanDetails._CopyPlan_Continue, 'CopyPlan dialog');
                pcommon_page.__wait4Loading(pplanDetails._EditEntities, false);
                fcommon_obj.__isElementDisplayedContainingText(pplanDetails._PlanName_Static, copyPlan_PlanName, '_PlanName_Static');
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_26, i, 3);


            });

            it('Step_14 - Back to Search Plan page', function () {

                futil_timer.__start();
                pcommon_page.__switchPage('Search');
                pcommon_page.__wait4Loading(psearchPlans._AddPlan, true);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_27, i, 3);
            });

            it('Step_15 - Delete the plan from "Search Plans" page', function () {

                psearchPlans.__TBL_SelectByPlanName(copyPlan_PlanName);
                futil_timer.__start();
                fcommon_obj.__click('_DeletePlans', psearchPlans._DeletePlans);
                fcommon_obj.__clickButton_Common('Confirm');
                pcommon_page.__wait4Loading(psearchPlans._DeletePlans, true);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_28, i, 3);
            });

            it('Step_16 - Adding a new plan', function () {

                fcommon_obj.__click('_AddPlan', psearchPlans._AddPlan);
                fcommon_obj.__switchBrowser(paddPlan._AddMultiplePlans, 2, 'Add Plan');
                pcommon_page.__wait4Loading(paddPlan._AddMultiplePlans, false);
                fcommon_obj.__selectByText('_PlanProgram', paddPlan._PlanProgram, 'Retirement');
                pcommon_page.__Plan_SelectCountry(td.Country_BenefitPrevalence);
                pcommon_page.__Plan_SelectEntityByName('Australia Aerospace');
                fcommon_obj.__setText('_CopyPlan_PlanName', paddPlan._PlanName, addPlan_PlanName);


                futil_timer.__start();
                fcommon_obj.__clickButton_Common('Save');
                pcommon_page.__wait4Loading(pplanDetails._EditEntities, true);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_29, i, 3);
            });

            it('Step_17 - Deleting a plan from "Plan Detail" page', function () {
                fcommon_obj.__click('_Delete', pplanDetails._Delete);
                futil_timer.__start();
                fcommon_obj.__click('_DeletePlan_Delete', pplanDetails._DeletePlan_Delete);
                pcommon_page.__wait4Loading(psearchPlans._AddPlan, true);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_30, i, 3);
            });

            it('Step_18 - Back to Home page', function () {

                futil_timer.__start();
                pcommon_page.__switchPage('Home');
                pcommon_page.__wait4Loading(phome._Reports_BenefitPrevalence_Chart, false);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_31, i, 3);
            });

            it('Step_19 - Open pooling module', function () {
                futil_timer.__start();
                phome.__setup_Top('Multinational Pooling');
                pcommon_page.__wait4Loading(pmultinationalPooling._Information, true);
                futil_timer.__stop2log(td.Res_File, td.Res_Sheet, resIndex.Step_32, i, 3);
            });

            it('Step_20 - Test completes', function () {

                browser.getPageSource().then(function (txt) {
                    fcommon_obj.__log(txt.substring(txt.indexOf('value=') + 7, txt.indexOf('/>') - 2));
                    futil_xlsx.__writeCell_iRow_iCol(td.Res_File, td.Res_Sheet, resIndex.Server, i, txt.substring(txt.indexOf('value=') + 7, txt.indexOf('/>') - 2));
                });
                futil_xlsx.__writeCell_iRow_iCol(td.Res_File, td.Res_Sheet, resIndex.TestEnd, i, futil_timer.__returnYYYYMMDDHMS());
            });

            it('=========================================================================================', function () {
                // browser.sleep(6000);
                console.log('=========== Iteration <' + i + '> ends');
            });

        });

    };

    let _logBasicInfo = function (i, td) {
        console.log('webber:' + td.Res_File);
        futil_xlsx.__writeCell_iRow_iCol(td.Res_File, td.Res_Sheet, resIndex.TestStart, i, futil_timer.__returnYYYYMMDDHMS());
        futil_xlsx.__writeCell_iRow_iCol(td.Res_File, td.Res_Sheet, resIndex.Client, i, td.Client);
        futil_xlsx.__writeCell_iRow_iCol(td.Res_File, td.Res_Sheet, resIndex.Tester, i, td.Email_Address);

    };


};
module.exports = perform_base;
