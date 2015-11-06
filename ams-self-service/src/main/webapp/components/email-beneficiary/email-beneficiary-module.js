/**
 * Created by tonte on 10/14/15.
 */
'use strict';

var vaEmailModule = angular.module('gov.va.email.beneficiary.module', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/email-beneficiary', {
        templateUrl: 'components/email-beneficiary/email-beneficiary.html'
    });
}]);