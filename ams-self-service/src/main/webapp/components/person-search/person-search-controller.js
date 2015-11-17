/**
 * Created by tonte on 10/14/15.
 */
vaPersonSearchModule.controller('PersonSearchController', ['$scope', '$location', '$route', '$q', '$uibModal', 'NgTableParams', 'PersonSearchService', function ($scope, $location, $route, $q, $uibModal, NgTableParams, PersonSearchService) {
    //var attendedSearch = (Object.isDefined($scope.staffInfo) && Object.isDefined($scope.veteranInfo))? true: false;
    var attendedSearch = ($route.current.attendedSearch === "true") ? true : false;

    $scope.errorMessageExist = false;
    $scope.errorMessage = {value: null};
    $scope.personSearchCompleted = false;
    $scope.vaPersonSearchCriteriaInfo = {
        person: {
            ssn: null,
            firstName: null,
            lastName: null,
            middleName: null,
            birthDate: null,
            gender: null,
            phones: [
                {
                    phoneNumber: null,
                    numberType: null
                }

            ],
            addresses: [
                {
                    street1: null,
                    street2: null,
                    city: null,
                    state: null,
                    zip: null
                }
            ]
        },
        attendedSearch: false
    };
    $scope.selectedPerson = new VAPerson().toUIObject();
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.navigateTo = function (path) {
        $scope.errorMessageExist = false;
        $scope.errorMessage.value = null;
        $location.path(path);
    };

    $scope.resetForm = function (form) {
        $scope.vaPersonSearchCriteriaInfoInfo = {
            person: {
                addresses: [],
                phoneNumbers: [],
                icn: [],
                edipi: []

            },
            attendedSearch: false
        };

        if(form) {
            form.$setPristine();
            form.$setTouched();
        }
    };

    $scope.isAttendedSearch = function () {
        return Object.isDefined($scope.staffInfo);
    };

    $scope.search = function (vaPersonSearchCriteriaInfo) {
        vaPersonSearchCriteriaInfo.attendedSearch = ($scope.isAttendedSearch()) ? true : false;

        PersonSearchService.queryPerson(vaPersonSearchCriteriaInfo).then(function (searchResults) {
            $scope.personSearchCompleted = false;

            if(Object.isArray(searchResults) && searchResults.length > 0) {
                if (attendedSearch) {
                    displaySearchResults(searchResults);
                } else {
                    $scope.selectedPerson = (Object.isArray(searchResults) && searchResults.length > 0) ? searchResults[0] : new VAPerson().toUIObject();
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
            $scope.selectedPerson = selectedPerson; //new VAPerson(selectedPerson).toUIObject();
            $scope.personSearchCompleted = true;
        }, function(error){
            $scope.personSearchCompleted = false;
        });
    };

    $scope.displayReturnToSearchModal = function (panel) {
        var modalInstance = $uibModal.open({
            templateUrl: 'components/person-search/partials/person-search-return-to-search.html',
            controller: 'PersonSearchReturnToSearchModalController',
            controllerAs: 'personSearchReturnToSearchModalController',
            size: 'sm'
        });

        modalInstance.result.then(function (returnToSearch) {
            if (returnToSearch) {
                $scope.selectedPerson = null; //new VAPerson(selectedPerson).toUIObject();
                $scope.personSearchCompleted = false;
                $scope.reset();
            }
        }, function (error) {
            //TODO: Maybe do something with error reason.
        });
    };

    $scope.confirmDelegate = function () {
        $scope.$emit('Delegate Confirmed', {confirmedDelegate: $scope.selectedPerson});
    };

    $scope.$on('Reset Form', function (event, args) {
        var someForm = $scope[args.formName];
        console.log(someForm);
    });
}]);