angular.module('eir.getFunded', [])

.controller('getFundedCtrl', function ($scope, patientsFactory) {

  $scope.patient = {};

  // when patient clicks submit button when they sign up
  $scope.handleSubmit = function(newPatient) {

    // invoke the this method and pass in the form submission data
    patientsFactory.submitPatientForm(newPatient)
      .then(function(res) {

        // reset the patient form upon submission
        $scope.patient = {};
        
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
