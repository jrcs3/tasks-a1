angular.module('mainModule')
    .constant("baseURL", "http://localhost:9000/")
    .factory('toDoService', ['$resource', 'baseURL',
    function ($resource, baseURL) {
        return $resource(baseURL + "ToDos/:id", null,
        {
            'add': { method: 'POST' },
            'edit': { method: 'PUT' },
            'delete': { method: 'DELETE' }
        });
    }])
;