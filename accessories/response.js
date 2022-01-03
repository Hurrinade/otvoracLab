const error = function (errorMsg, statusCode) {
    return {
        statusCode: statusCode,
        errorMsg: errorMsg,
        response: null
    }
}

const success = function (data, successMsg, statusCode) {
    return {
        statusCode: statusCode,
        successMsg: successMsg,
        response: data,
        atribute1: {
            "@context": {
                "PostalAddress": "https://schema.org/PostalAddress",
                "DateTime": "https://schema.org/DateTime",
                "Language": "https://schema.org/Language",
                "QuantitativeValue": "https://schema.org/QuantitativeValue",
                "Date": "https://schema.org/Date",
                "CreativeWork": "https://schema.org/CreativeWork",
                "Schedule": "https://schema.org/Schedule"
            },
            "PostalAddress": {
                "addressLocality": "Zagreb",
                "addressCountry": "Croatia"
            },
            "DateTime": {
                "startDate": '2021-10-26',
                "startTime": '12:00:00:0000',
            },
            "Language": {
                "name": "english"
            },
            "Schedule": {
                "scheduleTimezone": "CEST"
            },
            "CreativeWork": {
                "keywords": "weather, temperature"
            },
            "QuantitativeValue": {
                "identifier": 1,
                "minValue": 5,
                "maxValue": 25,
                "value": 25,
                "Date": {
                    "datePublished": "2021-10-26"
                }
            }
        },
        atribute2: {
            "@context": {
                "PostalAddress": "https://schema.org/PostalAddress",
                "DateTime": "https://schema.org/DateTime",
                "Language": "https://schema.org/Language",
                "QuantitativeValue": "https://schema.org/QuantitativeValue",
                "Date": "https://schema.org/Date",
                "CreativeWork": "https://schema.org/CreativeWork",
                "Schedule": "https://schema.org/Schedule"
            },
            "PostalAddress": {
                "addressLocality": "Zagreb",
                "addressCountry": "Croatia"
            },
            "DateTime": {
                "startDate": '2021-10-25',
                "startTime": '12:00:00:0000',
            },
            "Language": {
                "name": "english"
            },
            "Schedule": {
                "scheduleTimezone": "CEST"
            },
            "CreativeWork": {
                "keywords": "weather, temperature"
            },
            "QuantitativeValue": {
                "identifier": 2,
                "minValue": 10,
                "maxValue": 24,
                "value": 20,
                "Date": {
                    "datePublished": "2021-10-25"
                }
            }
        }
    }
}

module.exports = { error, success };