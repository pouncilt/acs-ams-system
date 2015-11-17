/**
 * Created by tonte on 11/16/15.
 */
'use strict';

var vaEmailModule = angular.module('gov.va.delegation.module', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/delegation', {
            templateUrl: 'components/delegation/delegation.html'
        });
    }]);