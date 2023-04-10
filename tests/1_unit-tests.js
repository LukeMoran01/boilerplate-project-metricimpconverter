const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Get Number Assertions', function(){
    test('#readsWholeNumber', function() {
      assert.strictEqual(convertHandler.getNum('1'), 1);
      assert.strictEqual(convertHandler.getNum('50'), 50);
      assert.strictEqual(convertHandler.getNum('200gal'), 200);
    });
    test('#readsDecimalNumber', function() {
      assert.strictEqual(convertHandler.getNum('1.5'), 1.5);
      assert.strictEqual(convertHandler.getNum('0.25'), 0.25);
      assert.strictEqual(convertHandler.getNum('200.035mi'), 200.035);    
    });
    test('#readsFractionalNumber', function() {
      assert.strictEqual(convertHandler.getNum('1/2'), 0.5);
      assert.strictEqual(convertHandler.getNum('10/3'), 3.33333);
      assert.strictEqual(convertHandler.getNum('100/25kg'), 4);
    });
    test('#readsFractionalDecimalNumber', function() {
      assert.strictEqual(convertHandler.getNum('1/2.5'), 0.4);
      assert.strictEqual(convertHandler.getNum('10.5/3'), 3.5);
      assert.strictEqual(convertHandler.getNum('96.25/4.5L'), 21.38889);
    });
    test('#errorDoubleFraction', function() {
      assert.throws(() => convertHandler.getNum('3/2/3'), 'Double-fraction not allowed!');
      assert.throws(() => convertHandler.getNum('10.5/3/8L'), 'Double-fraction not allowed!');
    });
    test('#defaultsTo1', function() {
      assert.strictEqual(convertHandler.getNum(''), 1);
      assert.strictEqual(convertHandler.getNum('kg'), 1);
      assert.strictEqual(convertHandler.getNum('L'), 1);
    });
  });
  
  suite('Get Unit Assertions', function() {
    test('#readsCorrectUnits', function() {
      assert.strictEqual(convertHandler.getUnit('1kg'), 'kg');
      assert.strictEqual(convertHandler.getUnit('1lbs'), 'lbs');
      assert.strictEqual(convertHandler.getUnit('1mi'), 'mi');
      assert.strictEqual(convertHandler.getUnit('1km'), 'km');
      assert.strictEqual(convertHandler.getUnit('1L'), 'L');
      assert.strictEqual(convertHandler.getUnit('1gal'), 'gal');
    });
    test('#errorsInvalidUnits', function() {
      assert.throws(() => convertHandler.getUnit('1inch'), 'Input unit is not a valid unit!');
      assert.throws(() => convertHandler.getUnit('feet'), 'Input unit is not a valid unit!');
    });
    test('#returnsCorrectUnits', function() {
      assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
      assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
      assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
      assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
      assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    });
    test('#returnsSpelledOutString', function() {
      assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
    })
  });
  
  suite('Convertion Assertions', function() {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    test('#convertGalToL', function() {
      assert.strictEqual(convertHandler.convert(5, 'gal'), roundNumber(5*galToL,5));
    });
    test('#convertLtoGal', function() {
      assert.strictEqual(convertHandler.convert(5, 'L'), roundNumber(5/galToL, 5));
    });
    test('#convertKgAndLbs', function() {
      assert.strictEqual(convertHandler.convert(5, 'kg'), roundNumber(5/lbsToKg, 5));
    });
    test('#convertLbsToKg', function() {
      assert.strictEqual(convertHandler.convert(5, 'lbs'), roundNumber(5*lbsToKg, 5));
    });
    test('#convertKmToMi', function() {
      assert.strictEqual(convertHandler.convert(5, 'km'), roundNumber(5/miToKm, 5));
    });
    test('#convertMiToKm', function() {
      assert.strictEqual(convertHandler.convert(5, 'mi'), roundNumber(5*miToKm, 5));
    });
  });
    
});

function roundNumber(num, dec) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}