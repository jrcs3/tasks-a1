angular
  .module("mainModule")

  .controller("ToDoItemComponent", [
    "$scope",
    "$routeParams",
    "$location",
    "toDoService",
    function($scope, $routeParams, $location, toDoService) {
      var id = $routeParams.id;
      $scope.isLoaded = false;

      if (id == null) {
        $scope.toDo = { done: false };
        $scope.isNew = true;
        $scope.isLoaded = true;
      } else {
        toDoService.get({ id: id }, function(response) {
          $scope.toDo = response;
          $scope.isLoaded = true;
        });
      }

      $scope.updateTodo = function() {
        if ($scope.isNew) {
          toDoService
            .add($scope.toDo)
            .$promise.then(function(response) {
              $location.path("toDoList");
          });
        } else {
          toDoService
            .edit({ id: $scope.toDo.id }, $scope.toDo)
            .$promise.then(function(response) {
              $location.path("toDoList");
          });
        }
      };
    }
  ]);
