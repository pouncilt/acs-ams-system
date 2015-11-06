/**
 * Created by tonte on 10/14/15.
 */
vaEmailModule.controller('BeneficiaryController', ['$scope', '$location', 'BeneficiaryService', function ($scope, $location, BeneficiaryService) {
    $scope.sendEmailBeneficiaryEmailMessages = [];
    $scope.veteranBeneficiaryEmailSent = false;
    $scope.format = 'M/d/yyyy';
    $scope.todaysDate = new Date().getTime();

    $scope.navigateTo = function (path) {
        $location.path(path);
    };

    $scope.sendEmail = function () {
        var requestParameters = {
            veteranBeneficiaryInfo: $scope.veteranBeneficiaryInfo,
            veteranInfo: $scope.veteranInfo
        };

        BeneficiaryService.sendEmail(requestParameters).then(function (response) {
            $scope.veteranBeneficiaryEmailSent = true;
        }, function (error) {
            $scope.sendEmailBeneficiaryEmailMessages.push(error);
            $scope.veteranBeneficiaryEmailSent = false;
        });
    };
}]);