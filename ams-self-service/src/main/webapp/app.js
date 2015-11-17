'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
        'gov.va.delegation.module',
        'gov.va.email.beneficiary.module',
        'gov.va.person.search.module',
        'ngRoute',
        'ngResource',
        'ngTable'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html'
        });
        $routeProvider.when('/veteran-delegations', {
            templateUrl: 'partials/veteran-delegations.html'
        });
    }]);

myApp.appendTransform = function (defaults, transform) {

    // We can't guarantee that the default transformation is an array
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    // Append the new transformation to the defaults
    return defaults.concat(transform);
};

myApp.value('MessageHandler', new VA_AMS.handlers.MessageHandler());