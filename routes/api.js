'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let num;
    let initUnit; 
    
    // Done so can error for both unit and number if needed
    try {
      num = convertHandler.getNum(input);
    } catch (e) {
      try {
        initUnit = convertHandler.getUnit(input);
      } catch (e) {
        return res.send('invalid number and unit')
      }
      return res.send('invalid number');
    }
    
    try {
      initUnit = convertHandler.getUnit(input);
    } catch (e) {
      return res.send('invalid unit');
    }
    
    let retUnit = convertHandler.getReturnUnit(initUnit);
    let conversion = convertHandler.convert(num, initUnit);
    let outString = convertHandler.getString(num, initUnit, conversion, retUnit);
    return res.json({
      initNum: num,
      initUnit: initUnit,
      returnNum: conversion,
      returnUnit: retUnit,
      string: outString
    });
  });

};
