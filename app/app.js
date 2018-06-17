angular.module('mainModule', ['ngResource', 'ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/toDo/:id', {
                templateUrl: 'views/toDoItem.html',
                controller: 'toDoItemController'
            })
            .when('/toDoList', {
                templateUrl: 'views/toDoList.html',
                controller: 'toDoListController'
            })
            .when('/toDoAdd', {
                templateUrl: 'views/toDoItem.html',
                controller: 'toDoAddController'
            })
            .when('/people/:id', {
                templateUrl: 'views/peopleItem.html',
                controller: 'peopleItemController'
            })
            .when('/peopleList', {
                templateUrl: 'views/peopleList.html',
                controller: 'peopleListController'
            });
    }])

    .factory('toDoService', ['$resource',
        function ($resource) {
            return $resource("http://localhost:9000/ToDos/:id", null,
                {
                    'add': { method: 'POST' },
                    'edit': { method: 'PUT' },
                    'delete': { method: 'DELETE' }
                });
        }])

    .factory('peopleService', ['$resource',
        function ($resource) {
            return $resource("http://localhost:9000/People/:id");
        }])

    .controller('toDoListController', ['$scope', '$location', 'toDoService',
        function ($scope, $location, toDoService) {
            toDoService.query(
                function (response) {
                    $scope.toDoList = response;
                }
            );
            $scope.deleteToDo = function (id) {
                toDoService.delete({ id: id },
                    function () {
                        $location.path('toDoList');
                    }
                )
            }
        }])
    .controller('toDoItemController', ['$scope', '$routeParams', '$location', 'toDoService', 'peopleService',
        function ($scope, $routeParams, $location, toDoService, peopleService) {
            var id = $routeParams.id;

            peopleService.query(
                function (response) {
                    $scope.peopleList = response;

                    toDoService.get({ id: id },
                        function (response) {
                            $scope.toDo = response;
                        }
                    );
                }
            );

            $scope.updateTodo = function () {
                toDoService.edit({ id: $scope.toDo.id }, $scope.toDo)
                    .$promise.then(
                        function (response) {
                            console.log('ok: ' + response);
                            $location.path('toDoList');
                        }
                    );
            }
        }])

    .controller('peopleListController', ['$scope', 'peopleService',
        function ($scope, peopleService) {
            peopleService.query(
                function (response) {
                    $scope.peopleList = response;
                }
            );
        }])
    .controller('peopleItemController', ['$scope', '$routeParams', 'peopleService',
        function ($scope, $routeParams, peopleService) {
            var id = $routeParams.id;
            peopleService.get({ id: id },
                function (response) {
                    $scope.person = response;
                }
            );
        }])
    .controller('toDoAddController', ['$scope', '$location', 'toDoService', 'peopleService',
        function ($scope, $location, toDoService, peopleService) {
            $scope.toDo = {"done": false};
            $scope.isNew = true;
            peopleService.query(
                function (response) {
                    $scope.peopleList = response;
                }
            );
            $scope.updateTodo = function () {
                toDoService.add($scope.toDo)
                    .$promise.then(
                        function (response) {
                            console.log('ok: ' + response);
                            $location.path('toDoList');
                        }
                    );
            }
        }])
    ;
