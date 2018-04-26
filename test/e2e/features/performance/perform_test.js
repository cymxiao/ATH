/**
 * Created by webber-ling on 3/6/2018.
 */
"use strict";

let util_timer = require('../../common/utilities/util_timer');
let futil_timer = new util_timer();
let util_windows = require('../../common/utilities/util_windows');
let futil_windows = new util_windows();
let common_obj = require('../../common/common_obj');
let fcommon_obj = new common_obj();
let perform_base = require('./perform_base');
let fperform_base = new perform_base();
let util_xlsx = require('../../common/utilities/util_xlsx');
let futil_xlsx = new util_xlsx();
let login = require('../../page-objects/login');
let plogin = new login();



let resFile = {
    "Template": "./auto_goldplus/test/e2e/data/in/performance_test_res_template.xlsx",
    "QA": "./auto_goldplus/test/e2e/data/out/performance_test_QA.xlsx",
    "Prod": "./auto_goldplus/test/e2e/data/out/performance_test_Prod.xlsx",
    "UAT": "./auto_goldplus/test/e2e/data/out/performance_test_UAT.xlsx",
    "P11": "./auto_goldplus/test/e2e/data/out/performance_test_P11.xlsx",

};

let currentRes;


let td_QA = [

    ////////////////////////////////                    ////////////////////////////////

    {"Site": "QA", "URL": browser.params.url.url_qa, "Res_File": resFile.QA, "Res_Sheet": "sheet1",
        "Email_Address": browser.params.qa.email, "Client": browser.params.qa.client,
        "Country_BenefitPrevalence": "Australia", "Country_BenchmarkingPosition": "Canada",
        "Country_RenewalStatus": "Australia", "Country_Search": "Australia", "Plan": "Death and TPD",
    },


];
let td_UAT = [

    ////////////////////////////////                    ////////////////////////////////

    {"Site": "UAT", "URL": browser.params.url.url_uat, "Res_File": resFile.UAT, "Res_Sheet": "sheet1",
        "Email_Address": browser.params.uat.email, "Client": browser.params.uat.client,
        "Country_BenefitPrevalence": "Australia", "Country_BenchmarkingPosition": "Canada",
        "Country_RenewalStatus": "Australia", "Country_Search": "Australia", "Plan": "Death and TPD",
    },


];
let td_PROD = [

    ////////////////////////////////                    ////////////////////////////////

    {"Site": "Production", "URL": browser.params.url.url_prod, "Res_File": resFile.PROD, "Res_Sheet": "sheet1",
        "Email_Address": browser.params.prod.email, "Client": browser.params.prod.client,
        "Country_BenefitPrevalence": "Australia", "Country_BenchmarkingPosition": "Canada",
        "Country_RenewalStatus": "Australia", "Country_Search": "Australia", "Plan": "Retrenchment policy",
    },


];

beforeAll(function () {
    console.log('------------ before all');
});
afterAll(function () {
    console.log('------------ after all');

});

const td = td_UAT;

describe('Secnario: Performance Test Summary - QA', function () {


    it('Login MG+ Home', function () {
        _login(td);
    });


    for (let i = 0; i < td.length; i++) {

        fperform_base.__run(parseInt(i) + 1, td[i]);

    }

    it('Backup results', function () {
        futil_windows.__file_copy(currentRes, currentRes.replace('.xlsx', futil_timer.__returnYYYYMMDDHMS() + '.xlsx'));
    });



});


let _setEnvironmentRes = function (testData) {


    if (testData.Site === 'QA') {
        currentRes = resFile.QA;
    }
    else if (testData.Site === 'Production') {
        currentRes = resFile.Prod;
    }
    else if (testData.Site === 'UAT') {
        currentRes = resFile.UAT;
    }
    else if (testData.Site === 'P11') {
        currentRes = resFile.P11;
    }

    else {
        console.log('### Invalid SiteName: ' + testData.Site);
        process.exit(0);

    }

    futil_windows.__file_delete(currentRes);
    futil_windows.__file_copy(resFile.Template, currentRes);

};

let _login = function (testData) {

    _setEnvironmentRes(testData[0]);

    browser.get(testData[0].URL);
    fcommon_obj.__wait4ElementVisible(plogin._EmailAddress, '_EmailAddress');
};


