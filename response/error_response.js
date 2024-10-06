    class ErrorRespnse extends Error{
        constructor(statusCode,messages,error = [],stack = ''){
            super(messages)
            this.stack = stack
            this.messages = messages
            this.statusCode = statusCode
            this.errorr = error

            if (stack) {
                
                this.stack = stack
            } else{
                Error.captureStackTrace(this, this.constructor)
            }
        }
    
    }
    module.exports = ErrorRespnse