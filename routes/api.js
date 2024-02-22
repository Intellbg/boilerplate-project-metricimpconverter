'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  app.get("/api/convert", function (req, res) {
    let input = req.query.input;
    let num;
    let unit;
    try {
      num = convertHandler.getNum(input)
    } catch (error) {
      num = false
    }
    try {
      unit = convertHandler.getUnit(input)
    } catch (error) {
      unit = false
    }
    if (!unit & !num) {
      return res.json('invalid number and unit')
    }
    if (!unit) {
      return res.json('invalid unit')
    }
    if (!num) {
      return res.json('invalid number')
    }
    let value = convertHandler.convert(num, unit)
    let valueUnit = convertHandler.getReturnUnit(unit)
    return res.status(200).send(
      {
        initNum: num,
        initUnit: unit,
        returnNum: value,
        returnUnit: valueUnit,
        string: convertHandler.getString(
          num, 
          convertHandler.spellOutUnit(unit), 
          value, 
          convertHandler.spellOutUnit(valueUnit)
        )
      }
    )
  })
};
