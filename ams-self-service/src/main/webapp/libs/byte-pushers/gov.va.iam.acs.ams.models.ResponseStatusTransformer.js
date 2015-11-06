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
 * Represents the application static variable. Use existing static variable, if one already exists,
 * otherwise create a new one.
 *
 * @static
 * @type {*|VA_AMS.models.ResponseStatusTransformer|*|VA_AMS.models.ResponseStatusTransformer|Object|*|Object|*}
 */
VA_AMS.models.ResponseStatusTransformer =  VA_AMS.namespace("com.byte-pushers.models.ResponseStatusTransformer");
/**
 * Static method for the ResponseStatusTransformer class that is responsible for transforming the JSON response status.
 *
 * @static
 * @method
 * @param {String}  jsonResponse  Represents the JSON response of a Restful service call.
 * @returns {VA_AMS.models.ResponseStatus} The response status domain model of a service call request.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.models.ResponseStatusTransformer.transformJSONResponseStatus = function (jsonResponse) {
    'use strict';
    /**
     * Represent the response status from a Restful service call.
     *
     * @private
     * @field
     * @type {VA_AMS.models.ResponseStatus}
     */
    var responseStatus;

    if (!Object.isDefined(jsonResponse)) {
        throw new VA_AMS.exceptions.TransformerException({message: "jsonResponse can not be null or undefined."});
    }

    if (!Object.isDefined(jsonResponse.status)) {
        throw new VA_AMS.exceptions.TransformerException({message: "jsonResponse.status can not be null or undefined."});
    }

    responseStatus = new VA_AMS.models.ResponseStatus(jsonResponse.status);

    return responseStatus;
};