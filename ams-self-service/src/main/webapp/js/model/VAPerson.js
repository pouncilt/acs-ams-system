/**
 * Created by tonte on 10/15/15.
 */
function VAPerson(vaPersonInfoConfig) {
    var self = this;
    var TO_STRING_DATE_FORMAT_CONFIG = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.toStringDateFormatConfig)) ? vaPersonInfoConfig.toStringDateFormatConfig : VA_AMS.converters.DateConverter.YYYYMMDD_DATE_FORMAT;
    var ipid = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.ipid)) ? vaPersonInfoConfig.ipid : null;
    var secid = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.secid)) ? vaPersonInfoConfig.secid : null;
    var firstName = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.firstName)) ? vaPersonInfoConfig.firstName : null;
    var middleName = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.middleName)) ? vaPersonInfoConfig.middleName : null;
    var lastName = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.lastName)) ? vaPersonInfoConfig.lastName : null;
    var prefix = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.prefix)) ? vaPersonInfoConfig.prefix : null;
    var ssn = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.ssn)) ? vaPersonInfoConfig.ssn : null;
    var gender = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.gender)) ? vaPersonInfoConfig.gender : null;
    var birthDate = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.birthDate)) ? createDateFromString(vaPersonInfoConfig.birthDate) : null;
    var deathDate = (Object.isDefined(vaPersonInfoConfig) && Object.isString(vaPersonInfoConfig.deathDate)) ? createDateFromString(vaPersonInfoConfig.deathDate) : null;
    var addresses = (Object.isDefined(vaPersonInfoConfig) && Object.isArray(vaPersonInfoConfig.addresses)) ? createAddresses(vaPersonInfoConfig.addresses) : [];
    var phoneNumbers = (Object.isDefined(vaPersonInfoConfig) && Object.isArray(vaPersonInfoConfig.phones)) ? createPhones(vaPersonInfoConfig.phones) : [];
    var icn = (Object.isDefined(vaPersonInfoConfig) && Object.isArray(vaPersonInfoConfig.icn)) ? vaPersonInfoConfig.icn : [];
    var edipi = (Object.isDefined(vaPersonInfoConfig) && Object.isArray(vaPersonInfoConfig.edipi)) ? vaPersonInfoConfig.edipi : [];

    function createDateFromString(someDateYYYYMMDD) {
        var someDate;

        switch (TO_STRING_DATE_FORMAT_CONFIG) {
            case VA_AMS.converters.DateConverter.YYYYMMDD_DATE_FORMAT:
                someDate = VA_AMS.converters.DateConverter.convertToDate(someDateYYYYMMDD, TO_STRING_DATE_FORMAT_CONFIG);
                break;
        }
        
        return someDate;
    }

    function createAddresses(addressesConfig) {
        var tempAddresses = [];
        if((Object.isDefined(addressesConfig) && (Object.isArray(addressesConfig)))) {
            addressesConfig.forEach(function(addressConfig){
                tempAddresses.push(new Address(addressConfig));
            });
        }
        return tempAddresses;
    }

    function createPhones(phonesConfig) {
        var tempAddresses = [];
        if((Object.isArray(phonesConfig))) {
            phonesConfig.forEach(function(phoneConfig){
                tempAddresses.push(new PhoneNumber(phoneConfig));
            });
        }
        return tempAddresses;
    }

    function getPhoneNumbersAsJson(serializeUIProperties){
        var json = "[";
        phoneNumbers.forEach(function (phoneNumber, index, arr) {
            json +=  (index < (arr.length -1)) ? phoneNumber.toJSON(serializeUIProperties) + "," : phoneNumber.toJSON(serializeUIProperties);
        });

        json += "]";
        return json;
    }

    function getAddressesAsJson(serializeUIProperties){
        var json = "[";
        addresses.forEach(function (address, index, arr) {
            json += (index < (arr.length -1)) ? address.toJSON(serializeUIProperties) + "," : address.toJSON(serializeUIProperties);
        });
        json += "]";
        return json;
    }

    function getIcnAsJson(serializeUIProperties){
        var json = "[";
        icn.forEach(function (icnString, index, arr) {
            json += (index < (arr.length -1)) ? "\"" + icnString + "\"," : "\"" + icnString + "\"";
        });
        json += "]";
        return json;
    }

    function getEdiPiAsJson(serializeUIProperties){
        var json = "[";
        edipi.forEach(function (edipiString, index, arr) {
            json += (index < (arr.length -1)) ? "\"" + edipiString + "\"," : "\"" + edipiString + "\"";
        });
        json += "]";
        return json;
    }

    this.getIpId = function() {
        return ipid;
    };

    this.getSecId = function() {
        return secid;
    };

    this.getFirstName = function() {
        return firstName;
    };

    this.getMiddleName = function() {
        return middleName;
    };

    this.getLastName = function() {
        return firstName;
    };

    this.getPrefix = function() {
        return prefix;
    };

    this.getSsn = function() {
        return ssn;
    };

    this.getMaskedSsn = function () {
        return (Object.isDefined(this.getSsn())) ? "#####" + this.getSsn().substring(8) : "";
    };

    this.getGender = function() {
        return gender;
    };

    this.getBirthDate = function() {
        return birthDate;
    };

    this.getDeathDate = function () {
        return birthDate;
    };

    this.getAddresses = function() {
        return addresses;
    };

    this.getPhoneNumbers = function() {
        return phoneNumbers;
    };

    this.getIcn = function() {
        return icn;
    };

    this.hasOneOrMoreEqualIcns = function (someOtherIcnArray) {
        var hasOneOrMoreSameIcns = false;

        if (Object.isArray(someOtherIcnArray)) {
            self.icn.forEach(function (icn, index, icnArray) {
                someOtherIcnArray.some(function (someOtherIcn, someOtherIcnArray2Index, someOtherIcnArray2) {
                    if (someOtherIcn === icn) {
                        return true;
                    }
                    return false;
                })
            });
        }


        return hasOneOrMoreSameIcns
    };

    this.getEdiPi = function() {
        return edipi;
    };

    this.toJSON = function(serializeUIProperties) {
        serializeUIProperties = (Object.isDefined(serializeUIProperties) && Object.isBoolean(serializeUIProperties))? serializeUIProperties : false;
        var jsonIpid = (Object.isString(ipid))? "\"" + ipid + "\"" : null,
            jsonSecid = (Object.isString(secid))? "\"" + secid + "\"" : null,
            jsonFirstName = (Object.isString(firstName))? "\"" + firstName + "\"" : null,
            jsonMiddleName = (Object.isString(middleName))? "\"" + middleName + "\"" : null,
            jsonLastName = (Object.isString(lastName))? "\"" + lastName + "\"" : null,
            jsonPrefix = (Object.isString(prefix))? "\"" + prefix + "\"" : null,
            jsonSsn = (Object.isNumeric(ssn))? ssn : (Object.isString(ssn))? "\"" + ssn + "\"": null,
            jsonGender = (Object.isString(gender))? "\"" + gender + "\"" : null,
            jsonBirthDate = (Object.isDate(birthDate)) ? VA_AMS.converters.DateConverter.convertToString(birthDate, TO_STRING_DATE_FORMAT_CONFIG) : null,
            jsonDeathDate = (Object.isDate(deathDate)) ? VA_AMS.converters.DateConverter.convertToString(deathDate, TO_STRING_DATE_FORMAT_CONFIG) : null,
            jsonAddresses = (Object.isArray(addresses))? getAddressesAsJson(serializeUIProperties) : "[]",
            jsonPhoneNumbers = (Object.isArray(phoneNumbers))? getPhoneNumbersAsJson(serializeUIProperties) : "[]",
            jsonIcn = (Object.isArray(icn))? getIcnAsJson(serializeUIProperties) : "[]",
            jsonEdiPi = (Object.isArray(edipi))? getEdiPiAsJson(serializeUIProperties) : "[]",
            /*jsonCreatedDate = (Object.isDefined(createdDate))? "\"" + createdDate.toJSON() + "\"" : null,
            jsonLastModifiedDate = (Object.isDefined(lastModifiedDate))? "\"" + lastModifiedDate.toJSON() + "\"" : null,
            jsonCreatedBy = (Object.isDefined(createdBy))? "\"" + createdBy + "\"" : null,
            jsonLastModifiedBy = (Object.isDefined(lastModifiedBy))? "\"" + lastModifiedBy + "\"" : null,
            jsonProtectedMetaData = (Object.isDefined(protectedMetaData))? "\"" + protectedMetaData + "\"" : null,*/
            json =  "{" +
                "\"ipid\": " + jsonIpid + "," +
                "\"secid\": " + jsonSecid + "," +
                "\"firstName\": " + jsonFirstName + "," +
                "\"middleName\": " + jsonMiddleName + "," +
                "\"lastName\": " + jsonLastName  + "," +
                "\"prefix\": " + jsonPrefix  + "," +
                "\"ssn\": " + jsonSsn  + "," +
                "\"prefix\": " + jsonPrefix  + "," +
                "\"gender\": " + jsonGender  + "," +
                "\"birthDate\": " + jsonBirthDate  + "," +
                "\"deathDate\": " + jsonDeathDate + "," +
                "\"icn\": " + jsonIcn  + "," +
                "\"ediPi\": " + jsonEdiPi + "," +
                "\"phoneNumbers\": " + jsonPhoneNumbers  + "," +
                "\"addresses\": " + jsonAddresses  +
                /*"\"createdDate\": " + jsonCreatedDate + "," +
                "\"lastModifiedDate\": " + jsonLastModifiedDate + "," +
                "\"createdBy\": " + jsonCreatedBy + "," +
                "\"lastModifiedBy\": " + jsonLastModifiedBy + "," +
                "\"protectedMetaData\": " + jsonProtectedMetaData +*/
            "}";
        return json;
    };

    this.toUIObject = function(){
        var UIObject = JSON.parse(this.toJSON(true));
        var primaryAddressUIObject = (Object.isDefined(self.getAddresses()[0])) ? self.getAddresses()[0].toUIObject() : {};
        UIObject.displayPrimaryAddress = (Object.isDefined(self.getAddresses()[0])) ? self.getAddresses()[0].toString() : "";
        UIObject.city = (Object.isDefined(primaryAddressUIObject.city)) ? primaryAddressUIObject.city : "";
        UIObject.state = (Object.isDefined(primaryAddressUIObject.state)) ? primaryAddressUIObject.state : "";
        UIObject.maskedSsn = this.getMaskedSsn();

        return UIObject;
    };

}

VAPerson.prototype.toString = function () {
    return  "{" +
        "ipid: " + this.getIpId() + "," +
        "secid: " + this.getSecId() + "," +
        "firstName: " + this.getFirstName() + "," +
        "middleName: " + this.getMiddleName() + "," +
        "lastName: " + this.getLastName() + "," +
        "prefix: " + this.getPrefix() + "," +
        "gender: " + this.getGender() + "," +
        "birthDate: " + this.getBirthDate() + "," +
        "deathDate: " + this.getDeathDate() + "," +
        "icn: " + this.getIcn()+ "," +
        "edipi: " + this.getEdiPi()+ "," +
        "phoneNumbers: " + this.getPhoneNumbers()+ "," +
        "addresses: " +  this.getAddresses() +
        /*"id: " + this.getId() + "," +
         "createdBy:" + this.getCreatedBy() + "," +
         "createdDate:" + this.getCreatedDate() + "," +
         "lastModifiedBy:" + this.getLastModifiedBy() + "," +
         "lastModifiedDate:" + this.getLastModifiedDate() +*/
    "}";
};