function ConvertHandler() {
  ALLOWED_UNITS = ['gal', 'mi', 'km', 'lbs', 'kg','l']

  this.getNum = function (input) {
    const pattern = new RegExp(ALLOWED_UNITS.join('|'), 'gi');
    input = input.replace(pattern, '');
    fraction = input.split('/')
    let result
    if (fraction.length > 1) {
      if (fraction.length > 2) {
        throw Error("invalid number")
      }
      result = parseFloat(fraction[0]) / parseFloat(fraction[1]);
    } else {
      result = parseFloat(input);
    }
    if (isNaN(result)) {
      return 1;
    }
    return result;
  };

  this.getUnit = function (input) {
    input = input.toLowerCase()
    let result = ALLOWED_UNITS.find(element => {
      const pattern = new RegExp(`${element}$`, 'i');
      if (!pattern.test(input)) {
        return null;
      }
      return input.match(pattern)[0];
    })
    if (!result){
      throw new Error("invalid unit")
    }
    return result=='l'?"L":result
  };

  this.getReturnUnit = function (initUnit) {
    initUnit = initUnit.toLowerCase()
    let translateUnits = {
      gal: "L",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    }
    return translateUnits[initUnit]
  };

  this.spellOutUnit = function (unit) {
    unit = unit.toLowerCase()
    let translateUnit = {
      gal: "gallons",
      l: "liters",
      km: "kilometers",
      mi: "miles",
      kg: "kilograms",
      lbs: "pounds",
    }
    return translateUnit[unit];
  };

  this.convert = function (initNum, initUnit) {
    initUnit = initUnit.toLowerCase()
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let factor = {
      gal: galToL,
      l: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
    }
    return parseFloat((initNum * factor[initUnit]).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
  };

}

module.exports = ConvertHandler;
