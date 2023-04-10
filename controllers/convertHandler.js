function ConvertHandler() {

  this.getNum = function(input) {
    const pattern = /^[^a-zA-Z]*/;
    let numString = input.match(pattern)[0];
    let numSplit = numString.split('/');
    let result;
    if (numSplit.length > 2) {
      throw new Error('Double-fraction not allowed!');
    } else if (numSplit.length === 2) {
      result = +numSplit[0] / +numSplit[1];
    } else {
      if (numString === '') result = 1;
      else result = +numString;
    };
    return roundNumber(result, 5);
  };
  
  this.getUnit = function(input) {
    const pattern = /[a-zA-Z]*$/;
    const validUnits = ['L', 'GAL', 'MI', 'KM', 'LBS', 'KG']
    let result = input.match(pattern)[0].toUpperCase();
    if (!validUnits.includes(result)) {
      throw new Error('Input unit is not a valid unit!');
    }
    return result === 'L' ? result : result.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = '';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'L':
        result = 'liters';
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = '';
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum*galToL;
        break;
      case 'L':
        result = initNum/galToL;
        break;
      case 'lbs':
        result = initNum*lbsToKg;
        break;
      case 'kg':
        result = initNum/lbsToKg;
        break;
      case 'mi':
        result = initNum*miToKm;
        break;
      case 'km':
        result = initNum/miToKm;
        break;
      default:
        result = 0;
    }
    return roundNumber(result, 5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

function roundNumber(num, dec) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

module.exports = ConvertHandler;
