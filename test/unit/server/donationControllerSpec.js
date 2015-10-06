var expect = require('chai').expect;
var db = require('../../server/db/index');
var donationController = require('../../server/donations/donationController');
var Promise = require('bluebird');

var queryWithPromise = Promise.promisify(db.query, db);

describe('Donation Controller', function () {

  beforeEach(function (done) {
    var tables = ['tbl_patients', 'tbl_donations'];
    var queryPromises = [];

    tables.forEach(function (table, ind) {
      queryPromises.push(queryWithPromise('TRUNCATE ' + table));
    });

    Promise.all(queryPromises)
      .then(function () {
        console.log('hi');
        done();
      });
  });

  describe('createDonation method', function () {
    var testPatientId = 1;
    beforeEach(function (done) {
      var patientQueryStr = 'INSERT INTO tbl_patients (first_name, last_name, email, \
                            password, condition_id, photo_url, bio, goal) \
                            VALUES ( ?,  ?,  ?,  ?,  ?,  ?,  ?,  ?)';
      var patientVals = ['Test', 'Bot', 'testbot@bot.com', '123', 1, '', 'he\'s a great guy!', '10000'];
      queryWithPromise(patientQueryStr, patientVals)
        .then(function(data) {
          testPatientId = data[0].insertId;
          return queryWithPromise('TRUNCATE tbl_donations')
        })
        .then(function() {
          done();
        })
    })

    it('should create a new donation', function (done) {
      var req = {
        body: {
          donor_first_name: 'Money',
          donor_last_name: 'Bot',
          donor_email: 'moneybot@bot.com',
          amount: 100,
          patient_id: testPatientId
        }
      }
      var res = {
        status: function () {
          return this;
        },
        send: function (data) {
          testDonationId = data.insertId;
          checkDonation();
        }
      }
      var testDonationId;
      var checkDonation = function () {
        queryStr = 'SELECT * from tbl_donations WHERE id = ? LIMIT 1';
        queryWithPromise(queryStr, testDonationId)
          .then(function (result) {
            var donation = result[0][0];
            expect(donation.donor_first_name).to.equal('Money');
            expect(donation.donor_last_name).to.equal('Bot');
            expect(donation.donor_email).to.equal('moneybot@bot.com');
            expect(donation.amount).to.equal(100)
            expect(donation.patient_id).to.equal(testPatientId);
            done();
          })
      }

      donationController.createDonation(req, res);
    })

  });

  describe('getDonations method', function () {

    var testPatientId = 1;
    beforeEach(function (done) {
      var patientQueryStr = 'INSERT INTO tbl_patients (first_name, last_name, email, \
                            password, condition_id, photo_url, bio, goal) \
                            VALUES ( ?,  ?,  ?,  ?,  ?,  ?,  ?,  ?)';
      var patientVals = ['Test', 'Bot', 'testbot@bot.com', '123', 1, '', 'he\'s a great guy!', '10000'];
      queryWithPromise(patientQueryStr, patientVals)
        .then(function(data) {
          testPatientId = data[0].insertId;
          return queryWithPromise('TRUNCATE tbl_donations')
        })
        .then(function() {
          done();
        })
    });

    it('should return all stored donations', function (done) {
      var donationQueryStrOne ='INSERT INTO tbl_donations (amount, donor_first_name, donor_last_name, donor_email, patient_id) \
                                VALUES (?, ?, ?, ?, ?)';
      var donationQueryStrTwo = 'INSERT INTO tbl_donations (amount, donor_first_name, donor_last_name, donor_email, patient_id) \
                                VALUES (?, ?, ?, ?, ?)';
      var donationValsOne = [100, 'Caesar', 'Bot', 'caesarbot@bot.com', testPatientId];
      var donationValsTwo = [200, 'Pizza', 'Bot', 'pizzapizza@bot.com', testPatientId];
      donationPromises = [
        queryWithPromise(donationQueryStrOne, donationValsOne),
        queryWithPromise(donationQueryStrTwo, donationValsTwo)
      ];

      var res = {
        status: function () {
          return this;
        },
        send: function(data) {
          expect(data[0].donor_first_name).to.equal('Caesar');
          expect(data[1].donor_first_name).to.equal('Pizza');
          done();
        }
      }

      Promise.all(donationPromises)
        .then(function () {
          donationController.getDonations(null, res);
        });


    });
  });
});
