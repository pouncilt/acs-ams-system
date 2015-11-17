/**
 * Created by tonte on 11/16/15.
 */
vaPersonSearchModule.controller('DelegationAccordionController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.enableOnePanelAtATime = true;
    $scope.selected = {};

    $scope.accordionPanels = [
        {
            title: "Step 1: Establish Delegation Type",
            contentUrl: "components/delegation/partials/step1.html",
            isOpen: true,
            isDisabled: false,
            isStepCompleted: false,
            form: {
                delegationType: null
            }
        },
        {
            title: "Step 2: Establish Delegate",
            contentUrl: "components/delegation/partials/step2.html",
            isOpen: false,
            isDisabled: true,
            isStepCompleted: false,
            formName: "personSearchForm"
        },
        {
            title: "Step 3: Establish Delegation Preferences",
            contentUrl: "components/delegation/partials/step3.html",
            isOpen: false,
            isDisabled: true,
            isStepCompleted: false,
            form: {
                delegationPermission: null
            }
        },
        {
            title: "Step 4: Sign Delegation Form",
            contentUrl: "components/delegation/partials/step4.html",
            isOpen: false,
            isDisabled: true,
            isStepCompleted: false
        },
        {
            title: "Step 5: Submit Delegation",
            contentUrl: "components/delegation/partials/step5.html",
            isOpen: false,
            isDisabled: true,
            isStepCompleted: false
        }
    ];

    var decorateAccordionPanel = function (accordionPanel) {
        accordionPanel.isStepCompleted = true;
    };

    var activateNextAccordionPanels = function (accordionPanel) {
        var accordionPanelIndex = $scope.accordionPanels.indexOf(accordionPanel);
        if (accordionPanelIndex > -1 && accordionPanelIndex + 1 < $scope.accordionPanels.length) {
            $scope.accordionPanels[accordionPanelIndex + 1].isDisabled = false;
            $scope.accordionPanels[accordionPanelIndex + 1].isOpen = true;
            accordionPanel.isOpen = false;
        }
    };

    var deactivateRemainingAccordionPanels = function (accordionPanel) {
        var accordionPanelIndex = $scope.accordionPanels.indexOf(accordionPanel);
        if (accordionPanelIndex > -1 && accordionPanelIndex + 1 < $scope.accordionPanels.length) {
            for (accordionPanelIndex = accordionPanelIndex + 1; accordionPanelIndex < $scope.accordionPanels.length; accordionPanelIndex++) {
                $scope.accordionPanels[accordionPanelIndex].isDisabled = true;
                $scope.accordionPanels[accordionPanelIndex].isOpen = false;
                $scope.accordionPanels[accordionPanelIndex].isStepCompleted = false;
            }

            accordionPanel.isOpen = true;
            accordionPanel.isDisabled = false;
            accordionPanel.isStepCompleted = false;
        }
    };

    var resetRemainingAccordionPanelForms = function (accordionPanel) {
        var accordionPanelIndex = $scope.accordionPanels.indexOf(accordionPanel);
        if (accordionPanelIndex > -1 && accordionPanelIndex + 1 < $scope.accordionPanels.length) {
            for (accordionPanelIndex = accordionPanelIndex + 1; accordionPanelIndex < $scope.accordionPanels.length; accordionPanelIndex++) {
                if (Object.isDefined($scope.accordionPanels[accordionPanelIndex].form)) {
                    for (var property in $scope.accordionPanels[accordionPanelIndex].form) {
                        $scope.accordionPanels[accordionPanelIndex].form[property] = null;
                    }
                } else {
                    $rootScope.$broadcast('Reset Form', {formName: $scope.accordionPanels[accordionPanelIndex].formName})
                }
            }
        }
    };

    var findOpenAccordionPanels = function () {
        var openAccordionPanels = [];
        $scope.accordionPanels.forEach(function (accordionPanel, accordionPanelIndex, accordionPanelArray) {
            if (accordionPanel.isOpen) {
                openAccordionPanels.push(accordionPanel);
            }
        });

        return accordionPanels;
    };

    $scope.doNextStep = function (currentAccordionPanel) {
        decorateAccordionPanel(currentAccordionPanel);
        activateNextAccordionPanels(currentAccordionPanel);
    };

    $scope.isStepCompleted = function (accordionPanelTitle) {
        var isStepCompleted = $scope.accordionPanels.some(function (accordionPanel, accordionPanelIndex, accordionPanelArray) {
            if (accordionPanel.title === accordionPanelTitle && accordionPanel.isStepCompleted === true) {
                return true;
            }
            return false;
        });

        return isStepCompleted;
    };

    $scope.resetAccordion = function (panel) {
        resetRemainingAccordionPanelForms(panel);
        deactivateRemainingAccordionPanels(panel);
    };

}]);