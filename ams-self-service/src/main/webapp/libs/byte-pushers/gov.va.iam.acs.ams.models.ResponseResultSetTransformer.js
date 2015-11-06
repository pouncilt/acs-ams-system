/**
 * Created by tonte on 10/4/15.
 */
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
 * @type {*|VA_AMS.models.ResultSetTransformer|*|VA_AMS.models.ResultSetTransformer|Object|*|Object|*}
 */
VA_AMS.models.ResultSetTransformer =  VA_AMS.namespace("gov.va.iam.acs.ams.models.ResponseResultSetTransformer");
VA_AMS.models.ResultSetTransformer.setContentTransformer = function(contentTransformer) {
    this.contentTransformer = contentTransformer;
};
/**
 * Static method for the ResultSetTransformer class that is responsible for transforming the JSON response.
 *
 * @static
 * @method
 * @param {String} resultSetJsonConfig  Represents the JSON response of a Restful service call.
 * @returns {User} The response domain model of a service call request.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.models.ResultSetTransformer.transformJSONPayload = function (resultSetJsonConfig) {
    'use strict';

    /**
     * Represent an existing User.
     *
     * @private
     * @field
     * @type {User}
     */
    var someResultSet = [],
        transformerExceptionMsg;

    if (!Object.isArray(resultSetJsonConfig)) {
        transformerExceptionMsg = "resultSetJsonConfig can not be null or undefined.";
        throw new VA_AMS.exceptions.TransformerException({message: transformerExceptionMsg});
    }

    if (!Object.isDefined(this.contentTransformer)) {
        transformerExceptionMsg = "contentTransformer can not be null or undefined.";
        throw new VA_AMS.exceptions.TransformerException({message: transformerExceptionMsg});
    }

    try{
        resultSetJsonConfig.forEach(function(resultJsonConfig, resultSetIndex, resultSet) {
            someResultSet.push(VA_AMS.models.ResultSetTransformer.contentTransformer.transformJSONPayload(resultJsonConfig))
        });
    } catch(exception) {
        transformerExceptionMsg = exception.message;
        throw new VA_AMS.exceptions.TransformerException({message: transformerExceptionMsg});
    }

    return someResultSet;
};