var db = require('../db/index.js');
var formidable = require('formidable');


module.exports = {

  getPhotoUrlById:function(id, cb) {

    var query = "SELECT * FROM tbl_patient_photos WHERE id = ?";

    db.query(query, id, function (err, data) {
      if(!err) {
        cb(data);
      }else {
        console.log('error selected photo');
      }

    });

  },

  addNewPatientPhoto:function(url, cb) {
    var query = "INSERT INTO tbl_patient_photos (photo_url) VALUES( ? )";

    db.query(query, url ,function (err, data) {
      if(!err) {
        cb && cb(data);
      }
      else {
        console.log('error adding patient photo');
      }
    });
  },

  addNewPatient:function(req, res) {
    console.log('new form post');
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/../uploads/";
    form.keepExtensions = true;

    var insertNewPatient = function(vals) {
      console.log('inserting new patient');
      var sqlquery = "INSERT INTO tbl_patients (first_name, last_name, username, \
        password, condition_id, photo_url, bio, progress, goal, funded) \
        VALUES ( ?,  ?,  ?,  ?,  ?,  ?,  ?,  ?,  ?,  ?)";

      db.query(sqlquery, vals, function(err, data){
        if(!err) {
          res.status(201).send(data);
        } else {
          console.log('error adding patient', err);
          res.status(500).send('<h1>error adding patient</h1>' + err);
        }
      });
    };

    form.parse(req, function ( err, fields, files) {
      var oldFilePath = files['photo_id'].path;
      var newPatientFields = [fields.first_name, fields.last_name,fields.username,
        fields.password, fields.condition_id, oldFilePath,
        fields.bio, fields.progress,fields.goal, 
        fields.funded
      ];
      insertNewPatient(newPatientFields);
    });


  },

  getPatients: function(req, res) {
    var query = "SELECT * FROM tbl_patients";
    db.query(query, function(err, data){
      if(!err) {
        res.status(200).send(JSON.stringify(data));
      } else {
        res.status(404).send('<h1>error</h1>');
      }
    });
  },

  getPatientById: function(req, res, cb) {
    var query = "SELECT * FROM tbl_patients WHERE id = ? ";
    db.query(query,req.id, function(err, data){
      if(!err) {
        cb && cb(data);
        res.status(200).send(JSON.stringify(data));
      } else {
        res.status(404).send('<h1>error</h1>');
      }
    });
  }



};
