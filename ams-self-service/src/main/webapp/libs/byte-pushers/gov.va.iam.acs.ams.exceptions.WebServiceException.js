/**
 * Created by tonte on 8/10/15.
 */
var VA_AMS = VA_AMS || {};
VA_AMS.exceptions = VA_AMS.namespace("gov.va.iam.acs.ams.exceptions");
VA_AMS.exceptions.WebServiceException = function(webServiceExceptionConfig) {
    "use strict";
    var message = (Object.isDefined(webServiceExceptionConfig) && Object.isArray(webServiceExceptionConfig.message))? webServiceExceptionConfig.message: null;
    var exceptionMessages = (Object.isDefined(webServiceExceptionConfig) && Object.isArray(webServiceExceptionConfig.exceptionMessages))? webServiceExceptionConfig.exceptionMessages: [];
    var name = "VA_AMS.exceptions.WebServiceException";

    if (Object.isArray(exceptionMessages) && exceptionMessages.length > 0 && Object.isDefined(message)){
        Error.call(this, message);
    } else if (Object.isArray(exceptionMessages) && exceptionMessages.length > 0){
        Error.call(this, exceptionMessages[0]);
    } else if (Object.isDefined(message)) {
        Error.call(this, message);
    } else {
        Error.call(this);
    }

    VA_AMS.exceptions.WebServiceException.prototype = new Error();

    this.getName = function() {
        return name;
    };

    this.getMessage = function() {
        return message;
    };

    this.getMessages = function() {
        return exceptionMessages;
    };
};