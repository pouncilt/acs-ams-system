/**
 * Created by tonte on 10/15/15.
 */
function Address(addressConfig) {

    var street1 = (Object.isDefined(addressConfig) && Object.isString(addressConfig.street1)) ? addressConfig.street1 : null;
    var street2 = (Object.isDefined(addressConfig) && Object.isString(addressConfig.street2)) ? addressConfig.street2 : null;
    var city = (Object.isDefined(addressConfig) && Object.isString(addressConfig.city)) ? addressConfig.city : null;
    var state = (Object.isDefined(addressConfig) && Object.isString(addressConfig.state)) ? addressConfig.state : null;
    var zip = (Object.isDefined(addressConfig) && Object.isString(addressConfig.zip)) ? addressConfig.zip : null;
    var country = (Object.isDefined(addressConfig) && Object.isString(addressConfig.country)) ? addressConfig.country : null;
    var id = (Object.isDefined(addressConfig) && Object.isDefined(addressConfig.id))? addressConfig.id: null;
    var createdDate = (Object.isDefined(addressConfig) && Object.isDefined(addressConfig.createdDate))? new Date(addressConfig.createdDate): new Date();
    var lastModifiedDate = (Object.isDefined(addressConfig) && Object.isDefined(addressConfig.lastModifiedDate))? new Date(addressConfig.lastModifiedDate): createdDate;
    var createdBy = (Object.isDefined(addressConfig) && Object.isDefined(addressConfig.createdBy))? addressConfig.createdBy: null;
    var lastModifiedBy = (Object.isDefined(addressConfig) && Object.isDefined(addressConfig.lastModifiedBy))? addressConfig.lastModifiedBy: null;
    var protectedMetaData = (Object.isDefined(addressConfig) && Object.isDefined(addressConfig.protectedMetaData))? addressConfig.protectedMetaData: null;
    var TO_STRING_SHOW_COUNTRY_CONFIG = (Object.isDefined(addressConfig) && Object.isBoolean(addressConfig.toStringShowCountryConfig)) ? addressConfig.toStringShowCountryConfig : false;
    var self = this;

    this.getProtectedMetaData = function(){
        return protectedMetaData;
    };

    this.getStreet1 = function() {
        return street1;
    };

    this.getStreet2 = function() {
        return street2;
    };

    this.getCity = function() {
        return city;
    };

    this.getState = function() {
        return state;
    };

    this.getZip = function() {
        return zip;
    };

    this.getCountry = function() {
        return country;
    };

    this.getId = function() {
        return id;
    };

    this.getCreatedDate = function() {
        return createdDate;
    };

    this.getLastModifiedDate = function() {
        return id;
    };

    this.getCreatedBy = function() {
        return createdBy;
    };

    this.getLastModifiedBy = function() {
        return lastModifiedBy;
    };

    this.getConfig = function() {
        return addressConfig;
    };

    this.getToStringShowCountryConfig = function () {
        return TO_STRING_SHOW_COUNTRY_CONFIG
    };

    this.toJSON = function(serializeUIProperties) {
        serializeUIProperties = (Object.isDefined(serializeUIProperties) && Object.isBoolean(serializeUIProperties))? serializeUIProperties : false;
        var jsonStreet1 = (Object.isDefined(street1))? "\"" + street1 + "\"" : null,
            jsonStreet2 = (Object.isDefined(street2))? "\"" + street2 + "\"" : null,
            jsonCity = (Object.isDefined(city))? "\"" + city + "\"" : null,
            jsonState = (Object.isDefined(state))? "\"" + state + "\"" : null,
            jsonZip = (Object.isDefined(zip))? "\"" + zip + "\"" : null,
            jsonCountry = (Object.isDefined(country))? "\"" + country + "\"" : null,
            jsonId = (Object.isDefined(id))? id : null,
            jsonCreatedDate = (Object.isDefined(createdDate))? "\"" + createdDate.toJSON() + "\"" : null,
            jsonLastModifiedDate = (Object.isDefined(lastModifiedDate))? "\"" + lastModifiedDate.toJSON() + "\"" : null,
            jsonCreatedBy = (Object.isDefined(createdBy))? "\"" + createdBy + "\"" : null,
            jsonLastModifiedBy = (Object.isDefined(lastModifiedBy))? "\"" + lastModifiedBy + "\"" : null,
            jsonProtectedMetaData = (Object.isDefined(protectedMetaData))? "\"" + protectedMetaData + "\"" : null,
            json =  "{" +
                "\"contactType\": " + "\"PRIMARY\"" + "," +
                "\"street1\": " + jsonStreet1 + "," +
                "\"street2\": " + jsonStreet2 + "," +
                "\"city\": " + jsonCity + "," +
                "\"state\": " + jsonState + "," +
                "\"zip\": " + jsonZip + "," +
                "\"country\": " + jsonCountry + "," +
                "\"id\": " + jsonId + "," +
                "\"createdDate\": " + jsonCreatedDate + "," +
                "\"lastModifiedDate\": " + jsonLastModifiedDate + "," +
                "\"createdBy\": " + jsonCreatedBy + "," +
                "\"lastModifiedBy\": " + jsonLastModifiedBy + "," +
                "\"protectedMetaData\": " + jsonProtectedMetaData +
            "}";
        return json;
    };

    this.toUIObject = function(){
        var UIObject = JSON.parse(this.toJSON(true));

        return UIObject;
    };
}


Address.prototype.toString = function (convertFullObjectToString) {
    convertFullObjectToString = (Object.isBoolean(convertFullObjectToString)) ? convertFullObjectToString : false;
    var addressAsString;
    if (convertFullObjectToString) {
        addressAsString = "{" +
            "id:" + this.getId() + "," +
            "street1: " + this.getStreet1() + "," +
            "street2: " + this.getStreet2() + "," +
            "city: " + this.getCity() + "," +
            "state: " + this.getState() + "," +
            "zip: " + this.getZip() + "," +
            "country: " + this.getZip() +
            "createdBy:" + this.getCreatedBy() + "," +
            "createdDate:" + this.getCreatedDate() + "," +
            "lastModifiedBy:" + this.getLastModifiedBy() + "," +
            "lastModifiedDate:" + this.getLastModifiedDate() + "," +
            "TO_STRING_SHOW_COUNTRY_CONFIG:" + TO_STRING_SHOW_COUNTRY_CONFIG +
            "}";
    } else {
        addressAsString = ((Object.isString(this.getStreet1())) ? this.getStreet1() : "") +
            ((Object.isString(this.getStreet2())) ? " " + this.getStreet2() : "") + ", " +
            ((Object.isString(this.getCity())) ? this.getCity() : "") + ", " +
            ((Object.isString(this.getState())) ? this.getState() : "") +
            ((this.getToStringShowCountryConfig()) ? ((Object.isString(this.getCountry())) ? this.getCountry() : "") : "") + " " +
            ((Object.isString(this.getZip())) ? this.getZip() : "");
    }

    return addressAsString;
};

