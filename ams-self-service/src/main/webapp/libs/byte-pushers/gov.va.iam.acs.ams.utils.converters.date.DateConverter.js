/*global*/
var VA_AMS = VA_AMS || {};
VA_AMS.converters = VA_AMS.namespace("gov.va.iam.acs.ams.utils.converters");
VA_AMS.converters.DateConverter = VA_AMS.namespace("gov.va.iam.acs.ams.utils.converters.DateConverter");
VA_AMS.converters.DateConverter.MMDDYYYY_DATE_FORMAT = 0;
VA_AMS.converters.DateConverter.MMMDDYYYY_DATE_FORMAT = 1;
VA_AMS.converters.DateConverter.YYYYMMDDThhmmsssTZD_DATE_FORMAT = 2;
VA_AMS.converters.DateConverter.MDDYYYY_DATE_FORMAT = 3;
VA_AMS.converters.DateConverter.YYYYMMDD_DATE_FORMAT = 4;
VA_AMS.converters.DateConverter.convertToDate_MDDYYYY = function (d) {
    'use strict';
    var month, day, year, date = new Date();
    if (d.length !== 7) {
        throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d + " should be in format MDDYYYY.");
    }
    if (VA_AMS.NumberUtility.isNotANumber(d)) {
        throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
    }
    month = Number(d.substring(0, 2));
    day = Number(d.substring(2, 4));
    year = Number(d.substring(4));
    date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date;
};
VA_AMS.converters.DateConverter.convertToDate_MMDDYYYY = function (d) {
	'use strict';
	var month, day, year, date = new Date();
	if (d.length !== 8) {
		throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMDDYYYY.");
	}
	if (VA_AMS.NumberUtility.isNotANumber(d)) {
		throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
	}
	month = Number(d.substring(0, 1));
	day = Number(d.substring(1, 3));
	year = Number(d.substring(3));
	date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
	return date;
};
VA_AMS.converters.DateConverter.convertToDate_MMMDDYYYY = function (d) {
    "use strict";
	var month, day, year, date = new Date();
	if (d.length !== 9) {
		throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMMDDYYYY.");
	}
	if (VA_AMS.NumberUtility.isNotANumber(d.substring(3))) {
		throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
	}
	month = Number(VA_AMS.models.Month.getMonthIndex(d.substring(0, 3)));
	day = Number(d.substring(3, 5));
	year = Number(d.substring(5));
	date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
	return date;
};
VA_AMS.converters.DateConverter.convertToDate_YYYYMMDD = function (d) {
    "use strict";
    var month, day, year, date = new Date();
    if (d.length !== 8) {
        throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d + " should be in format YYYYMMDD.");
    }
    if (VA_AMS.NumberUtility.isNotANumber(d.substring(0, 4))) {
        throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d.substring(0, 4) + " must be numeric.");
    }
    if (VA_AMS.NumberUtility.isNotANumber(d.substring(4, 6))) {
        throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d.substring(4, 6) + " must be numeric.");
    }
    if (VA_AMS.NumberUtility.isNotANumber(d.substring(6))) {
        throw new VA_AMS.exceptions.InvalidParameterException("Date String: " + d.substring(6) + " must be numeric.");
    }
    year = Number(d.substring(0, 4));
    month = Number(d.substring(4, 6)) - 1;
    day = Number(d.substring(6));
    date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date;
};
VA_AMS.converters.DateConverter.convertToDate_YYYYMMDDThhmmsssTZD = function (iso8601DateString) {
    "use strict";
    return VA_AMS.converters.DateConverter.convertToISO8601Date(iso8601DateString);
};
VA_AMS.converters.DateConverter.convertToString_YYYYMMDD = function (d, delimeter) {
    "use strict";
    delimeter = (Object.isDefined(delimeter)) ? delimeter : "";
    if(!Object.isDate(d)) throw Error("parameter d must be a Date Object.");

    return d.getFullYear() + delimeter + VA_AMS.NumberUtility.padLeft(d.getMonth()+1, 1)+ delimeter + d.getDate();
};
VA_AMS.converters.DateConverter.convertToISO8601Date = function (iso8601DateString) {
    "use strict";
    var regexp = new RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"),
        d = iso8601DateString.match(new RegExp(regexp)),
        offset = 0,
        date,
        time;

    if (d === null) {
        throw new VA_AMS.exceptions.InvalidParameterException("ISO 8601 Date String: " + d + " should be in ISO 8601 format YYYY-MM-DDThh:mm:ss:sTZD.");
    }


    date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] === '-') ? 1 : -1);
    }

    //offset -= date.getTimezoneOffset();
    //time = (date.getTime() + (offset * 60 * 1000));
    //date.setTime(time);
    return date;
};
VA_AMS.converters.DateConverter.convertToDate = function (d, dateFormat) {
	'use strict';
	var date = null;
	switch (dateFormat) {
        case VA_AMS.converters.DateConverter.MDDYYYY_DATE_FORMAT:
            date = VA_AMS.converters.DateConverter.convertToDate_MDDYYYY(d);
            break;
        case VA_AMS.converters.DateConverter.MMDDYYYY_DATE_FORMAT:
            date = VA_AMS.converters.DateConverter.convertToDate_MMDDYYYY(d);
            break;
        case VA_AMS.converters.DateConverter.MMMDDYYYY_DATE_FORMAT:
            date = VA_AMS.converters.DateConverter.convertToDate_MMMDDYYYY(d);
            break;
        case VA_AMS.converters.DateConverter.YYYYMMDDThhmmsssTZD_DATE_FORMAT:
            date = VA_AMS.converters.DateConverter.convertToDate_YYYYMMDDThhmmsssTZD(d);
            break;
        case VA_AMS.converters.DateConverter.YYYYMMDD_DATE_FORMAT:
            date = VA_AMS.converters.DateConverter.convertToDate_YYYYMMDD(d);
            break;
	}
	return date;
};
VA_AMS.converters.DateConverter.convertToString = function (d, dateFormat, delimeter) {
    'use strict';
    var date = null;
    switch (dateFormat) {
        case VA_AMS.converters.DateConverter.YYYYMMDD_DATE_FORMAT:
            date = VA_AMS.converters.DateConverter.convertToString_YYYYMMDD(d, delimeter);
            break;
    }
    return date;
};


