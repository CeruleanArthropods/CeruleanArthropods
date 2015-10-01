// Must have MySQL and Node server running for tests to pass

// see server-spec for databases sprint
var mysql = require('mysql');
var request = require('request');
var expect = require('../node_modules/chai/chai').expect;
var server = require("../server/server.js");
// var supertest = require('supertest');



describe('Persistent Watsi Server', function() {
  var dbConnection;

  beforeEach(function(done) {

    // setup db connection
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'Watsi'
    });
    dbConnection.connect();

    var tablename = '';  // need to choose a tesing table name

    // i believe this empties the db so multiple tests won't conflict
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  // sample GET test taken from web historian  
  describe("server", function() {
    describe("GET /", function () {
      it("sample GET test", function (done) {
        request.get('/').expect(200, /<input/, done);
      });
    });



};
