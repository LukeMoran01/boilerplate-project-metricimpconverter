const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Test GET /api/convert with correct input', function(done) {
    const galToL = 3.78541;
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.returnNum, roundNumber(10/galToL, 5));
        done();
      });
  });
  test('Test GET /api/convert with invalid unit', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.strictEqual(res.text, 'invalid unit');
        done();
      });
  });
  test('Test GET /api/convert with invalid number', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.strictEqual(res.text, 'invalid number');
        done();
      });
  });
    test('Test GET /api/convert with invalid number and unit', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.strictEqual(res.text, 'invalid number and unit');
        done();
      });
  });
  test('Test GET /api/convert with no number', function(done) {
    const lbsToKg = 0.453592;
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.returnNum, roundNumber(1/lbsToKg, 5));
        done();
      });
  });
});

function roundNumber(num, dec) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}
