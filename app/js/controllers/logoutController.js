app.controller('LogoutController', ['$scope', '$location', 'notifyService',
    function($scope, $location, notifyService){
        $scope.logout = function (){
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('isAdmin');
            sessionStorage.removeItem('username');
            notifyService.showInfo("Logout successful");
        }
    }
]);