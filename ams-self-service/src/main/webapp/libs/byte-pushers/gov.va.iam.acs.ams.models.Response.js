/**
 * Represents the application api.  If the variable is already defined use it,
 * otherwise create an empty object.
 *
 * @type {VA_AMS|*|VA_AMS|*|{}|{}}
 */
var VA_AMS = VA_AMS || {};
/**
 * Represents the application static variable. Use existing static variable, if one already exists,
 * otherwise create a new one.
 *
 * @static
 * @type {*|VA_AMS.models|*|VA_AMS.models|Object|*|Object|*}
 */
VA_AMS.models = VA_AMS.models || VA_AMS.namespace("gov.va.iam.acs.ams.models");
/**
 * Constructor method for the Response Domain Model class.  The properties of this class can be initialized with
 * the jsonResponseStatus Object.
 * @class
 * @classdesc   This class is a domain model class; which means it has both behaviour and state
 *              information about the user.
 * @param {VA_AMS.models.ResponseStatus}  responseStatus  Represents the Response Status domain model object.
 * @param {Object}  payload  Represents the transformed JSON payload object for a particular service request.
 * @constructor
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.models.Response =  function (responseStatus, payload) {

    if ((responseStatus === undefined) || (responseStatus === null)) {
        throw new VA_AMS.exceptions.InvalidParameterException("ResponseStatus can not be null or undefined.");
    }

    /**
     * Convenience method that gets the response message of a service call.
     *
     * @public
     * @method
     * @returns {String} The response message of the service call.
     */
    this.getMessages = function () {
        return responseStatus.getMessages();
    };

    /**
     * Convenience method that gets the response status of a service call.
     *
     * @public
     * @method
     * @returns {VA_AMS.models.ResponseStatus} The response status of a service call.
     */
    this.getStatus = function () {
        return responseStatus;
    };

    /**
     * Convenience method that gets the response status exception of a service call.
     *
     * @public
     * @method
     * @returns {Object*} The response status exception of a service call.
     */
    this.getPayload = function () {
        return payload;
    };

    /**
     * Convenience method that determines if the service request call was successful or not.
     *
     * @public
     * @method
     * @returns {Boolean} True if the service request call was successful; otherwise return false.
     */
    this.isSuccessful = function () {
        return (responseStatus.getRequestStatus().toUpperCase() === "SUCCESSFUL");
    };
};