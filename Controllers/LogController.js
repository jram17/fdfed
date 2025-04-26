const {Resend} = require('resend');
const env_variables = require('../utils/envutils')
class LogController {
    constructor(){
        this.resend = new Resend(env_variables.RESEND_API)

    }


    
}


module.exports = LogController
