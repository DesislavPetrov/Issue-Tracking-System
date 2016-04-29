var app = angular.module('app', ['ngRoute', 'ngResource']);

app.constant('BASE_SERVICE_URL', 'http://softuni-issue-tracker.azurewebsites.net');
app.constant('PASSWORD_MIN_LENGTH', 6);
app.constant('PASSWORD_MAX_LENGTH', 100);

app.config(['$routeProvider', function ($routeProvider){

    $routeProvider.when('/', {
        templateUrl: 'app/views/welcome.html',
        controller: 'WelcomeController'
    });

    $routeProvider.when('/login', {
        templateUrl : 'app/views/login.html',
        controller : 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl : 'app/views/register.html',
        controller : 'RegisterController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );
}]);