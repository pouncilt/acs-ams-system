/**
 * Created by tonte on 10/25/15.
 */
vaPersonSearchModule.controller('PersonSearchResultModalController', ['$scope', 'NgTableParams', 'ngTableEventsChannel', '$uibModalInstance', 'items', function ($scope, NgTableParams, ngTableEventsChannel, $uibModalInstance, items) {
    var self = this;

    self.cols = [
        { field: "select", title: "Select", show: true },
        { field: "lastName", title: "Last Name", sortable: "lastName", show: true },
        { field: "firstName", title: "First Name", sortable: "firstName", show: true },
        { field: "middleName", title: "Middle Name", sortable: "middleName", show: true },
        {field: "birthDate", title: "Date of Birth", sortable: "birthDate", show: true},
        { field: "gender", title: "Gender", sortable: "gender", show: true },
        { field: "ssn", title: "SSN", sortable: "ssn", show: true },
        { field: "city", title: "City", sortable: "city", show: true },
        { field: "state", title: "State", sortable: "state", show: true }
    ];

    var initialParams = {
        count: 1,   // initial page size
        page: 1     // show first page
    };

    var initialSettings = {
        // page size buttons (right set of buttons in demo)
        counts: [],
        // determines the pager buttons (left set of buttons in demo)
        // paginationMaxBlocks: 13,
        // paginationMinBlocks: 2,
        total: 1, // If value is greater than 1, pagination will be shown.
        getData: function(defer, params){
            params.total(items.length); // If value is greater than 1, pagination will be shown.
            defer.resolve(items);
        }
    };

    function setTable() {
        self.tableParams = new NgTableParams(initialParams, initialSettings);
    }

    function hidePagination() {
        var element = $("div.ng-table-pager.ng-scope");
        element.css("display", "none");
    }

    function refreshNgTable () {
        setTable();
    }

    $scope.selected = {
        person: null,
        personIcn: null,
    };

    $scope.ok = function () {
        items.some(function (person, index, array) {
            person.icn.some(function (someIcn) {
                if (someIcn === $scope.selected.personIcn) {
                    $scope.selected.person = person;
                    return true;
                }

                return false;
            });

        });
        $uibModalInstance.close($scope.selected.person);
    };

    $scope.cancel = function () {
        $scope.selected.person = null;
        $uibModalInstance.dismiss('cancel');
    };

    $scope.hidePagination = function() {
        hidePagination();
    };

    $scope.checkIfReady = function () {
        var isReady = ($("button").length > 0) ? true : false;

        return isReady;
    };

    refreshNgTable();
}]);