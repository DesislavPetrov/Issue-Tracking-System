app.directive('navigationDirective', [function(){
    return {
        restrict : 'A',
        templateUrl : 'app/views/navigation.html',
        link : function (scope){
            scope.hasLogged = function (){
                return sessionStorage['authToken'];
            }
        }
    }
}]);