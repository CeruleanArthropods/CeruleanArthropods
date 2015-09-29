angular.module('eir.donate', ['ngRoute'])

.controller('donateCtrl', function($scope, patientsFactory, $routeParams){

  $scope.patient = {};

  patientsFactory.getPatient($routeParams.id)
    .then(function(res) {
      $scope.patient.id = res[0].id;
      $scope.patient.username = res[0].username;
      $scope.patient.first_name = res[0].first_name;
      $scope.patient.last_name = res[0].last_name;
      $scope.patient.bio = res[0].bio;
      $scope.patient.goal = res[0].goal;
      $scope.patient.progress = res[0].progress;
      $scope.patient.funded = res[0].funded;
      $scope.patient.condition_id = res[0].condition_id;
      $scope.patient.photo_id = res[0].photo_id;
    })
    .catch(function(err) {
      console.log('ERROR donate.js: ' + err);
    });
});
