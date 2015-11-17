/**
 * Created by tonte on 10/14/15.
 */
myApp.controller('AppController', ['$scope', '$location', function ($scope, $location) {
    $scope.veteranInfo = {
        primaryEmail: "",
        fullName: "John Doe"
    };
    $scope.beneficiaryInfo = {
        primaryEmail: "lillie.cotton@gmail.com",
        secondaryEmail: "",
        fullName: "Lillie Cotton"
    };
    $scope.staffInfo = {

    };
    $scope.selectedDelegate;

    $scope.setStaffInfo = function(staffInfo) {
        $scope.staffInfo = staffInfo;
    };

    $scope.getStaffInfo = function(){
        return $scope.staffInfo;
    };

    $scope.isAttended = function () {
        return Object.isDefined($scope.getStaffInfo());
    };

    $scope.isUnattended = function () {
        return !Object.isDefined($scope.getStaffInfo());
    };

    $scope.getSelectedDelegate = function () {
        $scope.selectedDelegate;
    };

    $scope.$on('Delegate Confirmed', function (event, args) {
        $scope.selectedDelegate = args.confirmedDelegate;
    });

    $scope.confirmDelegationPreferences = function (selectedDelegationPreferences) {

    };
    $scope.login = function () {

    };
    $scope.go = function (path) {
        $location.path(path);
    };
}]);