VA_AMS.models = VA_AMS.models || VA_AMS.namespace("gov.va.iam.acs.ams.models");
VA_AMS.models.Month =  VA_AMS.namespace("gov.va.iam.acs.ams.models.Month");

/**
 * <p>Static field that is used to get calendar full name, abbreviated names, and total calendar days.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.models.Month.getMonthIndex = function (abbr) {
    "use strict";
    var i = -1;
    VA_AMS.models.Month.monthNames.forEach(function (monthName, index) {
        if (monthName.abbr === abbr) {
            i = index;
        }
    });
    return i;
};
/**
 * <p>Static field that is used to get calendar total calendar days of the previous month.</p>
 * @static
 * @function
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
 * @returns {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the previous month.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.models.Month.getPreviousMonthTotalDays = function (date) {
    "use strict";
    if (date.getMonth() === 0) {
        return VA_AMS.models.Month.monthNames[11].getTotalDays(date.getFullYear());
    } else {
        return VA_AMS.models.Month.monthNames[date.getMonth() - 1].getTotalDays(date.getFullYear());
    }
};

/**
 * <p>Static function that is used to get the total calendar days of the next month.</p>
 * @static
 * @function
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
 * @returns {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the next month.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.models.Month.getNextMonthTotalDays = function (date) {
    "use strict";
    if (date.getMonth() === 11) {
        return VA_AMS.models.Month.monthNames[0].getTotalDays(date.getFullYear());
    } else {
        return VA_AMS.models.Month.monthNames[date.getMonth() + 1].getTotalDays(date.getFullYear());
    }
};
/**
 * <p>Static field for the list of month.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.models.Month.monthNames = [
    {"name": "January", "abbr": "Jan", "getTotalDays": function (year) { "use strict"; return 31; } },
    {"name": "February", "abbr": "Feb", "getTotalDays": function (year) { "use strict"; if (year) { return (year % 4 === 0) ? 29 : 28; } else { throw ("Expected parameter(Year) is not defined."); } } },
    {"name": "March", "abbr": "Mar", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "April", "abbr": "Apr", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "May", "abbr": "May", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "June", "abbr": "Jun", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "July", "abbr": "Jul", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "August", "abbr": "Aug", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "September", "abbr": "Sep", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "October", "abbr": "Oct", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "November", "abbr": "Nov", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "December", "abbr": "Dec", "getTotalDays": function (year) { "use strict"; return 31; }}
];
/**
 * <p>Static field for the list of weekdays.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
VA_AMS.models.Month.weekdayNames = [
    {"name": "Sunday", "abbr": "Sun."},
    {"name": "Monday", "abbr": "Mon."},
    {"name": "Tuesday", "abbr": "Tue."},
    {"name": "Wednesday", "abbr": "Wed."},
    {"name": "Thursday", "abbr": "Thu."},
    {"name": "Friday", "abbr": "Fri."},
    {"name": "Saturday", "abbr": "Sat."}
];