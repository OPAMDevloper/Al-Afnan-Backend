class ApiResponse {
    constructor(statusCode, message = 'Successs', data,) {
        this.statusCode = statusCode
        this.message = message
        this.data = data

    }
}

module.exports = ApiResponse;