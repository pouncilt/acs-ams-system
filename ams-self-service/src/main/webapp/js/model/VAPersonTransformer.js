/**
 * Created by tonte on 10/23/15.
 */
/**
 * Created by pouncilm on 8/4/15.
 */
/**
 * Represents the application api.  If the variable is already defined use it,
 * otherwise create an empty object.
 *
 * @type {VA|*|VA|*|{}|{}}
 */
var VA = VA || {};
/**
 * Represents the application static variable. Use existing static variable, if one already exists,
 * otherwise create a new one.
 *
 * @static
 * @type {*|VA.models|*|VA.models|Object|*|Object|*}
 */
VA.models = VA.models || VA_AMS.namespace("gov.va.models");
/**
 * Represents the application static variable. Use existing static variable, if one already exists,
 * otherwise create a new one.
 *
 * @static
 * @type {*|VA.models.VAPersonTransformer|*|VA.models.VAPersonTransformer|Object|*|Object|*}
 */
VA.models.VAPersonTransformer =  VA_AMS.namespace("gov.va.models.VAPersonTransformer");
/**
 * Static method for the VAPersonTransformer class that is responsible for transforming the JSON response.
 *
 * @static
 * @method
 * @param {String} vaPersonJsonConfig  Represents the JSON response of a Restful service call.
 * @returns {VAPerson} The response domain model of a service call request.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA.models.VAPersonTransformer.transformJSONPayload = function (vaPersonJsonConfig) {
    'use strict';

    /**
     * Represent an existing VAPerson.
     *
     * @private
     * @field
     * @type {VAPerson}
     */
    var aVAPerson;

    if (!Object.isDefined(vaPersonJsonConfig)) {
        throw new VA.exceptions.InvalidParameterException("vaPersonJsonConfig can not be null or undefined.");
    }

    aVAPerson = new VAPerson(vaPersonJsonConfig);

    return aVAPerson;
};