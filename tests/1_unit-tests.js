const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('GET NUMBER', function () {
        test('Whole number', function () {
            assert.equal(3, convertHandler.getNum("3mi"));
        });
        test('Decimal number', function () {
            assert.equal(3.4, convertHandler.getNum("3.4gal"));
        });
        test('Fraction number', function () {
            assert.equal(0.2, convertHandler.getNum("1/5L"));
        });
        test('Double fraction error', function () {
            assert.throw(() => convertHandler.getNum("1/5/4kg"));
        });
        test('Default value', function () {
            assert.equal(1, convertHandler.getNum("kg"));
        });
    });

    suite('GET UNIT', function () {
        test('Unit kg', function () {
            assert.equal("kg", convertHandler.getUnit("2kg"));
        });
        test('Unit lbs', function () {
            assert.equal("lbs", convertHandler.getUnit("2lbs"));
        });
        test('Unit L', function () {
            assert.equal("L", convertHandler.getUnit("2L"));
        });
        test('Unit gal', function () {
            assert.equal("gal", convertHandler.getUnit("2gal"));
        });
        test('Unit mi', function () {
            assert.equal("mi", convertHandler.getUnit("2mi"));
        });
        test('Unit km', function () {
            assert.equal("km", convertHandler.getUnit("2km"));
        });
        test('Unit invalid', function () {
            assert.throw(() => convertHandler.getUnit("2uc"));
        });
    });

    suite('GET OUT UNIT', function () {
        test('Unit to convert kg', function () {
            assert.equal("lbs", convertHandler.getReturnUnit("kg"));
        });
        test('Unit to convert lbs', function () {
            assert.equal("kg", convertHandler.getReturnUnit("lbs"));
        });
        test('Unit to convert L', function () {
            assert.equal("gal", convertHandler.getReturnUnit("L"));
        });
        test('Unit to convert gal', function () {
            assert.equal("L", convertHandler.getReturnUnit("gal"));
        });
        test('Unit to convert mi', function () {
            assert.equal("km", convertHandler.getReturnUnit("mi"));
        });
        test('Unit to convert km', function () {
            assert.equal("mi", convertHandler.getReturnUnit("km"));
        });
    });

    suite('GET SPELL UNIT', function () {
        test('Unit spell kg', function () {
            assert.equal("kilograms", convertHandler.spellOutUnit("kg"));
        });
        test('Unit spell lbs', function () {
            assert.equal("pounds", convertHandler.spellOutUnit("lbs"));
        });
        test('Unit spell L', function () {
            assert.equal("liters", convertHandler.spellOutUnit("L"));
        });
        test('Unit spell gal', function () {
            assert.equal("gallons", convertHandler.spellOutUnit("gal"));
        });
        test('Unit spell mi', function () {
            assert.equal("kilometers", convertHandler.spellOutUnit("mi"));
        });
        test('Unit spell km', function () {
            assert.equal("miles", convertHandler.spellOutUnit("km"));
        });
    });
    suite('TRANSFORM', function () {
        test('Unit transform kg', function () {
            assert.equal(2 / 0.453592, convertHandler.convert(2, "kg"));
        });
        test('Unit transform lbs', function () {
            assert.equal(0.453592 * 2, convertHandler.convert(2, "lbs"));
        });
        test('Unit transform L', function () {
            assert.equal(2 / 3.78541, convertHandler.convert(2, "L"));
        });
        test('Unit transform gal', function () {
            assert.equal(3.78541 * 2, convertHandler.convert(2, "gal"));
        });
        test('Unit transform mi', function () {
            assert.equal(1.60934 * 2, convertHandler.convert(2, "mi"));
        });
        test('Unit transform km', function () {
            assert.equal(2 / 1.60934, convertHandler.convert(2, "km"));
        });
    });
});