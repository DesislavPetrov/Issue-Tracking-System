app.controller('LogoutController', ['$scope', '$location', 'notifyService',
    function($scope, $location, notifyService){
        $scope.logout = function (){
            sessionStorage.removeItem('authToken');
            notifyService.showInfo("Logout successful");
        }
    }
]);