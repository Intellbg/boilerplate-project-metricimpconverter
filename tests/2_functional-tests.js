const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Valid input', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=10L')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, `10 L converts to ${10 / 3.78541} gal`);
                done();
            });
    });

    test('Invalid input', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 400);
                done();
            });
    });
    test('Invalid number', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 400);
                done();
            });
    });
    test('Invalid number and unit', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?32g')
            .end(function (err, res) {
                assert.equal(res.status, 400);
                done();
            });
    });
    test('No number', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, `1 kg converts to ${1 / 0.453592} lbs`);
                done();
            });
    });
});
