angular
  .module("mainModule")

  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider
        .when("/toDo/:id", {
          templateUrl: "pages/to-do-item/to-do-item.component.html",
          //controller: 'toDoItemController'
          controller: "ToDoItemComponent"
        })
        .when("/toDoList", {
          templateUrl: "pages/to-do-list/to-do-list.component.html",
          controller: "ToDoListComponent"
        })
        .when("/toDoAdd", {
          templateUrl: "pages/to-do-item/to-do-item.component.html",
          controller: "ToDoItemComponent"
        });
    }
  ]);
