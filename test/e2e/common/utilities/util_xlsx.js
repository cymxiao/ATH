/**
 * Created by webber-ling on 6/23/2017.
 */
"use strict";

const xlsx = require('xlsx');
const common_obj = require('../common_obj');
const fcommon_obj = new common_obj();

const util_xlsx = function () {


  const xlsx_alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


  /**
   * Function:    __readSheetName => return sheet name by index
   * Parm_1:      filename: excel file name with directory
   * Parm_2:      sheetindex: sheet index
   * sample:
   *      console.log(futil_xlsx.__readSheetName('./features/debug/test.xlsx', 0));
   *
   * Created by webber-ling on 6/22/2017.
   */
  this.__readSheetName = function (filename, sheetindex) {
    const workbook = xlsx.readFile(filename);
    // fcommon_obj.__log(workbook.SheetNames[sheetindex]);
    const sheetname = workbook.SheetNames[sheetindex];
    if (sheetname === null)
      fcommon_obj.__log('### Function < __readSheetName > Fail to get sheet by index <' + sheetindex + '>. Return <null>');
    else
      return sheetname;
  };


  /**
   * Function:    __readCell_ByCellName => return cell value from excel
   * Parm_1:      filename: excel file name with directory
   * Parm_2:      sheetname: excel sheet name
   * Parm_3:      cellname:  excel call name, e.g. 'A1'
   * sample:
   *      console.log(futil_xlsx.__readCell_ByCellName('./features/debug/test.xlsx', 'Sheet1', 'A1'));
   *
   * Created by webber-ling on 6/22/2017.
   */
  this.__readCell_ByCellName = function (filename, sheetname, cellname) {
    const workbook = xlsx.readFile(filename);
    const worksheet = workbook.Sheets[sheetname];
    const cell = worksheet[cellname];
    const value = (cell ? cell.v : undefined);
    // fcommon_obj.__log(value);
    return value;
  };


  /**
   * Function:    __writeCell_ByCellName => write cell value into excel
   * Parm_1:      filename: excel file name with directory
   * Parm_2:      sheetname: excel sheet name
   * Parm_3:      cellname:  excel call name, e.g. 'A1'
   * Parm_4:      cellvalue: value to write
   * sample:
   *      futil_xlsx.__writeCell_ByCellName('./features/debug/test.xlsx', 'Sheet1', 'A1', 'test');
   *
   * Created by webber-ling on 6/22/2017.
   */
  this.__writeCell_ByCellName = function (filename, sheetname, cellname, cellvalue) {
    const workbook = xlsx.readFile(filename);
    const worksheet = workbook.Sheets[sheetname];
    let cell = worksheet[cellname];
    if (!cell)
      cell = worksheet[cellname] = {t: 's'};
    cell.v = cellvalue;
    xlsx.writeFile(workbook, filename);

  };

  /**
   * Function:    __readCell_iRow_sCol => read xlsx cell value
   * Parm_1:      filename:   excel file name with directory
   * Parm_2:      sheetname:  excel sheet name
   * Parm_3:      iDataRow:   index of data row
   * Parm_4:      sCol:       column name
   * Parm_5:      iFrom:      optional, column index to search from, default=1 (from first column)
   * sample:
   *      console.log(futil_xlsx.__readCell_iRow_sCol('./features/debug/test.xlsx', 'Sheet1', 1, 'Name'));
   *
   * Created by webber-ling on 6/22/2017.
   */
  this.__readCell_iRow_sCol = function (filename, sheetname, iDataRow, sCol, iFrom = 1) {
    iDataRow++; // data row start from excel row 2, row 1 is header

    const cellcol = this.__readCellCol_iRow_sCol(filename, sheetname, sCol, iFrom);

    const workbook = xlsx.readFile(filename);
    const worksheet = workbook.Sheets[sheetname];
    let cell = worksheet[cellcol + iDataRow.toString()];
    if (!cell)
      cell = worksheet[cellcol + iDataRow.toString()] = {t: 's'};
    const value = (cell ? cell.v : undefined);
    fcommon_obj.__log(sCol + ' == ' + value);
    return value;
  };


  /**
   * Function:    __writeCell_iRow_sCol => write xlsx cell value
   * Parm_1:      filename:   excel file name with directory
   * Parm_2:      sheetname:  excel sheet name
   * Parm_3:      iDataRow:   index of data row
   * Parm_4:      sCol:       column name
   * Parm_5:      sCellValue: value to be written to excel
   * Parm_6:      iFrom:      optional, column index to search from, default=1 (from first column)
   * sample:
   *      futil_xlsx.__writeCell_iRow_sCol('./features/debug/test.xlsx', 'Sheet1', 3, 'Name', 'webber3');
   *
   * Created by webber-ling on 6/22/2017.
   */
  this.__writeCell_iRow_sCol = function (filename, sheetname, iDataRow, sCol, sCellValue, iFrom = 1) {
    iDataRow++; // data row start from excel row 2, row 1 is header

    const cellcol = this.__readCellCol_iRow_sCol(filename, sheetname, sCol, iFrom);

    const workbook = xlsx.readFile(filename);
    const worksheet = workbook.Sheets[sheetname];
    let cell = worksheet[cellcol + iDataRow.toString()];
    if (!cell)
      cell = worksheet[cellcol + iDataRow.toString()] = {t: 's'};
    cell.v = sCellValue;
    xlsx.writeFile(workbook, filename);
  };

  /**
   * Function:    __writeCell_iRow_iCol => write xlsx cell value
   * Parm_1:      filename:   excel file name with directory
   * Parm_2:      sheetname:  excel sheet name
   * Parm_3:      iDataRow:   index of data row
   * Parm_4:      iCol:       index of data col
   * Parm_5:      sCellValue: value to be written to excel
   * sample:
   *      futil_xlsx.__writeCell_iRow_iCol('./features/debug/test.xlsx', 'Sheet1', 3, 5, 'webber3');
   *
   * Created by webber-ling on 6/26/2017.
   */
  this.__writeCell_iRow_iCol = function (filename, sheetname, iDataRow, iCol, sCellValue) {
    iDataRow++; // data row start from excel row 2, row 1 is header


    const colMapping = [
      {"Name": "A"}, {"Name": "B"}, {"Name": "C"}, {"Name": "D"}, {"Name": "E"}, {"Name": "F"},
      {"Name": "G"}, {"Name": "H"}, {"Name": "I"}, {"Name": "J"}, {"Name": "K"}, {"Name": "L"},
      {"Name": "M"}, {"Name": "N"}, {"Name": "O"}, {"Name": "P"}, {"Name": "Q"}, {"Name": "R"},
      {"Name": "S"}, {"Name": "T"}, {"Name": "U"}, {"Name": "V"}, {"Name": "W"}, {"Name": "X"},
      {"Name": "Y"}, {"Name": "Z"},
      {"Name": "AA"}, {"Name": "AB"}, {"Name": "AC"}, {"Name": "AD"}, {"Name": "AE"},
      {"Name": "AF"}, {"Name": "AG"}, {"Name": "AH"}, {"Name": "AI"}, {"Name": "AJ"},
      {"Name": "AK"}, {"Name": "AL"}, {"Name": "AM"}, {"Name": "AN"}, {"Name": "AO"},
      {"Name": "AP"}, {"Name": "AQ"}, {"Name": "AR"}, {"Name": "AS"}, {"Name": "AT"},
      {"Name": "AU"}, {"Name": "AV"}, {"Name": "AW"}, {"Name": "AX"}, {"Name": "AY"},
      {"Name": "AZ"}
    ];

    const cellcol = colMapping[iCol].Name;

    const workbook = xlsx.readFile(filename);
    const worksheet = workbook.Sheets[sheetname];
    let cell = worksheet[cellcol + iDataRow.toString()];

    if (!cell)
      cell = worksheet[cellcol + iDataRow.toString()] = {t: 's'};

    cell.v = sCellValue;
    xlsx.writeFile(workbook, filename);
  };

  /**
   * Function:    __readCellCol_iRow_sCol => return the actual colname in excel,e.g 'A', 'F'
   * Parm_1:      filename:   excel file name with directory
   * Parm_2:      sheetname:  excel sheet name
   * Parm_3:      sCol:       column name
   * Parm_4:      iFrom:      optional, column index to search from, default=1 (from first column)
   * sample:
   *      console.log(futil_xlsx.__readCellCol_iRow_sCol('./features/debug/test.xlsx', 'Sheet1', 'Name'));
   *
   * Created by webber-ling on 6/22/2017.
   */
  this.__readCellCol_iRow_sCol = function (filename, sheetname, sCol, iFrom = 0) {
    const workbook = xlsx.readFile(filename);
    const worksheet = workbook.Sheets[sheetname];
    let actCellname = 'na';
    let actCellCol = 'na';
    for (let i=iFrom;i<xlsx_alphabet.length;i++) {
      let cell = worksheet[xlsx_alphabet[i] + '1'];
      if (!cell)
        cell = worksheet[xlsx_alphabet[i] + '1'] = {t: 's'};
      const value = (cell ? cell.v : undefined);


      if (value === sCol) {
        actCellname = value;
        actCellCol = xlsx_alphabet[i];
        break;
      }
    }
    if (actCellname !== sCol)
      fcommon_obj.__log('### Function < __readCellCol_iRow_sCol > Fail to get cell with column <' + sCol + '>.');
    else
      return actCellCol;
  }
};
module.exports = util_xlsx;
