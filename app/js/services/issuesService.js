app.factory('issuesService', ['$http', '$q', 'BASE_SERVICE_URL', 'headerService',
    function ($http, $q, BASE_SERVICE_URL, headerService){
        function getCurrentUserAssignedIssues (orderBy, pageSize, pageNumber){
            var issuesUrl = BASE_SERVICE_URL + 'issues/me?orderBy=' + orderBy;
            if(pageSize){
                issuesUrl += '&pageSize=' + pageSize;
            }
            if(pageNumber){
                issuesUrl += '&pageNumber=' + pageNumber;
            }

            var deferred = $q.defer();
            $http.get(issuesUrl, headerService.getAuthHeader())
                .then(function(success){
                    deferred.resolve(success.data);
                }, function (error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getAllIssuesForOneProject (projectId){
            var deferred = $q.defer();
            var projectUrl = BASE_SERVICE_URL + 'projects/' + projectId + '/issues';
            $http.get(projectUrl, headerService.getAuthHeader())
                .then(function(success){
                    deferred.resolve(success.data);
                }, function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function addIssue (title, description, dueDate, projectid, assigneeId, priorityId, labels){
            var issue = {
                Title : title,
                Description : description,
                DueDate : dueDate,
                ProjectId : projectid,
                AssigneeId : assigneeId,
                PriorityId : priorityId,
                Labels : []
            };

            labels.forEach(function (issueName){
                issue.Labels.push({Name:issueName})
            });

            var deferred = $q.defer();
            $http.post(BASE_SERVICE_URL + 'issues/', issue, headerService.getAuthHeader())
                .then(function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIssueById (id){
            var deferred = $q.defer();
            var issueUrl = BASE_SERVICE_URL + 'issues/' + id;
            $http.get(issueUrl, headerService.getAuthHeader())
                .then(function(success){
                    deferred.resolve(success.data);
                }, function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function updateIssue(id, title, description, dueDate, assigneeId, priorityId, labels){
            var issue = {
                Title : title,
                Description : description,
                DueDate : dueDate,
                AssigneeId : assigneeId,
                PriorityId : priorityId,
                Labels : []
            };

            labels.forEach(function(label){
                issue.Labels.push({Name : label});
            });

            var deferred = $q.defer();
            var issueUrl = BASE_SERVICE_URL + 'issues/' + id;
            $http.put(issueUrl, headerService.getAuthHeader())
                .then(function(success){
                    deferred.resolve(success.data);
                }, function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getComments(issueId){
            var commentsUrl = BASE_SERVICE_URL + 'issues/' + issueId + '/comments';
            var deferred = $q.defer();
            $http.get(commentsUrl, headerService.getAuthHeader())
                .then(function(success){
                    deferred.resolve(success.data);
                }, function(error){
                    deferred.error(error);
                });
            return deferred.promise;
        }


        function addComment(issueId, commentText){
            var commentsUrl = BASE_SERVICE_URL + 'issues/' + issueId + '/comments';
            var deferred = $q.defer();
            $http.post(commentsUrl, {Text : commentText}, headerService.getAuthHeader())
                .then(function(success){
                    deferred.resolve(success.data);
                }, function (error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }


        return {
            getCurrentUserAssignedIssues : getCurrentUserAssignedIssues,
            addIssue : addIssue,
            getAllIssuesForOneProject : getAllIssuesForOneProject,
            getIssueById : getIssueById,
            updateIssue : updateIssue,
            getComments : getComments,
            addComment : addComment
        }
    }
]);