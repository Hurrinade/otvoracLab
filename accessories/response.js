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
        response: data
    }
}

module.exports = { error, success };