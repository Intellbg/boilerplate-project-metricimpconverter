function ConvertHandler() {
  ALLOWED_UNITS = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']

  this.getNum = function (input) {
    const pattern = new RegExp(ALLOWED_UNITS.join('|'), 'gi');
    input = input.replace(pattern, '');
    fraction = input.split('/')
    let result
    if (fraction.length > 1) {
      if (fraction.length > 2) {
        throw Error("Invalid Input: double-fraction")
      }
      result = parseFloat(fraction[0]) / parseFloat(fraction[1]);
    } else {
      result = parseFloat(input);
    }
    if (result < 0) {
      throw Error("Invalid Input: negative")
    }
    if (isNaN(result)) {
      return 1;
    }
    return result;
  };

  this.getUnit = function (input) {
    let result = ALLOWED_UNITS.find(element => input.includes(element));
    if (result === undefined) {
      throw Error("Invalid Input")
    }
    return result
  };

  this.getReturnUnit = function (initUnit) {
    let translateUnits = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    }
    return translateUnits[initUnit]
  };

  this.spellOutUnit = function (unit) {
    let translateUnit = {
      gal: "gallons",
      L: "liters",
      mi: "kilometers",
      km: "miles",
      kg: "kilograms",
      lbs: "pounds",
    }
    return translateUnit[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let factor = {
      gal: galToL,
      L: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
    }
    return initNum * factor[initUnit];
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
  };

}

module.exports = ConvertHandler;
