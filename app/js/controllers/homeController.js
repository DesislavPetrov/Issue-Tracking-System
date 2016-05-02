app.controller ('HomeController', ['$scope', '$location', 'authenticationService', 'ISSUES_PER_PAGE', 'issuesService',
    function($scope, $location, authenticationService, ISSUES_PER_PAGE, issuesService){
        if (!sessionStorage['authToken']) {
            $location.path('/login');
        }

        $scope.projectsParams1 = {
            'startPage': 1,
            'pageSize': ISSUES_PER_PAGE,
            'filter': ''
        };

        $scope.projectsParams2 = {
            'startPage': 1,
            'pageSize': ISSUES_PER_PAGE,
            'filter': ''
        };

        $scope.projectsParams3 = {
            'startPage': 1,
            'pageSize': ISSUES_PER_PAGE,
            'filter': ''
        };

        // The backend supports descending sorting, just add “desc” after the property (for example “IssueKey desc”)
        $scope.getIssues = function (){
            issuesService.getCurrentUserAssignedIssues('DueDate desc', $scope.projectsParams1.pageSize, $scope.projectsParams1.startPage)
                .then(function(success){
                    $scope.assignedIssues = success.Issues;
                    $scope.assignedIssuesTotalNumber = success.TotalCount;
                });
        };
        $scope.getIssues();
    }]);