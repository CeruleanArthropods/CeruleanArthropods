'use strict';

describe('the patientsFactory', function() {
  var patientsFactory, $httpBackend;

  beforeEach(module('eir'));

  beforeEach(inject(function ($injector) {
    patientsFactory = $injector.get('patientsFactory');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('submitPatientForm', function() {
    it('expect submitPatientForm to exist', function() {
      expect(patientsFactory.submitPatientForm).to.be.a('function');
    });
  });

  describe('getPatients', function() {
    it('should exist', function() {

    });
  });

  describe('getPatient', function() {
    it('should exist', function() {

    });
  });
});
