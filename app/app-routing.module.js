angular.module('mainModule')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/toDo/:id', {
                templateUrl: 'pages/to-do-item/to-do-item.component.html',
                controller: 'toDoItemController'
            })
            .when('/toDoList', {
                templateUrl: 'pages/to-do-list/to-do-list.component.html',
                controller: 'toDoListController'
            })
            .when('/toDoAdd', {
                templateUrl: 'pages/to-do-item/to-do-item.component.html',
                controller: 'toDoAddController'
            })
            ;
    }])
