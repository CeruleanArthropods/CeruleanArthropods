angular.module('eir.patients', [])

.controller('patientsCtrl', function($scope, patientsFactory) {

  $scope.patients = patientsFactory.patients;

  // $scope.patients = {
  //   patients: [],
  //   getPatients: function() {}
  // }

  




});
