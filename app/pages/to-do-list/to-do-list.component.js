angular.module("mainModule").controller("toDoListController", [
  "$scope",
  "$location",
  "toDoService",
  function($scope, $location, toDoService) {
    toDoService.query(function(response) {
      $scope.toDoList = response;
    });
    $scope.deleteToDo = function(id) {
      toDoService.delete({ id: id }, function() {
        $location.path("toDoList");
      });
    };
  }
]);
