var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap']);

app.constant('BASE_SERVICE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('PASSWORD_MIN_LENGTH', 6);
app.constant('PASSWORD_MAX_LENGTH', 100);
app.constant('ISSUES_PER_PAGE', 10);

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
        controller : 'LoginController'
    });

    $routeProvider.when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/logout', {
        controller: 'LogoutController',
        redirectTo: '#/login'
    });

    $routeProvider.when('/profile/password', {
        templateUrl: 'app/views/passwordChange.html',
        controller: 'PasswordChangeController'
    });

    $routeProvider.when('/projects/:id', {
        templateUrl : 'app/views/project.html',
        controller : 'ProjectController'
    });

    $routeProvider.when('/issues/:id/edit', {
        templateUrl : 'app/views/edit-issue.html',
        controller : 'EditIssueController'
    });

    $routeProvider.when('/issues/:id', {
        templateUrl : 'app/views/issue.html',
        controller : 'IssuesController'
    });

    $routeProvider.when('/projects/:id/edit', {
        templateUrl : 'app/views/edit-project.html',
        controller : 'EditProjectController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );
}]);