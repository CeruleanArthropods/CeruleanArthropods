var db = require('../db/index.js');

module.exports.createDonation = function (req, res) {
  // Parses the data for SQL query
  var donorFirst = req.body.donor_first_name;
  var donorLast = req.body.donor_last_name;
  var email = req.body.donor_email;
  var amount = req.body.amount;
  var patientId = req.body.patient_id;

  // Creates strings for 2 SQL queries: one to create a new donation and update the patient's progress
  var queryDonation = 'INSERT INTO tbl_donations (amount, donor_first_name, donor_last_name, donor_email, patient_id) \
                      VALUES (?, ?, ?, ?, ?)';
  var queryPatient = 'UPDATE tbl_patients SET progress = progress + ? WHERE id = ?';

  // Updates the patient's progress and if successful, creates a new donation. If that is successful,
  // it sends back a 201. If errors at any point, it replies with a 404.
  db.query(queryPatient, [amount, patientId], function (err, data) {
    if( !err ) {
      db.query(queryDonation, [amount, donorFirst, donorLast, email, patientId], function (err, data) {
        if( !err ) {
          res.status(201).send(data);
        } else {
          res.status(404).send(err);
        }
      });
    } else {
      res.status(404).send(err);
    }
  });
}

module.exports.getDonations = function (req, res) {
  // Returns all donations in the donation table
  var queryStr = 'SELECT * FROM tbl_donations';

  db.query(queryStr, function (err, data) {
    if( !err ) {
      res.status(200).send(data);
    } else {
      res.status(404).send(err);
    }
  });
}
