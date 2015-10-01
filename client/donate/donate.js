angular.module('eir.donate', ['ngRoute'])

.controller('donateCtrl', function ($scope, patientsFactory, donorsFactory, $routeParams) {

  $scope.patient = {};
  $scope.donor = {};

  // this will allow you to display patient info on the donate page
  patientsFactory.getPatient($routeParams.id)
    .then(function(res) {
      $scope.patient = res[0];
    })
    .catch(function(err) {
      console.log('ERROR patientsFactory.getPatient: ' + err);
    });


  // on form submit, send the new donor info to the server; POST req
  $scope.handleSubmit = function(newDonor) {
    newDonor.patient_id = $routeParams.id;

    donorsFactory.submitDonationForm(newDonor)
      .then(function(res) {
        $scope.donor = {};

      })
      .catch(function(err) {
        console.log('ERROR donorsFactory.submitDonationForm: ', err)
      });
  };
});
