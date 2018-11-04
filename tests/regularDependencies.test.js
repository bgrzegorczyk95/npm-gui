const api = require('supertest');
const { expect } = require('chai');
const { app } = require('../server');
const { npmGuiTestsPackage } = require('./npmGuiTestsPackage');

const testProjectPathEncoded = 'dGVzdC1wcm9qZWN0';

describe('Regular Packages', () => {
  describe('installing single', () => {
    it('should install new package', (done) => {
      api(app)
        .post(`/api/project/${testProjectPathEncoded}/dependencies/regular/npm`)
        .send([{ packageName: 'npm-gui-tests', version: '1.0.0' }])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({});
          done();
        });
    }).timeout(40000);

    it('should return all packages (and new one)', (done) => {
      api(app)
        .get(`/api/project/${testProjectPathEncoded}/dependencies/regular`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.include(npmGuiTestsPackage);
          done();
        });
    }).timeout(40000);
  });

  describe('installing many', () => {
    it('should install new packages', (done) => {
      api(app)
        .post(`/api/project/${testProjectPathEncoded}/dependencies/regular/npm`)
        .send([{ packageName: 'npm-gui-tests', version: '1.0.0' }, { packageName: 'npm-gui-tests', version: '1.0.0' }])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({});
          done();
        });
    }).timeout(40000);

    it('should return all packages (and new one)', (done) => {
      api(app)
        .get(`/api/project/${testProjectPathEncoded}/dependencies/regular`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.include(npmGuiTestsPackage);
          done();
        });
    }).timeout(40000);
  });

  describe('uninstalling', () => {
    it('should remove previously installed package', (done) => {
      api(app)
        .delete(`/api/project/${testProjectPathEncoded}/dependencies/regular/npm/npm-gui-tests`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({});
          done();
        });
    }).timeout(40000);

    it('should return all packages (without new one)', (done) => {
      api(app)
        .get(`/api/project/${testProjectPathEncoded}/dependencies/regular`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.not.include(npmGuiTestsPackage);
          done();
        });
    }).timeout(40000);
  });
});
