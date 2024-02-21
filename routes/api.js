'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  app.get("/api/convert", function (req, res) {
    let input = req.query.input;
    try {
      let num = convertHandler.getNum(input)
      let unit = convertHandler.getUnit(input)
      let value = convertHandler.convert(num, unit)
      let valueUnit = convertHandler.getReturnUnit(unit)
      return res.status(200).send(convertHandler.getString(num, unit, value, valueUnit))
    } catch (error) {
      return res.status(400).send(error)
    }
  })
};
