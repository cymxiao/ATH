### Wealth IT MercerOS Node.JS / Protractor / Jasmine project template
2017-May-28    Webber.Ling@mercer.com


### Note:
====================================================================================================================
This is the sample/template project which can be used as a fresh setup of any new project under Protractor / Jasmine.
It also includes the steps to install necessary components.


### Pre-requests:
====================================================================================================================
- Install the latest LTS (stable) version of NodeJS:
https://nodejs.org/en/

- Install the latest version of the Java Platform (JDK):
http://www.oracle.com/technetwork/java/javase/downloads/index.html

- Install a code editor (WebStorm) for JavaScript:
https://www.jetbrains.com/webstorm/


### WebStorm config
====================================================================================================================
If using WebStorm as code editor then:
- Check 'file > settings > languages and frameworks > JavaScript' options:
  'JavaScript language version' = "ECMAScript 6"


### Install required NodeJS components
====================================================================================================================
- Delete any node_modules folder and all contents in this project, right click the folder and delete

- In integrated terminal (i.e. terminal in code editor in this project)
  run the following commands and check none of the commands report ANY errors:

- npm uninstall -g protractor

- npm uninstall -g webdriver-manager

- npm install -g protractor
npm install
- 

- webdriver-manager update

- npm install --save-dev shelljs

- npm install --save-dev xlsx

- npm install jasmine-data-provider

- npm install --save-dev protractor-helpers 

- npm install --save-dev protractor-take-screenshots-on-demand

- npm install --save-dev dateformat



### Start Selenium Server before running any tests
====================================================================================================================
- Expand folder "driver" under the root, right select "startSE_Webdriver.bat" and select "Show in Explorer"
- It opens the folder and double click "startSE_Webdriver.bat", it will launch a seperate command window
- Selenium server will be started automatically with state: INFO - Selenium Server is up and running

### Config test run on IE/Edge
====================================================================================================================
- Copy the IE/Edge driver from project folder 'driver' to the installation folder, for example
  C:\Users\webber-ling\AppData\Roaming\npm\
- Comment unexpected browser name in conf.js, and uncomment expected browser
Note:
    Make sure the Edge driver version number match that of the win10 version number


### steps to run the tests
====================================================================================================================
- click <Terminal> tab under the bottom of the WebStorm window to open a terminal window
- go to directory test/e2e by type in cd test\e2e, see below example:
    <Your project folder>: cd test\e2e
    for example, in my terminal window, the project locates at c:\uar\auto_uar\pwj, should type commands as below:
    C:\UAR\auto_uar_pwj>cd test\e2e
- run the specified test suite:
    -> protractor conf.js --suite=demo
    (it will run the demo test in config file)


### recommended folder structure
====================================================================================================================
http://www.protractortest.org/#/style-guide

/* recommended */

|-- project-folder
  |-- app
    |-- css
    |-- img
    |-- partials
        home.html
        profile.html
        contacts.html
    |-- js
      |-- controllers
      |-- directives
      |-- services
      app.js
      ...
    index.html
  |-- test
    |-- unit
    |-- e2e
      |-- page-objects
          home-page.js
          profile-page.js
          contacts-page.js
      home-tc_04_spec.js
      profile-tc_04_spec.js
      contacts-tc_04_spec.js

