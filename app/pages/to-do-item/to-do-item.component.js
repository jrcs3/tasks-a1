angular
  .module("mainModule")
  .controller("toDoItemController", [
    "$scope",
    "$routeParams",
    "$location",
    "toDoService",
    function($scope, $routeParams, $location, toDoService) {
      var id = $routeParams.id;

      $scope.isLoaded = false;

      toDoService.get({ id: id }, function(response) {
        $scope.toDo = response;
        $scope.isLoaded = true;
      });

      $scope.updateTodo = function() {
        toDoService
          .edit({ id: $scope.toDo.id }, $scope.toDo)
          .$promise.then(function(response) {
            console.log("ok: " + response);
            $location.path("toDoList");
          });
      };
    }
  ])
  .controller("toDoAddController", [
    "$scope",
    "$location",
    "toDoService",
    function($scope, $location, toDoService) {
      $scope.toDo = { done: false };
      $scope.isNew = true;
      $scope.isLoaded = true;

      $scope.updateTodo = function() {
        toDoService.add($scope.toDo).$promise.then(function(response) {
          console.log("ok: " + response);
          $location.path("toDoList");
        });
      };
    }
  ]);
