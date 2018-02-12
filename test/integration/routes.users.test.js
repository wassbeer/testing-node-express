process.env.NODE_ENV = 'test';

const chai = require('chai'),
should = chai.should(),
chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app'),
knex = require('../../src/server/db/knex');

describe('routes : users', () => {

  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest() // use latest table migration
      .then(() => {
        knex.seed.run() // seed the db table
        .then(() => {
          done();
        })
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback() // reverses migration
    .then(() => {
      done();
    });
  });

});

describe('GET /api/v1/users', () => {
  it('should respond with all users', (done) => {
    chai.request(server)
    .get('/api/v1/users')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('application/json');
      // the JSON response body should have a
      // key-value pair of {"status": "success"}
      res.body.status.should.eql('success');
      // the JSON response body should have a
      // key-value pair of {"data": [2 user objects]}
      res.body.data.length.should.eql(2);
      // the first object in the data array should
      // have the right keys
      res.body.data[0].should.include.keys(
        'id', 'username', 'email', 'created_at'
      );
      done();
    });
  });
});
