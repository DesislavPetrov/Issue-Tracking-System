app.controller ('HomeController', ['$scope', '$location', 'authenticationService',
    function($scope, $location, authenticationService){
        if (!sessionStorage['authToken']) {
            $location.path('/login');
        }
    }]);