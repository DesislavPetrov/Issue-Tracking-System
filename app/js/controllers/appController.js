app.controller('AppController', ['$scope', 'authenticationService',
    function($scope, authenticationService){
        $scope.authenticationService = authenticationService;
    }]);