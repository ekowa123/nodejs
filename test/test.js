//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Hello Node.js', () => {
  /*
  * Test the /GET index
  */
  describe('/GET index', () => {
      it('the title should be Ahmad Ardiansyah', (done) => {
        chai.request(server)
          .get('/').end((err, res) => {
            res.should.have.status(200);
          	done();
          });
      });
  });

  /*
  * Test the /GET users
  */
  describe('/GET users', () => {
      it('the response should be an JSON', (done) => {
        chai.request(server)
          .get('/users').end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });
  });
});
