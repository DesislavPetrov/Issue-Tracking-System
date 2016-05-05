app.controller('LogoutController', ['$scope', '$location', 'notifyService',
    function($scope, $location, notifyService){
        $scope.logout = function (){
            sessionStorage.clear();
            notifyService.showInfo("Logout successful");
        }
    }
]);