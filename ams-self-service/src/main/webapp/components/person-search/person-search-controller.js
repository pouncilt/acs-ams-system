/**
 * Created by tonte on 10/14/15.
 */
vaPersonSearchModule.controller('PersonSearchController', ['$scope', '$location', '$q', '$uibModal', 'NgTableParams', 'PersonSearchService', function ($scope, $location, $q, $uibModal, NgTableParams, PersonSearchService) {
    var unattendedSearch = (Object.isDefined($scope.staffInfo) && Object.isDefined($scope.veteranInfo))? true: false;

    $scope.errorMessageExist = false;
    $scope.errorMessage = {value: null};
    $scope.personSearchCompleted = false;
    $scope.searchCriteria = {
        ssn: null,
        firstName: null,
        lastName: null,
        middleName: null,
        dob: null,
        gender: null,
        primaryPhoneNumber: null,
        streetAddress: null,
        city: null,
        state: null,
        zipcode: null
    };
    $scope.selectedPerson = new VAPerson().toUIObject();
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.navigateTo = function (path) {
        $scope.errorMessageExist = false;
        $scope.errorMessage.value = null;
        $location.path(path);
    };

    $scope.reset = function(form) {
        $scope.searchCriteriaInfo = {};

        if(form) {
            form.$setPristine();
            form.$setTouched();
        }
    };

    $scope.isUnattendedSearch = function () {
        return Object.isDefined($scope.staffInfo);
    };

    $scope.search = function (vaPersonSearchCriteriaInfo) {
        var requestParameters = {
            searchCriteria: vaPersonSearchCriteriaInfo,
            unattendedSearch: (this.isUnattendedSearch())? true: false
        };

        PersonSearchService.query(requestParameters).then(function (searchResults) {
            $scope.personSearchCompleted = false;

            if(Object.isArray(searchResults) && searchResults.length > 0) {
                if(unattendedSearch) {
                    displaySearchResults(searchResults);
                } else {
                    $scope.personSearchCompleted = true;
                }


            } else {
                var msg = "No match found.  Please review the data below to ensure it is correct and complete.<br>";
                    msg += "The person you want to act as a Delegate may not be in VA's records.  If you think this is the case, please have them go to [link] and register.";
                $scope.errorMessageExist = true;
                $scope.errorMessage.value = msg;
            }

        }, function (error) {
            $scope.personSearchCompleted = false;
            $scope.errorMessageExist = true;
            $scope.errorMessage.value = error;
        });
    };

    var displaySearchResults = function (searchResults) {
        var modalInstance = $uibModal.open({
            templateUrl: 'components/person-search/partials/person-search-result-template.html',
            controller: 'PersonSearchResultModalController',
            controllerAs: 'personSearchResultModalController',
            size: 'lg',
            resolve: {
                items: function () {
                    return searchResults;
                }
            }
        });

        modalInstance.result.then(function (selectedPerson) {
            console.log("selectedPerson:" + selectedPerson);
            $scope.selectedPerson = new VAPerson(selectedPerson).toUIObject();
            $scope.personSearchCompleted = true;
        }, function(error){
            $scope.personSearchCompleted = false;
        });
    };
}]);